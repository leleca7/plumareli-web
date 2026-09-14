import Link from "next/link";

export default function CorrectionsLayout({ children }: { children: React.ReactNode }) {
  return <>
    <section className="panel mb-20">
      <div className="panel-head">
        <div>
          <div className="eyebrow">Acompanhamento contínuo</div>
          <h2>Atividade da escola também vira histórico</h2>
          <p>Registre a correção feita com o aluno para a família acompanhar o que evoluiu, onde houve dificuldade e qual é o próximo passo.</p>
        </div>
        <div className="flex gap-8 wrap">
          <Link className="button button-primary button-small" href="/professor/correcoes/escola">Registrar atividade da escola</Link>
          <Link className="button button-secondary button-small" href="/professor/planos/recuperacao-matematica-8ano">Plano de recuperação de Matemática</Link>
        </div>
      </div>
    </section>
    {children}
  </>;
}
