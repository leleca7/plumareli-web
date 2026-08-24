import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { PLUMARELI_BRAND_SYSTEM } from "../../../lib/brand";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "../../../lib/config";

export const runtime = "nodejs";
export const maxDuration = 300;

const sizes = new Set(["1024x1024", "1024x1536", "1536x1024"]);
const qualities = new Set(["low", "medium", "high"]);

async function requireAdmin(token: string) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData.user) return null;
  const { data: roles, error: roleError } = await supabase.from("user_roles").select("role").eq("user_id", userData.user.id);
  if (roleError || !roles?.some((item) => item.role === "admin")) return null;
  return userData.user;
}

export async function POST(request: Request) {
  try {
    const auth = request.headers.get("authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (!token || !(await requireAdmin(token))) return NextResponse.json({ error: "Acesso restrito a administradores." }, { status: 403 });

    const form = await request.formData();
    const apiKey = String(form.get("apiKey") || "").trim();
    const prompt = String(form.get("prompt") || "").trim();
    const brandMode = String(form.get("brandMode") || "true") === "true";
    const size = sizes.has(String(form.get("size"))) ? String(form.get("size")) : "1024x1536";
    const quality = qualities.has(String(form.get("quality"))) ? String(form.get("quality")) : "high";
    const images = form.getAll("images").filter((value): value is File => value instanceof File && value.size > 0).slice(0, 6);

    if (!apiKey.startsWith("sk-")) return NextResponse.json({ error: "Informe uma chave de API da OpenAI válida." }, { status: 400 });
    if (!prompt) return NextResponse.json({ error: "Descreva o card que você quer gerar." }, { status: 400 });
    if (prompt.length > 12000) return NextResponse.json({ error: "O prompt está longo demais para este estúdio." }, { status: 400 });

    const openai = new OpenAI({ apiKey, timeout: 290_000, maxRetries: 1 });
    const finalPrompt = `${brandMode ? PLUMARELI_BRAND_SYSTEM : ""}\n\nPEDIDO DESTA PEÇA:\n${prompt}`.trim();
    let result;
    if (images.length) {
      result = await openai.images.edit({ model: "gpt-image-2", image: images, prompt: finalPrompt, size: size as "1024x1024" | "1024x1536" | "1536x1024", quality: quality as "low" | "medium" | "high" });
    } else {
      result = await openai.images.generate({ model: "gpt-image-2", prompt: finalPrompt, size: size as "1024x1024" | "1024x1536" | "1536x1024", quality: quality as "low" | "medium" | "high" });
    }
    const item = result.data?.[0];
    if (!item) throw new Error("A API não retornou uma imagem.");
    if (item.b64_json) return NextResponse.json({ image: `data:image/png;base64,${item.b64_json}`, model: "gpt-image-2", size, quality });
    if (item.url) return NextResponse.json({ image: item.url, model: "gpt-image-2", size, quality });
    throw new Error("A resposta da API não continha imagem utilizável.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Não foi possível gerar a imagem.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
