import type { Metadata } from "next";
import "./style.css";

export const metadata: Metadata = { title: "Pumarelli Image Studio", description: "Estúdio interno para criação de cards da Pumarelli" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
