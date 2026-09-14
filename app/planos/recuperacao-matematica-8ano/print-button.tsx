"use client";

export function PrintButton() {
  return (
    <button className="recovery-print-button" type="button" onClick={() => window.print()}>
      Imprimir / salvar em PDF
    </button>
  );
}
