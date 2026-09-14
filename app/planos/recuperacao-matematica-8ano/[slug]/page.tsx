import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatRecoveryDate, getMathRecoveryDay, mathRecoveryPlan } from "@/lib/math-recovery-plan";
import { PrintButton } from "../print-button";
import styles from "../recovery-plan.module.css";

export const dynamic = "force-static";

export function generateStaticParams() {
  return mathRecoveryPlan.map((day) => ({ slug: day.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const day = getMathRecoveryDay(slug);
  if (!day) return { title: "Plano de recuperação | PLUMARELI" };
  return {
    title: `${day.title} | PLUMARELI`,
    description: day.subtitle,
    robots: { index: false, follow: false },
  };
}

export default async function RecoveryWorksheetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const day = getMathRecoveryDay(slug);
  if (!day) notFound();

  return (
    <main className={styles.screen}>
      <div className={styles.toolbar}><PrintButton /></div>
      <article className={styles.paper}>
        <header className={`${styles.hero} ${styles[day.accent]}`}>
          <span className={styles.badge}>Recuperação Paralela • Matemática • 8º ano</span>
          <span className={styles.brand}>PLUMARELI</span>
          <h1>{day.title}</h1>
          <p className={styles.subtitle}>{day.subtitle}</p>
          <img className={styles.mascot} src="/mascotes/curio_mico_atividade_pensando.png" alt="Mascote Plumareli estudando" />
        </header>

        <div className={styles.body}>
          <section className={styles.meta}>
            <div className={styles.metaCard}><strong>Nome</strong>________________________________</div>
            <div className={styles.metaCard}><strong>Data</strong>{formatRecoveryDate(day.date)}</div>
            <div className={styles.metaCard}><strong>Tempo sugerido</strong>{day.minutes} minutos</div>
          </section>

          <section className={styles.goal}><strong>Hoje eu preciso conseguir:</strong> {day.objective}</section>

          {day.remember?.length ? <>
            <h2 className={styles.sectionTitle}>Lembre antes de começar</h2>
            <section className={styles.card}>
              <ul>{day.remember.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          </> : null}

          {day.example ? <section className={`${styles.card} ${styles.example}`}><strong>Exemplo / pista de organização</strong><p>{day.example}</p></section> : null}

          <h2 className={styles.sectionTitle}>Agora é com você</h2>
          <section className={styles.questions}>
            {day.questions.map((question, index) => (
              <article className={styles.question} key={`${day.slug}-${index}`}>
                <div className={styles.prompt}>{question.prompt}</div>
                <div className={`${styles.workspace} ${styles[question.workspace || "medium"]}`} />
              </article>
            ))}
          </section>

          {day.finalReview?.length ? <section className={styles.reviewPage}>
            <div className={styles.reviewIntro}>
              <h2>Revisão de véspera</h2>
              <p>Só use esta parte depois de terminar o simulado. Nada de conteúdo novo: é apenas para organizar o que já foi estudado.</p>
            </div>
            {day.finalReview.map((item) => <div className={styles.reviewCard} key={item}>{item}</div>)}
          </section> : null}

          <h2 className={styles.sectionTitle}>Antes de encerrar</h2>
          <section className={styles.checklist}>
            {day.checklist.map((item) => <div className={styles.checkItem} key={item}><span className={styles.box} />{item}</div>)}
          </section>

          <div className={styles.footer}>
            <span>PLUMARELI • acompanhamento escolar</span>
            <span>Prazo desta etapa: {formatRecoveryDate(day.date)} • {day.dueTime}</span>
          </div>
          <p className={styles.printNote}>Esta folha foi preparada para ser feita principalmente à mão. Use o botão acima para imprimir ou salvar uma cópia em PDF.</p>
        </div>
      </article>
    </main>
  );
}
