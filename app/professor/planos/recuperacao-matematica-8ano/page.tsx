import Link from "next/link";
import { Badge, EmptyState, PageHeader } from "@/components/ui";
import { getCurrentTeacher } from "@/lib/teacher";
import { formatRecoveryDate, mathRecoveryPlan, MATH_RECOVERY_EXAM } from "@/lib/math-recovery-plan";
import { scheduleMathRecoveryPlan } from "./actions";

export default async function MathRecoveryPlanPage({ searchParams }: { searchParams: Promise<{ erro?: string; sucesso?: string }> }) {
  const query = await searchParams;
  const { teacher, supabase } = await getCurrentTeacher();
  if (!teacher) return <EmptyState title="Perfil incompleto" description="Falta o registro de professor." />;

  const { data: links } = await supabase
    .from("teacher_students")
    .select("student_id,students(preferred_name,full_name,school_name,grades(name))")
    .eq("teacher_id", teacher.id)
    .eq("active", true)
    .order("created_at", { ascending: true });

  const students = (links ?? []).filter((item: any) => item.students).map((item: any) => ({
    id: item.student_id,
    name: item.students?.preferred_name || item.students?.full_name || "Aluno",
    detail: item.students?.grades?.name || item.students?.school_name || "",
  }));

  return <>
    <PageHeader
      eyebrow="Professor • Plano intensivo"
      title="Recuperação de Matemática - 8º ano"
      description="Plano de 14 a 22/09 com atividades para fazer principalmente à mão. Em 23/09 não há tarefa nova: é o dia da prova."
      action={<Link className="button button-secondary" href="/professor/correcoes">Voltar às correções</Link>}
    />

    {query.erro && <div className="form-message form-error">{query.erro}</div>}
    {query.sucesso && <div className="form-message form-success">{query.sucesso}</div>}

    <section className="panel family-highlight">
      <div className="panel-head"><div><Badge tone="pink">Prazo fechado</Badge><h2>Todo o estudo pesado termina em 22/09</h2><p>As etapas são liberadas por dia. A última vence às 19h30 do dia 22 para preservar a noite anterior à prova.</p></div></div>
      <div className="notice"><strong>23/09/2026 • {MATH_RECOVERY_EXAM.time} às {MATH_RECOVERY_EXAM.endTime}</strong><br />{MATH_RECOVERY_EXAM.note}</div>
    </section>

    <section className="panel">
      <div className="panel-head"><div><h2>Programar para um aluno</h2><p>O sistema cria o Caderno Plumareli de cada dia, agenda a liberação e coloca o prazo correto. Entregas já corrigidas nunca são apagadas nem reiniciadas.</p></div></div>
      {students.length ? <form action={scheduleMathRecoveryPlan} className="form-stack">
        <div className="field"><label>Aluno *</label><select className="select" name="studentId" required><option value="">Selecione</option>{students.map((student) => <option value={student.id} key={student.id}>{student.name}{student.detail ? ` • ${student.detail}` : ""}</option>)}</select></div>
        <div className="notice"><strong>Formato:</strong> atividades imprimíveis, com espaço grande para cálculo e escrita à mão. O aluno abre a folha no portal, imprime ou salva em PDF e depois pode enviar foto/PDF da resolução.</div>
        <button className="button button-primary" type="submit">Criar e programar plano completo</button>
      </form> : <EmptyState title="Nenhum aluno vinculado" description="Vincule um aluno ao professor antes de programar o plano." />}
    </section>

    <section className="panel">
      <div className="panel-head"><div><h2>Roteiro de 14 a 22/09</h2><p>O conteúdo acompanha a recuperação: porcentagem e pontos notáveis, circunferências e frações algébricas.</p></div></div>
      <div className="form-stack">
        {mathRecoveryPlan.map((day, index) => <article className="family-upload-card" key={day.slug}>
          <div className="flex space-between gap-8 wrap">
            <div>
              <div className="flex gap-8 wrap"><Badge tone={index >= 6 ? "purple" : index >= 4 ? "pink" : "blue"}>{formatRecoveryDate(day.date)}</Badge><Badge tone="neutral">{day.minutes} min</Badge><Badge tone="yellow">até {day.dueTime}</Badge></div>
              <h3>{day.title}</h3>
              <p>{day.subtitle}</p>
            </div>
            <Link className="button button-secondary button-small" href={`/planos/recuperacao-matematica-8ano/${day.slug}`} target="_blank">Abrir folha ↗</Link>
          </div>
          <details className="mt-12"><summary><strong>Gabarito de apoio do professor</strong></summary><ol>{day.answerKey.map((answer) => <li key={answer}>{answer}</li>)}</ol></details>
        </article>)}
        <article className="family-upload-card">
          <div className="flex gap-8 wrap"><Badge tone="green">23/09</Badge><Badge tone="pink">PROVA</Badge></div>
          <h3>{MATH_RECOVERY_EXAM.title}</h3>
          <p>{MATH_RECOVERY_EXAM.time} às {MATH_RECOVERY_EXAM.endTime}. Sem lista nova e sem conteúdo novo.</p>
        </article>
      </div>
    </section>
  </>;
}
