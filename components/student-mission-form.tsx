"use client";

import Link from "next/link";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export type MissionSubmitResult = {
  ok: boolean;
  message: string;
  event?: string;
  achievements?: number;
};

type ServerAction = (formData: FormData) => Promise<MissionSubmitResult>;

function draftKey(missionStudentId: string) {
  return `plumareli:mission-draft:${missionStudentId}`;
}

function collectAnswers(form: HTMLFormElement) {
  const data = new FormData(form);
  const answers: Record<string, string> = {};
  for (const [key, value] of data.entries()) {
    if (key.startsWith("answer_") && typeof value === "string") answers[key] = value;
  }
  return answers;
}

export function StudentMissionForm({
  action,
  missionStudentId,
  children,
}: {
  action: ServerAction;
  missionStudentId: string;
  children: ReactNode;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    try {
      const raw = window.localStorage.getItem(draftKey(missionStudentId));
      if (!raw) return;
      const saved = JSON.parse(raw) as Record<string, string>;
      let restoredAny = false;
      const controls = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[name^='answer_']");
      controls.forEach((control) => {
        const value = saved[control.name];
        if (value == null) return;
        if (control instanceof HTMLInputElement && control.type === "radio") {
          control.checked = control.value === value;
          if (control.checked) restoredAny = true;
        } else if (control instanceof HTMLTextAreaElement) {
          control.value = value;
          if (value.trim()) restoredAny = true;
        }
      });
      setRestored(restoredAny);
    } catch {
      // Um rascunho corrompido não deve impedir a atividade.
    }
  }, [missionStudentId]);

  function saveDraft() {
    const form = formRef.current;
    if (!form) return;
    try {
      window.localStorage.setItem(draftKey(missionStudentId), JSON.stringify(collectAnswers(form)));
    } catch {
      // O envio continua funcionando mesmo se o navegador bloquear o armazenamento local.
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    const form = event.currentTarget;
    saveDraft();
    setBusy(true);
    setError("");

    try {
      const result = await action(new FormData(form));
      if (!result.ok) {
        setError(`${result.message} Suas respostas continuam salvas nesta tela.`);
        return;
      }

      try {
        window.localStorage.removeItem(draftKey(missionStudentId));
      } catch {
        // A confirmação do servidor é suficiente; limpar o rascunho é secundário.
      }
      setSuccess(result.message);
    } catch {
      setError("Não recebemos a confirmação do servidor. Suas respostas continuam salvas nesta tela; tente enviar novamente.");
    } finally {
      setBusy(false);
    }
  }

  if (success) {
    return (
      <section className="panel family-highlight" role="status" aria-live="polite">
        <div className="eyebrow">Atividade recebida</div>
        <h2>Envio confirmado</h2>
        <p>{success}</p>
        <Link className="button button-primary" href="/aluno/missoes">Voltar para minhas missões</Link>
      </section>
    );
  }

  return (
    <form ref={formRef} onSubmit={submit} onInput={saveDraft} aria-busy={busy}>
      {restored ? <div className="notice"><strong>Rascunho recuperado.</strong> Suas respostas deste aparelho foram restauradas.</div> : null}
      {error ? <div className="form-message form-error" role="alert">{error}</div> : null}
      <fieldset disabled={busy} style={{ border: 0, padding: 0, margin: 0, minInlineSize: 0 }}>
        {children}
      </fieldset>
      {busy ? <div className="notice" role="status"><strong>Enviando a atividade...</strong> Não feche esta página até aparecer a confirmação.</div> : null}
    </form>
  );
}
