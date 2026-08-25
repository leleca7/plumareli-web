"use server";

import { revalidatePath } from "next/cache";
import { getCurrentStudent } from "@/lib/student";
import type { MissionSubmitResult } from "@/components/student-mission-form";

async function existingSubmission(supabase: any, missionStudentId: string) {
  const { data } = await supabase
    .from("submissions")
    .select("id")
    .eq("mission_student_id", missionStudentId)
    .order("submitted_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data?.id ? String(data.id) : undefined;
}

export async function submitMission(formData: FormData): Promise<MissionSubmitResult> {
  const { student, supabase } = await getCurrentStudent();
  if (!student) return { ok: false, message: "Não foi possível identificar o aluno." };

  const missionStudentId = String(formData.get("missionStudentId") || "");
  if (!missionStudentId) return { ok: false, message: "Não foi possível identificar esta missão." };

  const { data: assignment, error: assignmentError } = await supabase
    .from("mission_students")
    .select("id,mission_id,student_id,status")
    .eq("id", missionStudentId)
    .eq("student_id", student.id)
    .maybeSingle();

  if (assignmentError || !assignment) {
    return { ok: false, message: "Esta missão não está disponível para envio." };
  }

  if (assignment.status === "submitted" || assignment.status === "reviewed") {
    return {
      ok: true,
      message: "Esta missão já foi enviada e está salva com segurança.",
      event: await existingSubmission(supabase, assignment.id),
    };
  }

  const { data: questions, error: questionError } = await supabase
    .from("mission_questions")
    .select("id")
    .eq("mission_id", assignment.mission_id)
    .order("position");

  if (questionError) {
    return { ok: false, message: "Não foi possível conferir as questões desta missão." };
  }

  const answers = (questions ?? []).map((q) => ({
    questionId: q.id,
    answerText: String(formData.get(`answer_${q.id}`) || "").trim(),
  }));

  if (answers.some((answer) => !answer.answerText)) {
    return { ok: false, message: "Responda todas as questões antes de enviar." };
  }

  const submittedAt = new Date().toISOString();
  const { data: submission, error } = await supabase
    .from("submissions")
    .insert({
      mission_student_id: assignment.id,
      student_id: student.id,
      status: "submitted",
      review_status: "pending",
      submitted_at: submittedAt,
    })
    .select("id")
    .single();

  if (error || !submission) {
    if (error?.code === "23505") {
      const event = await existingSubmission(supabase, assignment.id);
      if (event) return { ok: true, message: "Esta missão já foi enviada e está salva com segurança.", event };
    }
    return { ok: false, message: error?.message || "Não foi possível enviar a atividade." };
  }

  if (answers.length) {
    const { error: answerError } = await supabase.from("answers").insert(
      answers.map((answer) => ({
        submission_id: submission.id,
        question_id: answer.questionId,
        answer_text: answer.answerText,
      })),
    );
    if (answerError) {
      await supabase.from("submissions").delete().eq("id", submission.id);
      return { ok: false, message: answerError.message || "Não foi possível salvar todas as respostas." };
    }
  }

  const { data: gradeRows, error: gradeError } = await supabase.rpc("grade_objective_mission_submission", {
    p_submission_id: submission.id,
    p_student_id: student.id,
  });

  if (gradeError) {
    console.error("Falha na correção objetiva da missão", gradeError.code);
  }

  const result = gradeRows?.[0] as { needs_teacher?: number; score_percent?: number | null } | undefined;
  const needsTeacher = Number(result?.needs_teacher || 0) > 0 || Boolean(gradeError);
  const score = result?.score_percent == null ? null : Math.round(Number(result.score_percent));

  const { data: achievementCount, error: achievementError } = await supabase.rpc("refresh_student_achievements", {
    p_student_id: student.id,
  });
  if (achievementError) {
    console.error("Falha ao atualizar conquistas após missão", achievementError.code);
  }
  const newAchievements = achievementError ? 0 : Math.max(0, Number(achievementCount || 0));

  revalidatePath("/aluno");
  revalidatePath("/aluno/missoes");
  revalidatePath("/aluno/conquistas");
  revalidatePath("/professor");
  revalidatePath("/professor/correcoes");

  const message = needsTeacher
    ? "Missão enviada! As questões objetivas foram conferidas e a parte discursiva ficará para o professor revisar."
    : score == null
      ? "Missão enviada!"
      : `Missão enviada e corrigida automaticamente: ${score}% nas questões objetivas.`;

  return { ok: true, message, event: submission.id, achievements: newAchievements };
}
