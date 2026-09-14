export type RecoveryWorkspace = "short" | "medium" | "large";

export type RecoveryQuestion = {
  prompt: string;
  workspace?: RecoveryWorkspace;
};

export type MathRecoveryDay = {
  slug: string;
  date: string;
  dueTime: string;
  title: string;
  subtitle: string;
  minutes: number;
  objective: string;
  accent: "blue" | "pink" | "purple" | "navy";
  remember?: string[];
  example?: string;
  questions: RecoveryQuestion[];
  finalReview?: string[];
  checklist: string[];
  answerKey: string[];
};

export const MATH_RECOVERY_EXAM = {
  date: "2026-09-23",
  time: "13:30",
  endTime: "15:00",
  title: "Recuperação Paralela - Matemática",
  note: "Dia de prova. Sem atividade nova: apenas alimentação, material organizado e chegada com antecedência.",
};

export const mathRecoveryPlan: MathRecoveryDay[] = [
  {
    slug: "14-porcentagem-diagnostico",
    date: "2026-09-14",
    dueTime: "21:00",
    title: "Porcentagem - diagnóstico e retomada",
    subtitle: "Começar pelo essencial e descobrir exatamente onde ainda existe dúvida.",
    minutes: 45,
    objective: "Resolver porcentagens simples e problemas de desconto/aumento mostrando o raciocínio no papel.",
    accent: "navy",
    remember: [
      "p% de um valor = (p/100) × valor.",
      "10% é dividir por 10; 50% é a metade; 25% é a quarta parte.",
      "Desconto: calcule quanto sai e depois subtraia. Aumento: calcule quanto entra e depois some.",
      "Quando o valor final é dado, descubra qual porcentagem do valor inicial permaneceu.",
    ],
    example: "Exemplo: 20% de 150 = 0,20 × 150 = 30. Se fosse um desconto, o preço final seria 150 - 30 = 120.",
    questions: [
      { prompt: "1. Calcule 10% de 480.", workspace: "short" },
      { prompt: "2. Calcule 25% de 360.", workspace: "short" },
      { prompt: "3. Calcule 15% de 320.", workspace: "medium" },
      { prompt: "4. Uma mochila custa R$ 240,00 e recebeu 25% de desconto. Qual é o valor do desconto? Qual é o preço final?", workspace: "large" },
      { prompt: "5. Uma mensalidade de R$ 450,00 teve aumento de 12%. Qual passou a ser o novo valor?", workspace: "large" },
      { prompt: "6. Depois de um desconto de 20%, um produto passou a custar R$ 160,00. Qual era o preço original?", workspace: "large" },
      { prompt: "7. O número 30 representa quantos por cento de 120?", workspace: "medium" },
      { prompt: "8. Um produto de R$ 500,00 recebe 10% de desconto e, depois, mais 20% sobre o novo preço. Qual é o preço final? O desconto total foi de 30%? Justifique.", workspace: "large" },
      { prompt: "9. Um valor de R$ 300,00 aumenta 20% e depois diminui 20% sobre o novo valor. Qual é o valor final? Explique por que ele não volta a R$ 300,00.", workspace: "large" },
      { prompt: "10. Em uma turma de 40 estudantes, 65% entregaram uma atividade. Quantos estudantes entregaram?", workspace: "medium" },
    ],
    checklist: ["Transformei a porcentagem em fração/decimal corretamente.", "Usei a base certa em cada cálculo.", "Escrevi o valor final com unidade ou R$ quando necessário.", "Conferi se minha resposta faz sentido."],
    answerKey: ["1) 48", "2) 90", "3) 48", "4) desconto R$ 60,00; final R$ 180,00", "5) R$ 504,00", "6) R$ 200,00", "7) 25%", "8) R$ 360,00; desconto total efetivo de 28%", "9) R$ 288,00", "10) 26 estudantes"],
  },
  {
    slug: "15-porcentagem-pontos-notaveis",
    date: "2026-09-15",
    dueTime: "21:00",
    title: "Porcentagem + pontos notáveis do triângulo",
    subtitle: "Fixar porcentagem e separar, sem confusão, mediana, bissetriz, mediatriz e altura.",
    minutes: 50,
    objective: "Resolver porcentagem com segurança e identificar os quatro pontos notáveis do triângulo pela construção que os determina.",
    accent: "pink",
    remember: [
      "Mediana: liga um vértice ao ponto médio do lado oposto. Encontro das medianas = baricentro.",
      "Bissetriz: divide um ângulo em duas partes iguais. Encontro das bissetrizes = incentro.",
      "Mediatriz: reta perpendicular a um lado passando pelo seu ponto médio. Encontro das mediatrizes = circuncentro.",
      "Altura: segmento perpendicular do vértice ao lado oposto (ou ao prolongamento). Encontro das alturas = ortocentro.",
      "Incentro é equidistante dos lados; circuncentro é equidistante dos vértices.",
    ],
    example: "Dica de memória: MEDIANA → BARICENTRO; BISSETRIZ → INCENTRO; MEDIATRIZ → CIRCUNCENTRO; ALTURA → ORTOCENTRO.",
    questions: [
      { prompt: "1. Calcule 18% de 250.", workspace: "medium" },
      { prompt: "2. Um aparelho custa R$ 800,00 e recebe 15% de desconto. Qual é o preço final?", workspace: "medium" },
      { prompt: "3. Depois de um desconto de 30%, um produto custa R$ 210,00. Qual era o preço original?", workspace: "large" },
      { prompt: "4. R$ 250,00 aumenta 10% e depois recebe desconto de 10% sobre o novo valor. Qual é o resultado final?", workspace: "large" },
      { prompt: "5. Como se chama o segmento que liga um vértice ao ponto médio do lado oposto?", workspace: "short" },
      { prompt: "6. Qual é o ponto de encontro das três medianas?", workspace: "short" },
      { prompt: "7. Qual é o ponto de encontro das três bissetrizes internas?", workspace: "short" },
      { prompt: "8. Qual é o ponto de encontro das mediatrizes dos lados?", workspace: "short" },
      { prompt: "9. Qual é o ponto de encontro das alturas?", workspace: "short" },
      { prompt: "10. Desenhe um triângulo qualquer. Trace, a partir do mesmo vértice, uma mediana e uma altura. Identifique as duas construções.", workspace: "large" },
      { prompt: "11. Qual ponto notável é equidistante dos lados do triângulo? Explique qual construção chega até ele.", workspace: "medium" },
      { prompt: "12. Qual ponto notável é equidistante dos vértices do triângulo? Explique qual construção chega até ele.", workspace: "medium" },
    ],
    checklist: ["Não confundi mediana com mediatriz.", "Associei cada construção ao ponto notável correto.", "Nos problemas de porcentagem, usei a base correta.", "Refiz as questões em que hesitei antes de encerrar."],
    answerKey: ["1) 45", "2) R$ 680,00", "3) R$ 300,00", "4) R$ 247,50", "5) mediana", "6) baricentro", "7) incentro", "8) circuncentro", "9) ortocentro", "10) resposta por desenho", "11) incentro; encontro das bissetrizes", "12) circuncentro; encontro das mediatrizes"],
  },
  {
    slug: "16-circunferencias",
    date: "2026-09-16",
    dueTime: "21:00",
    title: "Circunferências - raio, diâmetro, comprimento e arco",
    subtitle: "Organizar as fórmulas e decidir qual medida o problema realmente pede.",
    minutes: 45,
    objective: "Relacionar raio e diâmetro, calcular comprimento de circunferência e resolver situações com voltas, arcos e tangente.",
    accent: "blue",
    remember: [
      "Diâmetro: d = 2r. Portanto, raio = d/2.",
      "Comprimento da circunferência: C = 2πr = πd.",
      "Quando for pedido valor aproximado, use π ≈ 3,14.",
      "Comprimento de um arco = (ângulo central/360°) × C.",
      "O raio traçado até o ponto de tangência forma 90° com a reta tangente.",
    ],
    example: "Exemplo: se r = 5 cm, então d = 10 cm e C ≈ 2 × 3,14 × 5 = 31,4 cm.",
    questions: [
      { prompt: "1. Uma circunferência tem raio de 7 cm. Determine o diâmetro e o comprimento aproximado.", workspace: "medium" },
      { prompt: "2. Uma circunferência tem diâmetro de 20 cm. Determine o raio e o comprimento aproximado.", workspace: "medium" },
      { prompt: "3. Uma roda de bicicleta tem diâmetro de 70 cm. Aproximadamente quantos centímetros um ponto da borda percorre em 5 voltas completas?", workspace: "large" },
      { prompt: "4. Em uma circunferência de raio 12 cm, um arco corresponde a um ângulo central de 120°. Calcule o comprimento aproximado desse arco.", workspace: "large" },
      { prompt: "5. Uma reta é tangente à circunferência no ponto T, e OT é um raio. Qual é o ângulo entre OT e a tangente? Justifique.", workspace: "medium" },
      { prompt: "6. O comprimento de uma circunferência é aproximadamente 31,4 cm. Determine seu diâmetro e seu raio.", workspace: "medium" },
      { prompt: "7. Uma pista circular tem raio de 20 m. Qual distância é percorrida em 3 voltas completas?", workspace: "large" },
      { prompt: "8. Se o diâmetro de uma circunferência dobra, o que acontece com o comprimento? Explique usando a fórmula.", workspace: "medium" },
    ],
    checklist: ["Antes de usar a fórmula, identifiquei se recebi raio ou diâmetro.", "Usei π = 3,14 somente quando precisava aproximar.", "Coloquei unidade nas respostas.", "Em arco, usei a fração correspondente ao ângulo central."],
    answerKey: ["1) d = 14 cm; C ≈ 43,96 cm", "2) r = 10 cm; C ≈ 62,8 cm", "3) 1099 cm", "4) 25,12 cm", "5) 90°", "6) d = 10 cm; r = 5 cm", "7) 376,8 m", "8) o comprimento também dobra"],
  },
  {
    slug: "17-folha-de-duvidas-plantao",
    date: "2026-09-17",
    dueTime: "20:30",
    title: "Plantão de Matemática - folha de dúvidas",
    subtitle: "Chegar ao plantão sabendo o que perguntar e sair com o raciocínio registrado no papel.",
    minutes: 30,
    objective: "Fazer uma revisão curta antes do plantão e transformar as dúvidas em perguntas objetivas para o professor.",
    accent: "purple",
    remember: [
      "O plantão de Matemática acontece hoje. Não tente esconder a dúvida: marque a questão em que travou e leve o raciocínio até onde conseguiu.",
      "Depois do plantão, complete os espaços finais com a explicação que fez sentido para você.",
    ],
    questions: [
      { prompt: "1. Calcule 20% de 350.", workspace: "short" },
      { prompt: "2. Um produto de R$ 400,00 recebe 15% de desconto. Qual é o preço final?", workspace: "medium" },
      { prompt: "3. Qual ponto notável é o encontro das bissetrizes?", workspace: "short" },
      { prompt: "4. Calcule o comprimento aproximado de uma circunferência de raio 5 cm.", workspace: "medium" },
      { prompt: "5. Para qual valor de x a fração 7/(x + 2) não existe?", workspace: "short" },
      { prompt: "6. Simplifique (x² - 16)/(x - 4), indicando a restrição.", workspace: "medium" },
      { prompt: "7. Dúvida que eu vou levar ao plantão (escreva a questão ou o passo em que travou):", workspace: "large" },
      { prompt: "8. Depois do plantão: o professor explicou assim...", workspace: "large" },
      { prompt: "9. Um exemplo que agora eu consigo fazer sozinho:", workspace: "large" },
      { prompt: "10. Ainda preciso revisar:", workspace: "medium" },
    ],
    checklist: ["Levei pelo menos uma dúvida concreta ao plantão.", "Registrei a explicação com minhas palavras.", "Refiz pelo menos uma questão depois da explicação.", "Se algo ainda ficou confuso, marquei para revisar amanhã."],
    answerKey: ["1) 70", "2) R$ 340,00", "3) incentro", "4) 31,4 cm", "5) x = -2", "6) x + 4, com x ≠ 4", "7-10) respostas pessoais de acompanhamento"],
  },
  {
    slug: "18-fracoes-algebricas-base",
    date: "2026-09-18",
    dueTime: "21:00",
    title: "Frações algébricas I - restrições e simplificação",
    subtitle: "Antes de operar, aprender a enxergar fatores e valores proibidos.",
    minutes: 50,
    objective: "Identificar condições de existência, fatorar expressões simples e simplificar somente fatores comuns.",
    accent: "navy",
    remember: [
      "O denominador nunca pode ser zero: registre as restrições antes ou durante a resolução.",
      "Fatore quando for possível. Só se cancelam fatores, nunca termos separados por + ou -.",
      "Depois de simplificar, a restrição da expressão original continua valendo.",
    ],
    example: "Exemplo: (x² - 9)/(x - 3) = [(x - 3)(x + 3)]/(x - 3) = x + 3, mas x ≠ 3.",
    questions: [
      { prompt: "1. Indique o valor de x para o qual 5/(x - 4) não existe.", workspace: "short" },
      { prompt: "2. Indique a restrição da fração 3/(2x + 6).", workspace: "medium" },
      { prompt: "3. Simplifique (x² - 9)/(x - 3), indicando a restrição.", workspace: "medium" },
      { prompt: "4. Simplifique (x² - 5x)/x, indicando a restrição.", workspace: "medium" },
      { prompt: "5. Simplifique (2x + 6)/(x + 3), indicando a restrição.", workspace: "medium" },
      { prompt: "6. Simplifique (x² - 16)/(x - 4), indicando a restrição.", workspace: "medium" },
      { prompt: "7. Simplifique (x² + 5x)/x, indicando a restrição.", workspace: "medium" },
      { prompt: "8. Simplifique (x² - 4)/(x² - 2x), indicando todas as restrições da expressão original.", workspace: "large" },
      { prompt: "9. Explique por que não é permitido 'cancelar o x' diretamente em (x + 3)/x.", workspace: "medium" },
      { prompt: "10. A fração (x + 4)/(x + 2) pode ser simplificada por cancelamento? Justifique e indique a restrição.", workspace: "medium" },
    ],
    checklist: ["Indiquei os valores proibidos.", "Fatorei antes de cancelar.", "Cancelei apenas fatores completos.", "Mantive as restrições da expressão original."],
    answerKey: ["1) x ≠ 4", "2) x ≠ -3", "3) x + 3, x ≠ 3", "4) x - 5, x ≠ 0", "5) 2, x ≠ -3", "6) x + 4, x ≠ 4", "7) x + 5, x ≠ 0", "8) (x + 2)/x, com x ≠ 0 e x ≠ 2", "9) x é termo de uma soma no numerador, não fator comum de todo o numerador", "10) não; já está na forma simples por cancelamento, x ≠ -2"],
  },
  {
    slug: "19-fracoes-algebricas-operacoes",
    date: "2026-09-19",
    dueTime: "18:00",
    title: "Frações algébricas II - operações",
    subtitle: "Somar, subtrair, multiplicar e dividir sem perder as restrições.",
    minutes: 55,
    objective: "Efetuar operações com frações algébricas e resolver equações simples com denominadores algébricos.",
    accent: "pink",
    remember: [
      "Soma/subtração: encontre denominador comum antes de juntar os numeradores.",
      "Multiplicação: multiplique numeradores e denominadores; simplifique fatores quando possível.",
      "Divisão: mantenha a primeira fração e multiplique pelo inverso da segunda.",
      "Registre as restrições dos denominadores originais.",
    ],
    example: "Exemplo: 1/x + 1/(2x) = 2/(2x) + 1/(2x) = 3/(2x), com x ≠ 0.",
    questions: [
      { prompt: "1. Efetue 3/x + 5/(2x), com x ≠ 0.", workspace: "medium" },
      { prompt: "2. Efetue 4/x - 1/(3x), com x ≠ 0.", workspace: "medium" },
      { prompt: "3. Efetue 2/x + 1/(x + 1), indicando as restrições.", workspace: "large" },
      { prompt: "4. Efetue 5/(x - 2) - 2/(x - 2), indicando a restrição.", workspace: "medium" },
      { prompt: "5. Multiplique (x/3) · (6/x²), indicando a restrição.", workspace: "medium" },
      { prompt: "6. Divida (2x/5) ÷ (4x²/15), indicando a restrição.", workspace: "large" },
      { prompt: "7. Simplifique [(x² - 9)/(x - 3)] · [1/(x + 3)], indicando todas as restrições.", workspace: "large" },
      { prompt: "8. Resolva 2/x + 1/3 = 1, indicando a condição de existência.", workspace: "large" },
      { prompt: "9. Resolva 3/x = 1/4, indicando a condição de existência.", workspace: "medium" },
      { prompt: "10. Efetue 1/x + 1/2 e escreva o resultado em uma única fração.", workspace: "medium" },
    ],
    checklist: ["Na soma/subtração usei denominador comum.", "Na divisão inverti somente a segunda fração.", "Simplifiquei fatores quando era permitido.", "Conferi as restrições e a solução das equações."],
    answerKey: ["1) 11/(2x)", "2) 11/(3x)", "3) (3x + 2)/[x(x + 1)], x ≠ 0 e x ≠ -1", "4) 3/(x - 2), x ≠ 2", "5) 2/x, x ≠ 0", "6) 3/(2x), x ≠ 0", "7) 1, x ≠ 3 e x ≠ -3", "8) x = 3, x ≠ 0", "9) x = 12, x ≠ 0", "10) (x + 2)/(2x), x ≠ 0"],
  },
  {
    slug: "20-simulado-1",
    date: "2026-09-20",
    dueTime: "18:00",
    title: "Simulado 1 - Recuperação de Matemática",
    subtitle: "Misturar os conteúdos para treinar decisão, organização do cálculo e controle do tempo.",
    minutes: 60,
    objective: "Resolver uma prova mista sem consulta durante a primeira tentativa e marcar as questões em que houve dúvida.",
    accent: "purple",
    remember: [
      "Faça primeiro sem consultar resumo ou gabarito.",
      "Marque com uma estrela as questões em que você teve dúvida, mesmo que tenha chegado a uma resposta.",
      "Mostre os cálculos: o objetivo é enxergar o raciocínio para corrigir amanhã.",
    ],
    questions: [
      { prompt: "1. Calcule 35% de 240.", workspace: "medium" },
      { prompt: "2. Um produto de R$ 640,00 recebe 15% de desconto. Qual é o preço final?", workspace: "medium" },
      { prompt: "3. Depois de um desconto de 25%, um produto custa R$ 270,00. Qual era o preço original?", workspace: "large" },
      { prompt: "4. Qual é o ponto de encontro das medianas de um triângulo?", workspace: "short" },
      { prompt: "5. Como se chama a reta perpendicular a um lado do triângulo que passa pelo ponto médio desse lado? Qual ponto resulta do encontro das três?", workspace: "medium" },
      { prompt: "6. Calcule o comprimento aproximado de uma circunferência de raio 9 cm.", workspace: "medium" },
      { prompt: "7. Uma circunferência tem diâmetro de 16 cm. Determine o comprimento de um arco de 90°.", workspace: "large" },
      { prompt: "8. Indique a restrição de 4/(x - 5).", workspace: "short" },
      { prompt: "9. Simplifique (x² - 25)/(x - 5), indicando a restrição.", workspace: "medium" },
      { prompt: "10. Efetue 2/x + 3/(2x), com x ≠ 0.", workspace: "medium" },
      { prompt: "11. Simplifique (3x/4) · (8/x²), com x ≠ 0.", workspace: "medium" },
      { prompt: "12. Resolva 1/x + 1/2 = 1, indicando a condição de existência.", workspace: "large" },
    ],
    checklist: ["Fiz o simulado sem consultar na primeira tentativa.", "Marquei as questões em que hesitei.", "Não deixei resposta sem unidade quando ela era necessária.", "Separei os erros para trabalhar na atividade de amanhã."],
    answerKey: ["1) 84", "2) R$ 544,00", "3) R$ 360,00", "4) baricentro", "5) mediatriz; circuncentro", "6) 56,52 cm", "7) 12,56 cm", "8) x ≠ 5", "9) x + 5, x ≠ 5", "10) 7/(2x)", "11) 6/x", "12) x = 2, x ≠ 0"],
  },
  {
    slug: "21-caderno-de-erros",
    date: "2026-09-21",
    dueTime: "20:30",
    title: "Caderno de erros - transformar dúvida em acerto",
    subtitle: "A nota do simulado importa menos do que entender por que cada erro aconteceu.",
    minutes: 45,
    objective: "Refazer os erros do Simulado 1 e confirmar os conteúdos que ainda precisam de atenção antes do simulado final.",
    accent: "blue",
    remember: [
      "Escolha primeiro as questões em que errou. Se errou poucas, use as que acertou com dúvida.",
      "Não copie apenas a resposta: escreva o passo que mudou entre a primeira tentativa e a correção.",
    ],
    questions: [
      { prompt: "1. Questão do Simulado 1 que vou refazer: nº _____. Meu erro foi... Depois, refaça a conta completa.", workspace: "large" },
      { prompt: "2. Outra questão que vou refazer: nº _____. Meu erro foi... Depois, refaça a conta completa.", workspace: "large" },
      { prompt: "3. Outra questão que vou refazer: nº _____. Meu erro foi... Depois, refaça a conta completa.", workspace: "large" },
      { prompt: "4. Outra questão que vou refazer: nº _____. Meu erro foi... Depois, refaça a conta completa.", workspace: "large" },
      { prompt: "5. Calcule 12% de 750.", workspace: "medium" },
      { prompt: "6. Em uma frase, diferencie incentro de circuncentro.", workspace: "medium" },
      { prompt: "7. Calcule o comprimento aproximado de uma circunferência de diâmetro 25 cm.", workspace: "medium" },
      { prompt: "8. Simplifique (x² - 36)/(x - 6), indicando a restrição.", workspace: "medium" },
      { prompt: "9. Efetue 1/x + 1/(2x), com x ≠ 0.", workspace: "medium" },
      { prompt: "10. Resolva 4/x = 2, indicando a condição de existência.", workspace: "medium" },
    ],
    checklist: ["Consegui explicar o motivo de pelo menos um erro.", "Refiz sem copiar a resposta pronta.", "Marquei o conteúdo que ainda precisa de revisão.", "Se o mesmo tipo de erro apareceu duas vezes, sinalizei para o professor."],
    answerKey: ["1-4) dependem dos erros do Simulado 1", "5) 90", "6) incentro = encontro das bissetrizes/equidistante dos lados; circuncentro = encontro das mediatrizes/equidistante dos vértices", "7) 78,5 cm", "8) x + 6, x ≠ 6", "9) 3/(2x)", "10) x = 2, x ≠ 0"],
  },
  {
    slug: "22-simulado-final",
    date: "2026-09-22",
    dueTime: "19:30",
    title: "Simulado final + revisão de véspera",
    subtitle: "Último treino completo. Depois dele, apenas correção curta e descanso.",
    minutes: 65,
    objective: "Confirmar prontidão para a recuperação, revisar os últimos erros e encerrar o estudo pesado até 19h30.",
    accent: "navy",
    remember: [
      "Faça o simulado sem consultar. A revisão-resumo fica no final: use somente depois de terminar.",
      "Se travar, marque, siga para a próxima e volte no fim. Treine a mesma estratégia que usará na prova.",
    ],
    questions: [
      { prompt: "1. Calcule 22% de 450.", workspace: "medium" },
      { prompt: "2. Um produto de R$ 560,00 teve aumento de 15%. Qual é o novo preço?", workspace: "medium" },
      { prompt: "3. Depois de um desconto de 20%, um produto custa R$ 240,00. Qual era o preço original?", workspace: "large" },
      { prompt: "4. Em uma atividade, um estudante acertou 45 de 60 itens. Qual foi o percentual de acertos?", workspace: "medium" },
      { prompt: "5. Qual é o ponto de encontro das alturas de um triângulo?", workspace: "short" },
      { prompt: "6. Qual ponto notável é equidistante dos lados do triângulo? Qual construção o determina?", workspace: "medium" },
      { prompt: "7. Calcule o comprimento aproximado de uma circunferência de raio 8 cm.", workspace: "medium" },
      { prompt: "8. Uma reta é tangente a uma circunferência no ponto T. Qual é o ângulo entre a tangente e o raio OT?", workspace: "short" },
      { prompt: "9. Indique todas as restrições da fração 2/(x² - 9).", workspace: "medium" },
      { prompt: "10. Simplifique (x² - 1)/(x - 1), indicando a restrição.", workspace: "medium" },
      { prompt: "11. Efetue 5/x - 1/(2x), com x ≠ 0.", workspace: "medium" },
      { prompt: "12. Resolva 3/x + 1/2 = 2, indicando a condição de existência.", workspace: "large" },
    ],
    finalReview: [
      "PORCENTAGEM: p% = p/100; desconto reduz a base; aumento cresce a base. Em alterações sucessivas, a segunda porcentagem age sobre o novo valor.",
      "PONTOS NOTÁVEIS: medianas→baricentro; bissetrizes→incentro; mediatrizes→circuncentro; alturas→ortocentro.",
      "CIRCUNFERÊNCIA: d = 2r; C = 2πr = πd; arco = (ângulo/360°) × C; raio e tangente formam 90° no ponto de tangência.",
      "FRAÇÕES ALGÉBRICAS: denominador ≠ 0; fatorar antes de simplificar; cancelar fatores, não termos; soma/subtração usa denominador comum; divisão multiplica pelo inverso.",
      "ESTRATÉGIA DE PROVA: comece pelas que reconhece, mostre os cálculos, marque as difíceis, volte depois e reserve minutos finais para conferir sinal, unidade e restrições.",
    ],
    checklist: ["Terminei o estudo pesado até o início da noite.", "Corrigi apenas os pontos necessários, sem começar conteúdo novo.", "Separei material para amanhã.", "Vou dormir com tempo suficiente para chegar descansado à prova."],
    answerKey: ["1) 99", "2) R$ 644,00", "3) R$ 300,00", "4) 75%", "5) ortocentro", "6) incentro; encontro das bissetrizes", "7) 50,24 cm", "8) 90°", "9) x ≠ 3 e x ≠ -3", "10) x + 1, x ≠ 1", "11) 9/(2x)", "12) x = 2, x ≠ 0"],
  },
];

export function getMathRecoveryDay(slug: string) {
  return mathRecoveryPlan.find((item) => item.slug === slug) || null;
}

export function formatRecoveryDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "America/Bahia" }).format(new Date(Date.UTC(year, month - 1, day, 12)));
}
