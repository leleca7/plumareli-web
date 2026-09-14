"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getCurrentTeacher } from "@/lib/teacher";
import { mathRecoveryPlan } from "@/lib/math-recovery-plan";

function bahiaIso(date: string, time: string) {
  return new Date(`${date}T${time}:00-03:00`).toISOString();
}

function dayLabel(date: string) {
  const [, month, day] = date.split("-");
  return `${day}/${month}`;
}

export async function scheduleMathRecoveryPlan(formData: FormData) {
  const parsed = z.object({ studentId: z.string().uuid() }).safeParse({ studentId: formData.get("studentId") });
  if (!parsed.success) redirect(`/professor/planos/recuperacao-matematica-8ano?erro=${encodeURIComponent("Escolha um aluno para receber o plano.")}`);

  const { teacher, supabase } = await getCurrentTeacher();
  if (!teacher) redirect("/professor/planos/recuperacao-matematica-8ano");

  const { data: link, error: linkError } = await supabase
    .from("teacher_students")
    .select("student_id,students(grade_id)")
    .eq("teacher_id", teacher.id)
    .eq("student_id", parsed.data.studentId)
    .eq("active", true)
    .maybeSingle();

  if (linkError || !link) redirect(`/professor/planos/recuperacao-matematica-8ano?erro=${encodeURIComponent("Este aluno não está mais vinculado a você.")}`);

  const studentRelation: any = (link as any).students;
  const student = Array.isArray(studentRelation) ? studentRelation[0] : studentRelation;
  const gradeId = student?.grade_id || null;

  const { data: mathSubject } = await supabase.from("subjects").select("id").eq("name", "Matemática").eq("active", true).maybeSingle();
  const subjectId = mathSubject?.id || null;
  const now = new Date();
  let created = 0;
  let assigned = 0;
  let preserved = 0;

  for (const day of mathRecoveryPlan) {
    const title = `${dayLabel(day.date)} • ${day.title}`;
    const description = `${day.subtitle} Faça principalmente no papel, mostrando os cálculos. Ao concluir, envie foto ou PDF pelo Caderno Plumareli para que a correção e a evolução fiquem registradas.`;
    const scheduledRelease = new Date(bahiaIso(day.date, "06:00"));
    const publishAt = scheduledRelease <= now ? now.toISOString() : scheduledRelease.toISOString();
    const dueAt = bahiaIso(day.date, day.dueTime);
    const worksheetPath = `/planos/recuperacao-matematica-8ano/${day.slug}`;

    const { data: existing, error: existingError } = await supabase
      .from("notebook_activities")
      .select("id")
      .eq("created_by_teacher_id", teacher.id)
      .eq("title", title)
      .maybeSingle();

    if (existingError) redirect(`/professor/planos/recuperacao-matematica-8ano?erro=${encodeURIComponent("Não foi possível verificar as atividades já existentes do plano.")}`);

    let activityId = existing?.id || null;
    if (activityId) {
      const { error: updateError } = await supabase.from("notebook_activities").update({
        description,
        subject_id: subjectId,
        grade_id: gradeId,
        worksheet_path: worksheetPath,
        status: "published",
        publish_at: publishAt,
      }).eq("id", activityId).eq("created_by_teacher_id", teacher.id);
      if (updateError) redirect(`/professor/planos/recuperacao-matematica-8ano?erro=${encodeURIComponent("Não foi possível atualizar uma das atividades do plano.")}`);
    } else {
      const { data: inserted, error: insertError } = await supabase.from("notebook_activities").insert({
        created_by_teacher_id: teacher.id,
        title,
        description,
        subject_id: subjectId,
        grade_id: gradeId,
        worksheet_path: worksheetPath,
        status: "published",
        publish_at: publishAt,
      }).select("id").single();
      if (insertError || !inserted) redirect(`/professor/planos/recuperacao-matematica-8ano?erro=${encodeURIComponent("Não foi possível criar uma das atividades do plano.")}`);
      activityId = inserted.id;
      created += 1;
    }

    const { data: currentAssignment, error: assignmentReadError } = await supabase
      .from("notebook_assignments")
      .select("id,status,submitted_at,submission_photo_path,score,teacher_note,needs_redo")
      .eq("activity_id", activityId)
      .eq("student_id", parsed.data.studentId)
      .maybeSingle();

    if (assignmentReadError) redirect(`/professor/planos/recuperacao-matematica-8ano?erro=${encodeURIComponent("Não foi possível verificar o histórico do aluno neste plano.")}`);

    const hasHistory = Boolean(currentAssignment && (
      currentAssignment.submitted_at
      || currentAssignment.submission_photo_path
      || currentAssignment.score != null
      || currentAssignment.teacher_note
      || currentAssignment.needs_redo
      || ["submitted", "reviewed"].includes(String(currentAssignment.status))
    ));

    if (hasHistory) {
      preserved += 1;
      continue;
    }

    const payload = {
      activity_id: activityId,
      student_id: parsed.data.studentId,
      assigned_by_teacher_id: teacher.id,
      due_at: dueAt,
      status: currentAssignment?.status === "in_progress" ? "in_progress" : "assigned",
    };

    const { error: assignmentError } = await supabase.from("notebook_assignments").upsert(payload, { onConflict: "activity_id,student_id" });
    if (assignmentError) redirect(`/professor/planos/recuperacao-matematica-8ano?erro=${encodeURIComponent("As atividades foram criadas, mas uma delas não pôde ser atribuída ao aluno.")}`);
    assigned += 1;
  }

  revalidatePath("/professor");
  revalidatePath("/professor/materiais");
  revalidatePath("/professor/conteudos");
  revalidatePath("/professor/planos/recuperacao-matematica-8ano");
  revalidatePath("/familia");
  revalidatePath("/familia/atividades");
  revalidatePath("/familia/progresso");
  revalidatePath("/aluno");
  revalidatePath("/aluno/caderno");

  const preservedMessage = preserved ? ` ${preserved} etapa(s) com entrega/correção anterior foram preservadas.` : "";
  redirect(`/professor/planos/recuperacao-matematica-8ano?sucesso=${encodeURIComponent(`Plano preparado: ${created} atividade(s) criada(s) e ${assigned} etapa(s) programada(s) para o aluno.${preservedMessage}`)}`);
}
