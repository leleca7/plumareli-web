# PLUMARELI — Contexto operacional para ChatGPT e agentes

Este arquivo é a porta de entrada para qualquer ChatGPT/agente que trabalhe neste repositório.

## 1. Quando ler este arquivo

Se o usuário disser algo como:

- “entre no GitHub e entenda isso”;
- “olhe o Plumareli no GitHub”;
- “use o contexto do Plumareli”;
- “faça isso no site”;
- “corrija isso no Plumareli”;
- “crie/programa as atividades no site”;
- “veja como já fizemos antes e continue”;

trate isso como autorização para abrir este repositório, ler este arquivo e auditar os arquivos relevantes antes de responder ou editar.

Não peça ao usuário para explicar novamente uma estrutura que já pode ser descoberta no código.

## 2. Regra principal de trabalho

O usuário não deve precisar executar tarefas repetitivas uma por uma quando elas podem ser resolvidas de forma segura em lote.

Quando houver uma sequência de atividades, materiais, avaliações, correções ou datas:

1. descubra a estrutura existente no repositório;
2. identifique a fonte de verdade dos dados;
3. modele a sequência como configuração/dataset quando possível;
4. crie uma ação em lote ou fluxo idempotente;
5. preserve entregas e correções já existentes;
6. permita repetir a ação sem duplicar registros;
7. em caso de falha parcial, retome apenas o que faltou;
8. evite obrigar o professor a publicar ou atribuir item por item.

Exemplo: um plano de recuperação com 9 dias deve ser representado por um plano/configuração e uma ação que crie/atualize/atribua todas as etapas, e não por 9 processos manuais independentes.

## 3. O que uma instrução explícita do usuário autoriza

A regra de revisão humana continua válida, porém uma solicitação explícita na conversa conta como autorização humana para executar aquela ação.

Portanto:

- não publique nem altere conteúdo pedagógico por iniciativa própria sem pedido;
- se o usuário disser “crie”, “edite”, “programe”, “publique”, “atribua”, “corrija no site” ou equivalente, você pode implementar essa mudança diretamente no GitHub e, quando as integrações estiverem disponíveis, usar os serviços conectados necessários;
- não transforme uma autorização específica em autorização permanente para mudanças não relacionadas;
- antes de alterações destrutivas ou de grande alcance, confirme o escopo quando houver ambiguidade real.

## 4. Fluxo obrigatório ao receber um pedido sobre o site

Sempre que o pedido envolver comportamento do Plumareli:

1. leia `AGENTS.md`;
2. pesquise o código pelo nome da tela, mensagem de erro, rota, tabela ou função relacionada;
3. leia os arquivos diretamente envolvidos antes de editar;
4. verifique migrations/RLS quando houver banco de dados;
5. implemente no menor número de arquivos possível sem criar fluxo paralelo;
6. preserve compatibilidade com o que já existe;
7. se houver deploy automático via Git, acompanhe o deploy e confirme se ficou `READY`;
8. quando possível, abra a rota alterada e valide o resultado;
9. diga ao usuário exatamente o que foi alterado e o que, se houver, depende de acesso externo não disponível.

Nunca diga que algo foi gravado no banco, atribuído a um aluno ou publicado para uma família se você só alterou código e não confirmou a persistência real.

## 5. Regra para erros e falhas parciais

Mensagens genéricas como “uma atividade não pôde ser atribuída” devem ser tratadas como ponto de partida para diagnóstico, não como resposta final.

Ao depurar:

- localize exatamente onde a mensagem é gerada;
- preserve/capture o erro técnico no servidor sem expor dados sensíveis;
- verifique constraints, RLS, triggers, limites de plano, vínculos professor-aluno e conflitos de unicidade;
- prefira operações idempotentes;
- uma nova tentativa deve completar os itens faltantes e preservar os que já foram criados, enviados, corrigidos ou avaliados;
- se um lote falhar no item N, não recrie os itens 1…N-1 desnecessariamente.

## 6. Regras específicas para atividades e planos pedagógicos

O Plumareli trabalha com atividades impressas/Caderno, materiais de apoio, Missões, avaliações e correções.

Para planos pedagógicos com várias datas:

- centralize conteúdo e cronograma em um único arquivo/configuração quando fizer sentido;
- use datas, prazos, título, objetivo, conteúdo e folha imprimível a partir dessa fonte;
- deixe o último dia antes de uma prova para fechamento/revisão quando isso fizer parte do planejamento definido pelo usuário;
- não crie atividades no dia da prova se o usuário determinou que o aluno deve chegar apenas preparado;
- dê preferência a atividades para escrita manual quando o aluno trabalha melhor no papel;
- quiz é complementar, não obrigatório;
- as correções devem alimentar o histórico pedagógico e o próximo passo.

## 7. Correções de atividades da escola

Quando o professor corrigir uma atividade do colégio, o registro ideal deve permitir que aluno/família vejam uma devolutiva clara, incluindo, quando disponível:

- conteúdo/atividade trabalhada;
- o que já está funcionando;
- onde houve dificuldade;
- o que foi trabalhado na correção;
- próximo passo;
- nota/desempenho, se houver.

Não trate ausência de nota como nota zero.

## 8. Princípios técnicos permanentes

1. Não reconstruir módulos sem auditar o código existente.
2. Conteúdo, habilidade e evidência são conceitos diferentes.
3. Uma evidência isolada não produz diagnóstico definitivo.
4. Domínio, autonomia e confiança devem permanecer separados.
5. A IA sugere; a revisão pedagógica humana prevalece.
6. Não publicar atividade sem autorização humana; uma ordem explícita do usuário na conversa vale como essa autorização para o escopo solicitado.
7. Não expor evidência bruta à família/criança quando o estado agregado for suficiente.
8. Reutilizar vínculos e dados já existentes.
9. Segurança deve existir também no banco via RLS.
10. Implementado, testado e validado são estados diferentes.
11. Não usar dados pessoais reais em fixtures, logs ou exemplos.
12. Trabalhar por fluxo vertical: ação → persistência → permissão → efeito nos outros perfis.
13. Preservar identificadores técnicos legados `curio` quando renomeá-los puder quebrar migrations, banco, imports ou CSS existente.
14. Novos nomes públicos, documentação ativa e novos identificadores sem dependência legada devem usar PLUMARELI.
15. Preferir ações em lote, idempotentes e retomáveis a operações repetitivas manuais.
16. Não criar duplicidade silenciosa para “resolver” erro de atribuição.
17. Preservar histórico de entrega/correção sempre que houver reprogramação ou nova tentativa.

## 9. Serviços e limites de acesso

- GitHub é a fonte principal para compreender e editar o código.
- Vercel deve ser usado para acompanhar/validar deploy quando disponível.
- Supabase deve ser usado para consultar ou alterar dados/migrations quando a conexão estiver disponível.
- Se o Supabase não estiver conectado, implemente o código/migration necessário, mas não afirme que dados de produção foram modificados.
- Nunca coloque chaves, tokens ou segredos no repositório.

## 10. Como responder ao usuário depois de uma alteração

Seja objetivo. Informe:

- o que foi alterado;
- se já está no GitHub;
- se o deploy ficou pronto;
- se houve alteração real de banco/dados ou apenas de código;
- o próximo passo somente quando ele for realmente necessário.

Evite mandar o usuário repetir operações individuais que o próprio sistema pode automatizar.

---

Última atualização operacional: 2026-09-14.
