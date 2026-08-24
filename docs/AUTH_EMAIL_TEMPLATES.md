# PLUMARELI — templates de e-mail do Supabase Auth

Fonte canônica dos modelos de e-mail usados pela autenticação da PLUMARELI.

## Remetente

- Sender name: `PLUMARELI`
- Sender email: `contato.plumareli@gmail.com`
- Instagram: `https://www.instagram.com/plumareli/`

O Custom SMTP deve permanecer ativo no Supabase. Senhas SMTP nunca devem ser registradas no GitHub.

## Cores da marca usadas nos e-mails

- Navy: `#17264a`
- Blue: `#3b63ee`
- Pink: `#ef5799`
- Lime: `#b8ed4b`
- Yellow: `#ffd66b`
- Text: `#202b43`
- Muted: `#667188`
- Canvas: `#f8f6f0`

## 1. Reset Password

Este é o template mais importante no fluxo atual. Ele é usado tanto por:

- `Primeiro acesso` solicitado na tela pública;
- `Esqueci minha senha`.

Assunto:

`Defina sua senha | Plumareli`

HTML:

```html
<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:0;background:#f8f6f0;font-family:Arial,Helvetica,sans-serif;color:#202b43;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f8f6f0;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#ffffff;border:1px solid #e2e6ee;border-radius:24px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px 18px;background:#17264a;text-align:center;">
                <div style="font-size:26px;line-height:1;font-weight:800;letter-spacing:.06em;color:#ffffff;">PLUMARELI</div>
                <div style="margin-top:9px;font-size:13px;color:#dfe5ff;">Tecnologia ajuda. Seu cérebro resolve.</div>
              </td>
            </tr>
            <tr>
              <td style="height:6px;background:linear-gradient(90deg,#3b63ee,#704be8,#ef5799,#ffd66b,#b8ed4b);"></td>
            </tr>
            <tr>
              <td style="padding:34px 32px 28px;">
                <div style="display:inline-block;padding:7px 12px;border-radius:999px;background:#f3f5fa;color:#2f50ce;font-size:12px;font-weight:700;">Acesso Plumareli</div>
                <h1 style="margin:18px 0 12px;font-size:26px;line-height:1.2;color:#17264a;">Defina sua senha</h1>
                <p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:#667188;">Olá!</p>
                <p style="margin:0 0 24px;font-size:16px;line-height:1.65;color:#667188;">Recebemos uma solicitação para criar ou redefinir a senha do seu acesso ao <strong style="color:#202b43;">Plumareli</strong>.</p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 26px;">
                  <tr>
                    <td bgcolor="#3b63ee" style="border-radius:999px;">
                      <a href="{{ .ConfirmationURL }}" style="display:inline-block;padding:14px 24px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;">Criar ou redefinir minha senha</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 14px;font-size:13px;line-height:1.6;color:#667188;">Por segurança, use apenas este botão para continuar. Se você não solicitou essa alteração, pode ignorar este e-mail.</p>
                <div style="margin-top:26px;padding-top:22px;border-top:1px solid #e2e6ee;">
                  <p style="margin:0 0 5px;font-size:13px;color:#667188;"><strong style="color:#202b43;">Equipe Plumareli</strong></p>
                  <p style="margin:0 0 5px;font-size:13px;color:#667188;">contato.plumareli@gmail.com</p>
                  <p style="margin:0;font-size:13px;"><a href="https://www.instagram.com/plumareli/" style="color:#3b63ee;text-decoration:none;">Instagram @plumareli</a></p>
                </div>
              </td>
            </tr>
          </table>
          <p style="margin:14px 0 0;font-size:11px;line-height:1.5;color:#8a94a8;">Mensagem automática de segurança do Plumareli.</p>
        </td>
      </tr>
    </table>
  </body>
</html>
```

## 2. Magic Link

Este template é usado atualmente pelos acessos enviados pela Administração através das Edge Functions de acesso.

Assunto:

`Seu acesso ao Plumareli está pronto`

HTML:

```html
<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:0;background:#f8f6f0;font-family:Arial,Helvetica,sans-serif;color:#202b43;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f8f6f0;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#ffffff;border:1px solid #e2e6ee;border-radius:24px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px 18px;background:#17264a;text-align:center;">
                <div style="font-size:26px;line-height:1;font-weight:800;letter-spacing:.06em;color:#ffffff;">PLUMARELI</div>
                <div style="margin-top:9px;font-size:13px;color:#dfe5ff;">Tecnologia ajuda. Seu cérebro resolve.</div>
              </td>
            </tr>
            <tr>
              <td style="height:6px;background:linear-gradient(90deg,#3b63ee,#704be8,#ef5799,#ffd66b,#b8ed4b);"></td>
            </tr>
            <tr>
              <td style="padding:34px 32px 28px;">
                <div style="display:inline-block;padding:7px 12px;border-radius:999px;background:#f3f5fa;color:#2f50ce;font-size:12px;font-weight:700;">Bem-vindo ao Plumareli</div>
                <h1 style="margin:18px 0 12px;font-size:26px;line-height:1.2;color:#17264a;">Seu acesso está pronto</h1>
                <p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:#667188;">Olá!</p>
                <p style="margin:0 0 24px;font-size:16px;line-height:1.65;color:#667188;">A equipe Plumareli preparou seu acesso. Clique no botão abaixo para continuar e definir sua senha.</p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 26px;">
                  <tr>
                    <td bgcolor="#3b63ee" style="border-radius:999px;">
                      <a href="{{ .ConfirmationURL }}" style="display:inline-block;padding:14px 24px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;">Criar minha senha</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 14px;font-size:13px;line-height:1.6;color:#667188;">Se você não esperava receber este acesso, não clique no botão e entre em contato com a equipe Plumareli.</p>
                <div style="margin-top:26px;padding-top:22px;border-top:1px solid #e2e6ee;">
                  <p style="margin:0 0 5px;font-size:13px;color:#667188;"><strong style="color:#202b43;">Equipe Plumareli</strong></p>
                  <p style="margin:0 0 5px;font-size:13px;color:#667188;">contato.plumareli@gmail.com</p>
                  <p style="margin:0;font-size:13px;"><a href="https://www.instagram.com/plumareli/" style="color:#3b63ee;text-decoration:none;">Instagram @plumareli</a></p>
                </div>
              </td>
            </tr>
          </table>
          <p style="margin:14px 0 0;font-size:11px;line-height:1.5;color:#8a94a8;">Mensagem automática de acesso do Plumareli.</p>
        </td>
      </tr>
    </table>
  </body>
</html>
```

## Observações importantes

- Não substituir `{{ .ConfirmationURL }}` por uma URL fixa. Ela contém o token seguro gerado pelo Supabase.
- O fluxo atual usa `/auth/confirm?next=/definir-senha` como redirect de aplicação.
- O template `Reset Password` precisa servir tanto para primeiro acesso solicitado quanto para recuperação de senha.
- O template `Magic Link` é usado pelas rotinas administrativas que chamam `signInWithOtp`.
- Não habilitar rastreamento/reescrita de links no provedor SMTP, pois isso pode alterar links de autenticação.
