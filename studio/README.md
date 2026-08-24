# Pumarelli Image Studio

Estúdio interno para gerar cards Pumarelli usando GPT Image 2, com autenticação e histórico no Supabase existente.

- login com a conta Pumarelli;
- acesso limitado ao papel `admin`;
- prompt com bíblia visual Pumarelli embutida;
- até 6 imagens de referência;
- chave OpenAI guardada apenas em `sessionStorage` e enviada somente ao endpoint de geração;
- imagens no bucket privado `plumareli-image-studio`;
- histórico em `public.image_studio_generations` com RLS por usuário.
