"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getCurrentTeacher } from "@/lib/teacher";

const FORM_PATH = "/professor/correcoes/escola";

function formError(message: string): never {
  redirect(`${FORM_PATH}?erro=${encodeURIComponent(message)}`);
}

function activityDate(value: string) {
  if (!value) return new Date().toISOString();
  const date = new Date(`${value}T18:00:00-03:00`);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

export async function registerSchoolCorrection(formData: FormData) {
  const scoreRaw = String(formData.get("score") || "").trim();
  const parsed = z.object({
    studentId: z.string().uuid(),
    subjectId: z.string().uuid().optional().or(z.literal("")),
    title: z.string().trim().min(2).max(180),
    activityDate: z.string().optional(),
    score: z.number().min(0).max(100).nullable(),
    whatWentWell: z.string().trim().max(1200).optional(),
    difficulty: z.string().trim().max(1200).optional(),
    correction: z.string().trim().min(2).max(1800),
    nextStep: z.string().trim().min(2).max(1200),
  }).safeParse({
    studentId: formData.get("studentId"),
    subjectId: String(formData.get("subjectId") || ""),
    title: formData.get("title"),
    activityDate: String(formData.get("activityDate") || ""),
    score: scoreRaw === "" ? null : Number(scoreRaw),
    whatWentWell: String(formData.get("whatWentWell") || ""),
    difficulty: String(formData.get("difficulty") || ""),
    correction: String(formData.get("correction") || ""),
    nextStep: String(formData.get("nextStep") || ""),
  });

  if (!parsed.success) formError("Revise os dados da correção da atividade escolar.");

  const { teacher, supabase } = await getCurrentTeacher();
  if (!teacher) redirect(FORM_PATH);

  const { data: link, error: linkError } = await supabase
    .from("teacher_students")
    .select("student_id,students(grade_id)")
    .eq("teacher_id", teacher.id)
    .eq("student_id", parsed.data.studentId)
    .eq("active", true)
    .maybeSingle();

  if (linkError || !link) formError("Este aluno não está mais vinculado a você.");

  if (parsed.data.subjectId) {
    const { data: subject } = await supabase.from("subjects").select("id").eq("id", parsed.data.subjectId).eq("active", true).maybeSingle();
    if (!subject) formError("A matéria selecionada não está disponível.");
  }

  const studentRelation: any = (link as any).students;
  const student = Array.isArray(studentRelation) ? studentRelation[0] : studentRelation;
  const gradeId = student?.grade_id || null;
  const now = new Date().toISOString();
  const noteLines = [
    parsed.data.whatWentWell ? `O que já está funcionando:\n${parsed.data.whatWentWell}` : null,
    parsed.data.difficulty ? `Onde houve dificuldade:\n${parsed.data.difficulty}` : null,
    `O que trabalhamos na correção:\n${parsed.data.correction}`,
    `Próximo passo:\n${parsed.data.nextStep}`,
  ].filter(Boolean);
  const teacherNote = noteLines.join("\n\n");

  const { data: activity, error: activityError } = await supabase.from("notebook_activities").insert({
    created_by_teacher_id: teacher.id,
    title: `Atividade da escola • ${parsed.data.title}`,
    description: "Registro de uma atividade escolar corrigida com o aluno. A devolutiva abaixo mostra o que foi observado, o que foi trabalhado e o próximo passo.",
    subject_id: parsed.data.subjectId || null,
    grade_id: gradeId,
    worksheet_path: null,
    status: "published",
    publish_at: now,
  }).select("id").single();

  if (activityError || !activity) formError("Não foi possível criar o registro da atividade escolar.");

  const assignmentPayload: Record<string, unknown> = {
    activity_id: activity.id,
    student_id: parsed.data.studentId,
    assigned_by_teacher_id: teacher.id,
    status: "reviewed",
    submitted_at: activityDate(parsed.data.activityDate || ""),
    teacher_note: teacherNote,
    stars_awarded: 0,
    needs_redo: false,
    redo_note: null,
    updated_at: now,
  };
  if (parsed.data.score != null) assignmentPayload.score = parsed.data.score;

  const { error: assignmentError } = await supabase.from("notebook_assignments").insert(assignmentPayload);
  if (assignmentError) {
    await supabase.from("notebook_activities").delete().eq("id", activity.id).eq("created_by_teacher_id", teacher.id);
    formError("O registro foi iniciado, mas a devolutiva não pôde ser vinculada ao aluno. A criação foi revertida.");
  }

  revalidatePath("/professor");
  revalidatePath("/professor/correcoes");
  revalidatePath(`/professor/alunos/${parsed.data.studentId}`);
  revalidatePath("/familia");
  revalidatePath("/familia/atividades");
  revalidatePath("/familia/progresso");
  revalidatePath("/aluno");
  revalidatePath("/aluno/caderno");
  redirect(`/professor/correcoes?sucesso=${encodeURIComponent("Correção da atividade escolar registrada. A família já pode acompanhar a devolutiva e a evolução no portal.")}`);
}
