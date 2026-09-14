import Link from "next/link";
import { EmptyState, PageHeader } from "@/components/ui";
import { getCurrentTeacher } from "@/lib/teacher";
import { registerSchoolCorrection } from "../school-correction-actions";

function todayInBahia() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bahia", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

export default async function SchoolCorrectionPage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const query = await searchParams;
  const { teacher, supabase } = await getCurrentTeacher();
  if (!teacher) return <EmptyState title="Perfil incompleto" description="Falta o registro de professor." />;

  const [{ data: links }, { data: subjects }] = await Promise.all([
    supabase.from("teacher_students").select("student_id,students(preferred_name,full_name,school_name,grades(name))").eq("teacher_id", teacher.id).eq("active", true).order("created_at", { ascending: true }),
    supabase.from("subjects").select("id,name").eq("active", true).order("name"),
  ]);

  const students = (links ?? []).filter((item: any) => item.students).map((item: any) => ({
    id: item.student_id,
    name: item.students?.preferred_name || item.students?.full_name || "Aluno",
    detail: item.students?.grades?.name || item.students?.school_name || "",
  }));

  return <>
    <PageHeader
      eyebrow="Professor • Correção escolar"
      title="Registrar atividade da escola"
      description="Use depois de corrigir caderno, lista, dever ou atividade trazida da escola. A família verá a devolutiva no histórico e no acompanhamento."
      action={<Link className="button button-secondary" href="/professor/correcoes">Voltar às correções</Link>}
    />

    {query.erro && <div className="form-message form-error">{query.erro}</div>}

    <section className="panel">
      <div className="panel-head"><div><h2>Devolutiva pedagógica</h2><p>Registre o que foi observado e o próximo passo. A nota é opcional: uma correção sem nota não reduz o aproveitamento do aluno.</p></div></div>
      {students.length ? <form action={registerSchoolCorrection} className="form-stack">
        <div className="form-row">
          <div className="field"><label>Aluno *</label><select className="select" name="studentId" required><option value="">Selecione</option>{students.map((student) => <option key={student.id} value={student.id}>{student.name}{student.detail ? ` • ${student.detail}` : ""}</option>)}</select></div>
          <div className="field"><label>Matéria</label><select className="select" name="subjectId"><option value="">Geral / não informar</option>{(subjects ?? []).map((subject: any) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}</select></div>
        </div>
        <div className="form-row">
          <div className="field"><label>Atividade / título *</label><input className="input" name="title" placeholder="Ex.: Lista de porcentagem do colégio" required maxLength={180} /></div>
          <div className="field"><label>Data da atividade</label><input className="input" type="date" name="activityDate" defaultValue={todayInBahia()} /></div>
        </div>
        <div className="field"><label>Nota 0–100 <span className="field-optional">opcional</span></label><input className="input" type="number" name="score" min="0" max="100" step="0.1" placeholder="Deixe vazio se a atividade não tiver nota" /></div>

        <div className="field"><label>O que já está funcionando <span className="field-optional">opcional</span></label><textarea className="textarea" name="whatWentWell" maxLength={1200} placeholder="Ex.: Entendeu porcentagens simples e organizou bem os cálculos." /></div>
        <div className="field"><label>Onde houve dificuldade <span className="field-optional">opcional</span></label><textarea className="textarea" name="difficulty" maxLength={1200} placeholder="Ex.: Ainda confunde a base do cálculo em descontos sucessivos." /></div>
        <div className="field"><label>O que trabalhamos na correção *</label><textarea className="textarea" name="correction" maxLength={1800} required placeholder="Explique o que foi refeito, qual estratégia foi usada e o que o aluno passou a compreender." /></div>
        <div className="field"><label>Próximo passo *</label><textarea className="textarea" name="nextStep" maxLength={1200} required placeholder="Ex.: Fazer nova lista curta de desconto e aumento percentual e conferir autonomia." /></div>

        <div className="notice"><strong>Como aparece para a família:</strong> o registro entra como uma atividade escolar já corrigida, com a devolutiva completa e, quando houver nota, também participa da evolução por matéria.</div>
        <button className="button button-primary" type="submit">Salvar correção no histórico</button>
      </form> : <EmptyState title="Nenhum aluno vinculado" description="Vincule um aluno ao professor antes de registrar a correção." />}
    </section>
  </>;
}
