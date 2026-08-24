import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = "https://ghpqnqxjxmdmhikdacoq.supabase.co";
const SUPABASE_KEY = "sb_publishable_6HBOy2srshYvkQ-7ufzzew_LKdspq7M";
const BUCKET = "plumareli-image-studio";

const BRAND = `DIREÇÃO VISUAL OFICIAL PLUMARELI — EDITORIAL LÚDICO INSTITUCIONAL
Crie como uma marca educacional contemporânea e proprietária, não como panfleto infantil.
Regra: 1 mensagem + 1 protagonista + 1 gesto gráfico.
Personagens oficiais permanecem em 3D quando houver referência. Nunca invente mascote, altere espécie, rosto, pelagem, roupa, acessórios ou proporções do personagem anexado. Nunca redesenhe a logo fornecida.
Tipografia, fundos, ícones e gestos gráficos são 2D. Use bastante espaço negativo, texto curto, grande e legível, e paleta azul profundo, creme, rosa e verde-lima.
Evite excesso de mascotes, estrelinhas, setas, cadernos, lápis, livros, confetes, rabiscos, texto 3D, contornos, sombras pesadas e cenário escolar literal. Preserve os ativos anexados com alta fidelidade. Texto obrigatório deve ser escrito exatamente em português.`;

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PLUMARELI Image Studio</title><style>
:root{--b:#071f86;--c:#fff5df;--p:#f04487;--l:#c8e600;--i:#071a64;--line:#dde2f4}*{box-sizing:border-box}body{margin:0;background:#f7f8ff;color:var(--i);font-family:ui-rounded,system-ui,-apple-system,"Segoe UI",sans-serif}button,input,textarea,select{font:inherit}.wrap{max-width:1450px;margin:auto;padding:28px}.top{display:flex;justify-content:space-between;gap:18px;align-items:end;margin-bottom:24px}.top h1{font-size:clamp(30px,4vw,54px);line-height:1;margin:4px 0}.ey{font-size:12px;font-weight:900;letter-spacing:.15em;color:#5265b4;margin:0}.grid{display:grid;grid-template-columns:minmax(390px,.9fr) minmax(390px,1.1fr);gap:20px}.card{background:white;border:1px solid var(--line);border-radius:26px;padding:22px;box-shadow:0 16px 45px #1b2f6b12}.stack{display:grid;gap:16px}label{display:grid;gap:7px;font-weight:800}input,textarea,select{width:100%;padding:12px 13px;border:1px solid var(--line);border-radius:14px;background:#fbfcff;color:var(--i)}textarea{resize:vertical}.buttons{display:flex;gap:8px;flex-wrap:wrap}.chip,.ghost,.download{border:1px solid var(--line);background:#fff;color:var(--i);padding:9px 12px;border-radius:999px;font-weight:800;cursor:pointer}.primary{border:0;background:var(--b);color:white;padding:14px;border-radius:15px;font-weight:900;cursor:pointer}.primary:disabled{opacity:.55}.preview{min-height:650px;background:var(--c);border-radius:20px;display:grid;place-items:center;overflow:hidden}.preview img{width:100%;height:100%;max-height:850px;object-fit:contain}.muted{color:#7580a9}.notice{background:#eef1ff;padding:11px 13px;border-radius:13px;margin:0;font-size:13px}.refs{display:flex;gap:8px;overflow:auto}.refs img{width:74px;height:74px;object-fit:cover;border-radius:12px;border:1px solid var(--line)}.history{margin-top:24px}.history-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:10px}.history-grid article{background:#fff;border:1px solid var(--line);border-radius:16px;overflow:hidden}.history-grid img{width:100%;aspect-ratio:2/3;object-fit:cover}.history-grid div{padding:9px;display:grid;gap:3px}.history-grid small{color:#7984ae}.login{min-height:100vh;display:grid;place-items:center;padding:22px}.login .card{width:min(440px,100%)}.two{display:grid;grid-template-columns:1fr 1fr;gap:10px}.toggle{grid-template-columns:auto 1fr;align-items:center}.toggle input{width:18px}.hidden{display:none!important}@media(max-width:950px){.grid{grid-template-columns:1fr}.wrap{padding:16px}.preview{min-height:520px}.history-grid{grid-template-columns:repeat(3,1fr)}}@media(max-width:580px){.two{grid-template-columns:1fr}.history-grid{grid-template-columns:repeat(2,1fr)}.top h1{font-size:34px}}
</style></head><body><div id="app"></div><script type="module">
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const URL='${SUPABASE_URL}', KEY='${SUPABASE_KEY}', BUCKET='${BUCKET}'; const supabase=createClient(URL,KEY);
const presets={
'post1':{label:'Post 1 · Oferta',text:'Criar post vertical para feed. Fundo creme. Texto principal: “5 primeiras famílias.” em azul profundo, grande e editorial. Cápsula rosa: “1º mês · R$180”. Microetiqueta: “ACOMPANHAMENTO ESCOLAR”. Usar exatamente o personagem oficial anexado entrando pela lateral direita, sem inventar outro personagem. Logo oficial pequena como assinatura. Muito espaço vazio. Não adicionar CTA, materiais escolares nem textos extras.'},
'post2':{label:'Post 2 · Marca',text:'Criar post vertical para feed. Fundo azul profundo. Texto único: “Cada aluno tem uma jornada.” em creme, grande e editorial. Usar exatamente o tamanduá oficial anexado na parte inferior direita com sua lupa. Inserir uma única trilha pontilhada verde-lima, discreta, sugerindo descoberta. Não adicionar preço, CTA, lista, cenário ou outros mascotes.'},
'post3':{label:'Post 3 · Carrossel',text:'Criar capa vertical de carrossel. Texto principal: “Nem sempre é falta de vontade.”. Usar exatamente a capivara oficial anexada como único personagem, com expressão pensativa e acolhedora. Composição editorial limpa, bastante espaço negativo, fundo rosa ou creme com azul profundo. Inserir apenas “deslize →” pequeno. Não explicar o conteúdo ainda.'}}
let session=null,isAdmin=false,files=[],label=presets.post1.label;
const app=document.querySelector('#app');
function loginView(msg=''){app.innerHTML='<main class="login"><section class="card stack"><p class="ey">PLUMARELI · INTERNO</p><h1>Image Studio</h1><p class="muted">Entre com o mesmo acesso administrativo do Pumarelli.</p><form id="login" class="stack"><label>E-mail<input id="email" type="email" required></label><label>Senha<input id="password" type="password" required></label><button class="primary">Entrar</button></form>'+(msg?'<p class="notice">'+esc(msg)+'</p>':'')+'</section></main>';document.querySelector('#login').onsubmit=async(e)=>{e.preventDefault();const {error}=await supabase.auth.signInWithPassword({email:document.querySelector('#email').value,password:document.querySelector('#password').value});if(error)loginView(error.message)}}
function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
async function check(){const {data:{session:s}}=await supabase.auth.getSession();session=s;if(!s){loginView();return}const {data}=await supabase.from('user_roles').select('role').eq('user_id',s.user.id);isAdmin=!!data?.some(x=>x.role==='admin');if(!isAdmin){app.innerHTML='<main class="login"><section class="card"><h1>Acesso restrito</h1><p>Este estúdio é apenas para administradores.</p><button id="logout" class="primary">Sair</button></section></main>';document.querySelector('#logout').onclick=()=>supabase.auth.signOut();return}studioView();loadHistory()}
function studioView(){app.innerHTML='<main class="wrap"><header class="top"><div><p class="ey">PLUMARELI · IMAGE STUDIO</p><h1>Cards com a identidade já embutida.</h1></div><button id="logout" class="ghost">Sair</button></header><section class="grid"><form id="gen" class="card stack"><div><h2>Ponto de partida</h2><div class="buttons"><button type="button" class="chip" data-p="post1">Post 1</button><button type="button" class="chip" data-p="post2">Post 2</button><button type="button" class="chip" data-p="post3">Post 3</button><button type="button" class="chip" data-p="free">Livre</button></div></div><label>O que você quer criar?<textarea id="prompt" rows="9" required>'+esc(presets.post1.text)+'</textarea></label><label>Referências oficiais <small class="muted">logo, mascote e/ou posts anteriores · até 6</small><input id="files" type="file" accept="image/png,image/jpeg,image/webp" multiple></label><div id="refs" class="refs"></div><div class="two"><label>Formato<select id="size"><option value="1024x1536">Vertical</option><option value="1024x1024">Quadrado</option><option value="1536x1024">Horizontal</option></select></label><label>Qualidade<select id="quality"><option value="high">Alta</option><option value="medium">Média</option><option value="low">Teste</option></select></label></div><label class="toggle"><input id="brand" type="checkbox" checked><span>Aplicar bíblia visual Pumarelli</span></label><label>Chave da OpenAI <small class="muted">fica somente nesta aba; não é salva no banco</small><input id="apiKey" type="password" placeholder="sk-…" required autocomplete="off"></label><button id="go" class="primary">Gerar card</button><p id="msg" class="notice hidden"></p></form><aside class="card"><div class="top"><div><p class="ey">RESULTADO</p><h2>Prévia</h2></div><a id="down" class="download hidden" target="_blank">Abrir / baixar</a></div><div id="preview" class="preview"><div class="muted">Seu card aparece aqui.</div></div></aside></section><section class="history"><p class="ey">SUPABASE</p><h2>Últimas gerações</h2><div id="history" class="history-grid"></div></section></main>';
const saved=sessionStorage.getItem('plumareli_openai_key');if(saved)document.querySelector('#apiKey').value=saved;document.querySelector('#logout').onclick=()=>supabase.auth.signOut();document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{const k=b.dataset.p;if(k==='free'){document.querySelector('#prompt').value='';label='Livre'}else{document.querySelector('#prompt').value=presets[k].text;label=presets[k].label}});document.querySelector('#files').onchange=e=>{files=[...e.target.files].slice(0,6);document.querySelector('#refs').innerHTML=files.map(f=>'<img alt="referência" src="'+URL.createObjectURL(f)+'">').join('')};document.querySelector('#gen').onsubmit=generate}
async function generate(e){e.preventDefault();const go=document.querySelector('#go'),msg=document.querySelector('#msg');go.disabled=true;msg.classList.remove('hidden');msg.textContent='Gerando com GPT Image 2…';const key=document.querySelector('#apiKey').value.trim();sessionStorage.setItem('plumareli_openai_key',key);try{const form=new FormData();form.set('apiKey',key);form.set('prompt',document.querySelector('#prompt').value);form.set('postLabel',label);form.set('brandMode',document.querySelector('#brand').checked?'true':'false');form.set('size',document.querySelector('#size').value);form.set('quality',document.querySelector('#quality').value);files.forEach(f=>form.append('images',f,f.name));const r=await fetch(location.href,{method:'POST',headers:{Authorization:'Bearer '+session.access_token},body:form});const j=await r.json();if(!r.ok)throw new Error(j.error||'Falha na geração');document.querySelector('#preview').innerHTML='<img alt="card gerado" src="'+j.url+'">';const d=document.querySelector('#down');d.href=j.url;d.classList.remove('hidden');msg.textContent='Imagem pronta e salva no histórico.';await loadHistory()}catch(err){msg.textContent=err.message||'Não foi possível gerar.'}finally{go.disabled=false}}
async function loadHistory(){const {data}=await supabase.from('image_studio_generations').select('id,post_label,storage_path,created_at').order('created_at',{ascending:false}).limit(12);const rows=data||[];const cards=await Promise.all(rows.map(async r=>{const {data:s}=await supabase.storage.from(BUCKET).createSignedUrl(r.storage_path,3600);return '<article>'+(s?.signedUrl?'<img src="'+s.signedUrl+'" alt="'+esc(r.post_label||'Card')+'">':'')+'<div><strong>'+esc(r.post_label||'Card')+'</strong><small>'+new Date(r.created_at).toLocaleString('pt-BR')+'</small></div></article>'}));document.querySelector('#history').innerHTML=cards.join('')||'<p class="muted">Ainda não há gerações.</p>'}
supabase.auth.onAuthStateChange((_e,s)=>{session=s;setTimeout(check,0)});check();
</script></body></html>`;

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8" } });
}

function decodeBase64(value: string) {
  const binary = atob(value);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}

Deno.serve(async (req: Request) => {
  if (req.method === "GET") return new Response(html, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
  if (req.method !== "POST") return json({ error: "Método não permitido." }, 405);

  try {
    const bearer = req.headers.get("authorization") || "";
    const token = bearer.startsWith("Bearer ") ? bearer.slice(7) : "";
    if (!token) return json({ error: "Entre novamente no estúdio." }, 401);

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError || !userData.user) return json({ error: "Sessão inválida." }, 401);
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", userData.user.id);
    if (!roles?.some((row: { role: string }) => row.role === "admin")) return json({ error: "Acesso restrito a administradores." }, 403);

    const form = await req.formData();
    const apiKey = String(form.get("apiKey") || "").trim();
    const prompt = String(form.get("prompt") || "").trim();
    const postLabel = String(form.get("postLabel") || "Card").slice(0, 120);
    const brandMode = String(form.get("brandMode") || "true") === "true";
    const requestedSize = String(form.get("size") || "1024x1536");
    const requestedQuality = String(form.get("quality") || "high");
    const size = ["1024x1024", "1024x1536", "1536x1024"].includes(requestedSize) ? requestedSize : "1024x1536";
    const quality = ["low", "medium", "high"].includes(requestedQuality) ? requestedQuality : "high";
    const images = form.getAll("images").filter((value): value is File => value instanceof File && value.size > 0).slice(0, 6);
    if (!apiKey.startsWith("sk-")) return json({ error: "Informe uma chave de API OpenAI válida." }, 400);
    if (!prompt || prompt.length > 12000) return json({ error: "Escreva um prompt de até 12.000 caracteres." }, 400);

    const finalPrompt = `${brandMode ? BRAND : ""}\n\nPEDIDO DESTA PEÇA:\n${prompt}`.trim();
    let openaiResponse: Response;
    if (images.length) {
      const body = new FormData();
      body.set("model", "gpt-image-2");
      body.set("prompt", finalPrompt);
      body.set("size", size);
      body.set("quality", quality);
      for (const image of images) body.append("image[]", image, image.name || "reference.png");
      openaiResponse = await fetch("https://api.openai.com/v1/images/edits", { method: "POST", headers: { Authorization: `Bearer ${apiKey}` }, body });
    } else {
      openaiResponse = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
        body: JSON.stringify({ model: "gpt-image-2", prompt: finalPrompt, size, quality }),
      });
    }
    const generated = await openaiResponse.json();
    if (!openaiResponse.ok) return json({ error: generated?.error?.message || "A OpenAI não conseguiu gerar a imagem." }, openaiResponse.status);
    const item = generated?.data?.[0];
    let bytes: Uint8Array;
    let contentType = "image/png";
    if (item?.b64_json) {
      bytes = decodeBase64(item.b64_json);
    } else if (item?.url) {
      const imageResponse = await fetch(item.url);
      if (!imageResponse.ok) throw new Error("Não consegui baixar a imagem gerada.");
      contentType = imageResponse.headers.get("content-type") || contentType;
      bytes = new Uint8Array(await imageResponse.arrayBuffer());
    } else {
      throw new Error("A OpenAI não retornou uma imagem utilizável.");
    }

    const storagePath = `${userData.user.id}/${Date.now()}-${crypto.randomUUID()}.png`;
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(storagePath, bytes, { contentType, cacheControl: "31536000", upsert: false });
    if (uploadError) throw uploadError;
    const { error: rowError } = await supabase.from("image_studio_generations").insert({ user_id: userData.user.id, prompt, post_label: postLabel, storage_path: storagePath, model: "gpt-image-2", size, quality });
    if (rowError) {
      await supabase.storage.from(BUCKET).remove([storagePath]);
      throw rowError;
    }
    const { data: signed, error: signedError } = await supabase.storage.from(BUCKET).createSignedUrl(storagePath, 3600);
    if (signedError || !signed?.signedUrl) throw signedError || new Error("Imagem salva, mas não consegui criar a prévia.");
    return json({ url: signed.signedUrl, model: "gpt-image-2", size, quality });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Não foi possível gerar a imagem." }, 500);
  }
});
