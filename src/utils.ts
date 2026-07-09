import { Group, VideoCard } from "./types";

// Curated soft color palette options for cards
export interface ColorOption {
  id: string;
  name: string;
  bgClass: string;
  borderClass: string;
  badgeClass: string;
  textClass: string;
}

export const CARD_COLORS: ColorOption[] = [
  {
    id: "slate",
    name: "Grafite Suave",
    bgClass: "bg-slate-50 dark:bg-slate-800/70",
    borderClass: "border-slate-200 dark:border-slate-700",
    badgeClass: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
    textClass: "text-slate-900 dark:text-slate-100"
  },
  {
    id: "blue",
    name: "Azul Oceano",
    bgClass: "bg-blue-50/50 dark:bg-blue-900/40",
    borderClass: "border-blue-200 dark:border-blue-800/50",
    badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200",
    textClass: "text-blue-950 dark:text-blue-100"
  },
  {
    id: "emerald",
    name: "Verde Esmeralda",
    bgClass: "bg-emerald-50/50 dark:bg-emerald-900/40",
    borderClass: "border-emerald-200 dark:border-emerald-800/50",
    badgeClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
    textClass: "text-emerald-950 dark:text-emerald-100"
  },
  {
    id: "amber",
    name: "Ambar Dourado",
    bgClass: "bg-amber-50/50 dark:bg-amber-900/40",
    borderClass: "border-amber-200 dark:border-amber-800/50",
    badgeClass: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200",
    textClass: "text-amber-950 dark:text-amber-100"
  },
  {
    id: "rose",
    name: "Rosa Suave",
    bgClass: "bg-rose-50/50 dark:bg-rose-900/40",
    borderClass: "border-rose-200 dark:border-rose-800/50",
    badgeClass: "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200",
    textClass: "text-rose-950 dark:text-rose-100"
  },
  {
    id: "purple",
    name: "Roxo Lavanda",
    bgClass: "bg-purple-50/50 dark:bg-purple-900/40",
    borderClass: "border-purple-200 dark:border-purple-800/50",
    badgeClass: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200",
    textClass: "text-purple-950 dark:text-purple-100"
  }
];

export const DEFAULT_GROUPS: Group[] = [
  {
    id: "g_fast_access",
    name: "⚡ Fast & Easy Access",
    description: "Acesso rápido e fácil aos principais destaques e recursos.",
    order: 0,
    createdAt: 1783516858000
  },
  {
    id: "g_historico",
    name: "Histórico",
    description: "Sessões e tutoriais importantes assistidos recentemente.",
    order: 1,
    createdAt: 1780659598000
  },
  {
    id: "g_yt_diversos",
    name: "📺 YouTube Diversos",
    description: "Conteúdos variados e dicas úteis do cotidiano.",
    order: 2,
    createdAt: 1781791648000
  },
  {
    id: "g_yt_ia",
    name: "YouTube & Sites IA",
    description: "Canais e vídeos focados em inteligência artificial e ferramentas inteligentes.",
    order: 3,
    createdAt: 1781295678000
  },
  {
    id: "g_veja_depois",
    name: "Veja Isso Depois...",
    description: "Curadoria de vídeos para assistir mais tarde com calma.",
    order: 4,
    createdAt: 1782563699000
  },
  {
    id: "g_yt_business",
    name: "YouTube Business",
    description: "Estratégias de negócios, marketing, empreendedorismo e cases de sucesso.",
    order: 5,
    createdAt: 1780565552000
  },
  {
    id: "g_openclaw",
    name: "OpenClaw - JP030626",
    description: "Estudos e implementações práticas do ecossistema OpenClaw.",
    order: 6,
    createdAt: 1780478821000
  },
  {
    id: "g_politica",
    name: "YouTube Política",
    description: "Análises, debates e discussões sobre o cenário político atual.",
    order: 7,
    createdAt: 1781634174000
  },
  {
    id: "g_religiao",
    name: "YouTube Religião",
    description: "Teologia, história e explicações visuais de textos sagrados.",
    order: 8,
    createdAt: 1780827203000
  },
  {
    id: "g_audiovisual",
    name: "YouTube Audio Visual",
    description: "Recursos, tutoriais de edição, OBS Studio e design de movimento.",
    order: 9,
    createdAt: 1782553546000
  },
  {
    id: "g_produtos",
    name: "YouTube Produtos",
    description: "Reviews, unboxing e dicas sobre hardware e eletrônicos.",
    order: 10,
    createdAt: 1780749056000
  },
  {
    id: "g_hermes",
    name: "Hermes Agent - JP 10 06 2026",
    description: "Tutoriais e estudos sobre agentes inteligentes do ecossistema Hermes.",
    order: 11,
    createdAt: 1781104718000
  },
  {
    id: "g_antigravity",
    name: "Antigravity - JP150626",
    description: "Desenvolvimento e exploração de skills no ecossistema Antigravity.",
    order: 12,
    createdAt: 1781531278000
  }
];

export const DEFAULT_CARDS: VideoCard[] = [
  // ⚡ Fast & Easy Access
  {
    id: "card_fast_1",
    url: "https://www.youtube.com/watch?v=aDR6I9Az0Yc",
    videoId: "aDR6I9Az0Yc",
    title: "Claude Fable 5 Built This Cinematic Motion Website with Higgsfield MCP",
    channelName: "Code And Create",
    description: "Demonstração e desenvolvimento de um site com movimento cinematográfico usando o Claude Fable 5 e Higgsfield MCP.",
    thumbnailUrl: "https://img.youtube.com/vi/aDR6I9Az0Yc/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_fast_access",
    createdAt: Date.now() - 46000
  },
  // Histórico
  {
    id: "card_hist_1",
    url: "https://www.youtube.com/watch?v=rv6p9R_lNxc",
    videoId: "rv6p9R_lNxc",
    title: "Samin Yasar - OpenClaw",
    channelName: "Samin Yasar",
    description: "Explicação e demonstração prática do OpenClaw, uma alternativa de código aberto aos Claude Artifacts.",
    thumbnailUrl: "https://img.youtube.com/vi/rv6p9R_lNxc/hqdefault.jpg",
    isLiked: false,
    rating: 3,
    color: "rose",
    notes: "",
    groupId: "g_historico",
    createdAt: Date.now() - 45000
  },
  {
    id: "card_hist_2",
    url: "https://www.youtube.com/watch?v=Sce2EC81ngk&t=2618s",
    videoId: "Sce2EC81ngk",
    title: "PodCast OpenClaw: Desafios e Práticas",
    channelName: "PodCast OpenClaw",
    description: "Bate-papo detalhado sobre o desenvolvimento e os bastidores do projeto OpenClaw.",
    thumbnailUrl: "https://img.youtube.com/vi/Sce2EC81ngk/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_historico",
    createdAt: Date.now() - 44000
  },
  {
    id: "card_hist_3",
    url: "https://www.youtube.com/watch?v=juEfJERgBE8",
    videoId: "juEfJERgBE8",
    title: "Profit Studio: Escalando Operações Digitais",
    channelName: "Profit Studio",
    description: "Estratégias de escalabilidade e otimização para estúdios digitais com foco em performance.",
    thumbnailUrl: "https://img.youtube.com/vi/juEfJERgBE8/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_historico",
    createdAt: Date.now() - 43000
  },
  {
    id: "card_hist_4",
    url: "https://www.youtube.com/watch?v=WVcB38Ee2pc",
    videoId: "WVcB38Ee2pc",
    title: "Helio Arreche: Automação e Produtividade",
    channelName: "Helio Arreche",
    description: "Dicas essenciais e fluxos práticos de automação para desenvolvedores e criadores de conteúdo.",
    thumbnailUrl: "https://img.youtube.com/vi/WVcB38Ee2pc/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_historico",
    createdAt: Date.now() - 42000
  },
  {
    id: "card_hist_5",
    url: "https://www.youtube.com/watch?v=1NgO4Tzv27I",
    videoId: "1NgO4Tzv27I",
    title: "Profit Studio - Análise de Métricas de Vendas",
    channelName: "Profit Studio",
    description: "Como analisar e interpretar métricas importantes do seu negócio para impulsionar suas vendas.",
    thumbnailUrl: "https://img.youtube.com/vi/1NgO4Tzv27I/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_historico",
    createdAt: Date.now() - 41000
  },
  // 📺 YouTube Diversos
  {
    id: "card_div_1",
    url: "https://www.youtube.com/watch?v=Zi2wFfoxUf8",
    videoId: "Zi2wFfoxUf8",
    title: "Como Cortar o Seu Próprio Cabelo em Casa",
    channelName: "Como Cortar o Seu Próprio Cabelo",
    description: "Tutorial passo a passo simples e prático de como cortar o próprio cabelo em casa com segurança.",
    thumbnailUrl: "https://img.youtube.com/vi/Zi2wFfoxUf8/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_yt_diversos",
    createdAt: Date.now() - 40000
  },
  // YouTube & Sites IA
  {
    id: "card_ia_1",
    url: "https://www.youtube.com/watch?v=30iQsttzBps",
    videoId: "30iQsttzBps",
    title: "zazencodes - Firebase Developer Tutorial",
    channelName: "zazencodes - Firebase Developer",
    description: "Guia completo de desenvolvimento utilizando o ecossistema Firebase para aplicações modernas.",
    thumbnailUrl: "https://img.youtube.com/vi/30iQsttzBps/hqdefault.jpg",
    isLiked: false,
    rating: 3,
    color: "slate",
    notes: "",
    groupId: "g_yt_ia",
    createdAt: Date.now() - 39000
  },
  // Veja Isso Depois... (28 videos)
  {
    id: "card_veja_1",
    url: "https://www.youtube.com/watch?v=38xGouIIf7Y",
    videoId: "38xGouIIf7Y",
    title: "Aplicativos do Flow - Canais Dark",
    channelName: "Aplicativos do Flow - Canais Dark",
    description: "Estratégias práticas de criação de canais dark lucrativos no YouTube utilizando as novas ferramentas de automação.",
    thumbnailUrl: "https://img.youtube.com/vi/38xGouIIf7Y/hqdefault.jpg",
    isLiked: true,
    rating: 5,
    color: "blue",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 38000
  },
  {
    id: "card_veja_2",
    url: "https://www.youtube.com/watch?v=rJdYoZnLa_s",
    videoId: "rJdYoZnLa_s",
    title: "35 Nano Banana Character Art Styles You Can Create in Google Flow",
    channelName: "35 Nano Banana Character Art Styles You Can Create in Google Flow",
    description: "Inspiração e guia passo a passo cobrindo 35 estilos de arte incríveis criados no Google Flow.",
    thumbnailUrl: "https://img.youtube.com/vi/rJdYoZnLa_s/hqdefault.jpg",
    isLiked: true,
    rating: 5,
    color: "rose",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 37000
  },
  {
    id: "card_veja_3",
    url: "https://www.youtube.com/watch?v=o0zuWcOq1lk",
    videoId: "o0zuWcOq1lk",
    title: "Como sair RAPIDAMENTE de um buraco financeiro",
    channelName: "Como sair RAPIDAMENTE de um buraco financeiro",
    description: "Passos certeiros e práticos para reorganizar suas contas, cortar gastos e sair de dívidas rapidamente.",
    thumbnailUrl: "https://img.youtube.com/vi/o0zuWcOq1lk/hqdefault.jpg",
    isLiked: true,
    rating: 5,
    color: "slate",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 36000
  },
  {
    id: "card_veja_4",
    url: "https://www.youtube.com/watch?v=FDPCb-uhRik",
    videoId: "FDPCb-uhRik",
    title: "YT Channel with AI",
    channelName: "YT Channel with AI",
    description: "Aprenda a estruturar, criar e gerenciar um canal do YouTube completo utilizando agentes autônomos de IA.",
    thumbnailUrl: "https://img.youtube.com/vi/FDPCb-uhRik/hqdefault.jpg",
    isLiked: true,
    rating: 4,
    color: "blue",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 35000
  },
  {
    id: "card_veja_5",
    url: "https://www.youtube.com/watch?v=Rz1Y7fhXGFI",
    videoId: "Rz1Y7fhXGFI",
    title: "Ela Já Faturou +100MM Com Suas Copys (Aos 17 Anos!) | Amanda Khayat",
    channelName: "Ela Já Faturou +100MM Com Suas Copys (Aos 17 Anos!) | Amanda Khayat",
    description: "Entrevista reveladora com Amanda Khayat sobre técnicas milionárias de copywriting para vendas na web.",
    thumbnailUrl: "https://img.youtube.com/vi/Rz1Y7fhXGFI/hqdefault.jpg",
    isLiked: true,
    rating: 4,
    color: "rose",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 34000
  },
  {
    id: "card_veja_6",
    url: "https://www.youtube.com/watch?v=4ftONmdO9yo",
    videoId: "4ftONmdO9yo",
    title: "Hermes Agent",
    channelName: "Hermes Agent",
    description: "Demonstração conceitual e tutorial de uso do Hermes Agent para automação residencial e de escritório.",
    thumbnailUrl: "https://img.youtube.com/vi/4ftONmdO9yo/hqdefault.jpg",
    isLiked: true,
    rating: 0,
    color: "emerald",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 33000
  },
  {
    id: "card_veja_7",
    url: "https://www.youtube.com/watch?v=eySdVDP3PKA",
    videoId: "eySdVDP3PKA",
    title: "Mulher vivendo em BC",
    channelName: "Mulher vivendo em BC",
    description: "Vlog de rotina e análise detalhada do custo de vida em uma das cidades mais valorizadas do Brasil.",
    thumbnailUrl: "https://img.youtube.com/vi/eySdVDP3PKA/hqdefault.jpg",
    isLiked: true,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 32000
  },
  {
    id: "card_veja_8",
    url: "https://www.youtube.com/watch?v=__vSrFlvHuY",
    videoId: "__vSrFlvHuY",
    title: "Antigravity e opencode",
    channelName: "Antigravity e opencode",
    description: "Como integrar as novas features do Antigravity ao seu fluxo de desenvolvimento local usando OpenCode.",
    thumbnailUrl: "https://img.youtube.com/vi/__vSrFlvHuY/hqdefault.jpg",
    isLiked: true,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 31000
  },
  {
    id: "card_veja_9",
    url: "https://www.youtube.com/watch?v=5YiaUoyIAIs",
    videoId: "5YiaUoyIAIs",
    title: "CNC - Muito Interessante!",
    channelName: "CNC - Muito Interessante!",
    description: "Análise técnica de projetos de engenharia baseados em fresadoras e roteadores CNC de alta precisão.",
    thumbnailUrl: "https://img.youtube.com/vi/5YiaUoyIAIs/hqdefault.jpg",
    isLiked: false,
    rating: 1,
    color: "rose",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 30000
  },
  {
    id: "card_veja_10",
    url: "https://www.youtube.com/watch?v=tiYlGF5nx14",
    videoId: "tiYlGF5nx14",
    title: "Fornecedor de Produtos para Mercado Livre",
    channelName: "Fornecedor de Produtos para Mercado Livre",
    description: "Como encontrar e fechar parcerias seguras com fornecedores de produtos em alta no Mercado Livre.",
    thumbnailUrl: "https://img.youtube.com/vi/tiYlGF5nx14/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 29000
  },
  {
    id: "card_veja_11",
    url: "https://www.youtube.com/watch?v=IqZDJ49Vcac",
    videoId: "IqZDJ49Vcac",
    title: "Supabase + Google AI Studio: Full-stack app in 20 minutes",
    channelName: "Supabase + Google AI Studio: Full-stack app in 20 minutes",
    description: "Um tutorial passo a passo para integrar a autenticação e banco de dados do Supabase com o poder da API do Gemini.",
    thumbnailUrl: "https://img.youtube.com/vi/IqZDJ49Vcac/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 28000
  },
  {
    id: "card_veja_12",
    url: "https://www.youtube.com/watch?v=KW7tB_fnvYI",
    videoId: "KW7tB_fnvYI",
    title: "Os Negócios do Futuro que Já Estão Bombando nos EUA",
    channelName: "Os Negócios do Futuro que Já Estão Bombando nos EUA",
    description: "Tendências de mercado e ideias inovadoras de negócios em alta nos EUA para aplicar no Brasil.",
    thumbnailUrl: "https://img.youtube.com/vi/KW7tB_fnvYI/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 27000
  },
  {
    id: "card_veja_13",
    url: "https://www.youtube.com/watch?v=L35qhRpaed4&t=195s",
    videoId: "L35qhRpaed4",
    title: "YT - Lari Mendes",
    channelName: "YT - Lari Mendes",
    description: "Dicas de criação de conteúdo, organização diária e crescimento orgânico no YouTube.",
    thumbnailUrl: "https://img.youtube.com/vi/L35qhRpaed4/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 26000
  },
  {
    id: "card_veja_14",
    url: "https://www.youtube.com/watch?v=Eeny2c2JJNI",
    videoId: "Eeny2c2JJNI",
    title: "Tênis Bons e Baratos",
    channelName: "Tênis Bons e Baratos",
    description: "Uma seleção rigorosa de modelos de tênis com excelente custo-benefício para práticas esportivas.",
    thumbnailUrl: "https://img.youtube.com/vi/Eeny2c2JJNI/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 25000
  },
  {
    id: "card_veja_15",
    url: "https://www.youtube.com/watch?v=X287NO_jbLE",
    videoId: "X287NO_jbLE",
    title: "Maior Segredo da Humanidade",
    channelName: "Maior Segredo da Humanidade",
    description: "Uma viagem fascinante pelos maiores mistérios e segredos guardados ao longo dos séculos.",
    thumbnailUrl: "https://img.youtube.com/vi/X287NO_jbLE/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 24000
  },
  {
    id: "card_veja_16",
    url: "https://www.youtube.com/watch?v=WvWjxOS5T3g",
    videoId: "WvWjxOS5T3g",
    title: "Essa Skill é a melhor forma de criar frontend com IA",
    channelName: "Essa Skill é a melhor forma de criar frontend com IA",
    description: "Descubra como acelerar o desenvolvimento de interfaces modernas utilizando os agentes de IA mais eficientes.",
    thumbnailUrl: "https://img.youtube.com/vi/WvWjxOS5T3g/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 23000
  },
  {
    id: "card_veja_17",
    url: "https://www.youtube.com/watch?v=0z8Pp4TaAl8",
    videoId: "0z8Pp4TaAl8",
    title: "ComfyUI tutorial iniciante",
    channelName: "ComfyUI tutorial iniciante",
    description: "Guia definitivo e prático para iniciantes aprenderem a configurar e usar os nós do ComfyUI.",
    thumbnailUrl: "https://img.youtube.com/vi/0z8Pp4TaAl8/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 22000
  },
  {
    id: "card_veja_18",
    url: "https://www.youtube.com/watch?v=fChLnJie_J8",
    videoId: "fChLnJie_J8",
    title: "Limpeza de Casa",
    channelName: "Limpeza de Casa",
    description: "Dicas valiosas e truques rápidos para manter a casa limpa e cheirosa com menos esforço.",
    thumbnailUrl: "https://img.youtube.com/vi/fChLnJie_J8/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 21000
  },
  {
    id: "card_veja_19",
    url: "https://www.youtube.com/watch?v=ve0kDumyHEo",
    videoId: "ve0kDumyHEo",
    title: "Claude Design",
    channelName: "Claude Design",
    description: "Como usar os novos artefatos e sistemas do Claude para planejar, gerar e refinar componentes de UI incríveis.",
    thumbnailUrl: "https://img.youtube.com/vi/ve0kDumyHEo/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 20000
  },
  {
    id: "card_veja_20",
    url: "https://www.youtube.com/watch?v=pmK9sQUI5aY",
    videoId: "pmK9sQUI5aY",
    title: "Limpeza de Fogão",
    channelName: "Limpeza de Fogão",
    description: "Passo a passo simples de como limpar e remover as gorduras difíceis das bocas e do tampo do fogão.",
    thumbnailUrl: "https://img.youtube.com/vi/pmK9sQUI5aY/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 19000
  },
  {
    id: "card_veja_21",
    url: "https://www.youtube.com/shorts/XMi3H8OTnyY",
    videoId: "XMi3H8OTnyY",
    title: "Milena Sangii - Roça",
    channelName: "Milena Sangii - Roça",
    description: "Short mostrando o dia a dia e os encantos da vida simples e tranquila vivida no campo.",
    thumbnailUrl: "https://img.youtube.com/vi/XMi3H8OTnyY/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 18000
  },
  {
    id: "card_veja_22",
    url: "https://www.youtube.com/shorts/mgh_jA3NACw",
    videoId: "mgh_jA3NACw",
    title: "Limpeza de Toalhas",
    channelName: "Limpeza de Toalhas",
    description: "Como desencardir e amaciar toalhas de banho ásperas usando produtos simples do dia a dia.",
    thumbnailUrl: "https://img.youtube.com/vi/mgh_jA3NACw/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 17000
  },
  {
    id: "card_veja_23",
    url: "https://www.youtube.com/watch?v=YjPAVZAffh0",
    videoId: "YjPAVZAffh0",
    title: "Limpeza da encanação",
    channelName: "Limpeza da encanação",
    description: "Resolva problemas simples de entupimentos na tubulação usando métodos fáceis e seguros.",
    thumbnailUrl: "https://img.youtube.com/vi/YjPAVZAffh0/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 16000
  },
  {
    id: "card_veja_24",
    url: "https://www.youtube.com/watch?v=oUXNaMUMH4o",
    videoId: "oUXNaMUMH4o",
    title: "Conserto de Geladeira - Ferrugens",
    channelName: "Conserto de Geladeira - Ferrugens",
    description: "Passo a passo de como restaurar a chapa e a pintura de refrigeradores com pontos de corrosão.",
    thumbnailUrl: "https://img.youtube.com/vi/oUXNaMUMH4o/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 15000
  },
  {
    id: "card_veja_25",
    url: "https://www.youtube.com/shorts/salox-W-FD8",
    videoId: "salox-W-FD8",
    title: "Limpeza de Cadeira",
    channelName: "Limpeza de Cadeira",
    description: "Short prático com uma receita caseira fantástica para limpar e higienizar estofados e cadeiras.",
    thumbnailUrl: "https://img.youtube.com/vi/salox-W-FD8/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 14000
  },
  {
    id: "card_veja_26",
    url: "https://www.youtube.com/watch?v=ygisrwi5GCI",
    videoId: "ygisrwi5GCI",
    title: "FAÇA 30 REELS VIRAIS com a NOVA IA do GOOGLE em Minutos (Grátis",
    channelName: "FAÇA 30 REELS VIRAIS com a NOVA IA do GOOGLE em Minutos (Grátis",
    description: "Aprenda a escalar sua produção de shorts e reels usando o novo assistente inteligente do Google.",
    thumbnailUrl: "https://img.youtube.com/vi/ygisrwi5GCI/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "rose",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 13000
  },
  {
    id: "card_veja_27",
    url: "https://www.youtube.com/watch?v=aDR6I9Az0Yc",
    videoId: "aDR6I9Az0Yc",
    title: "Claude Fable 5 Built This Cinematic Motion Website with Higgsfield MCP (Veja Depois)",
    channelName: "Code And Create",
    description: "Demonstração e desenvolvimento de um site com movimento cinematográfico usando o Claude Fable 5 e Higgsfield MCP (cópia).",
    thumbnailUrl: "https://img.youtube.com/vi/aDR6I9Az0Yc/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_veja_depois",
    createdAt: Date.now() - 12000
  },
  // YouTube Business
  {
    id: "card_biz_1",
    url: "https://www.youtube.com/watch?v=5-4YTLCiMzk",
    videoId: "5-4YTLCiMzk",
    title: "Jonny Vicary: Marketing e Criação de Audiência",
    channelName: "Jonny Vicary",
    description: "Entrevista e análises sobre como construir uma marca forte e engajar sua audiência de forma consistente.",
    thumbnailUrl: "https://img.youtube.com/vi/5-4YTLCiMzk/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_yt_business",
    createdAt: Date.now() - 11000
  },
  {
    id: "card_biz_2",
    url: "https://www.youtube.com/watch?v=QpURa_fckYE",
    videoId: "QpURa_fckYE",
    title: "Marcos Paulo - Estratégias Milionárias de Lançamento",
    channelName: "Marcos Paulo ++",
    description: "Entenda os bastidores e os pilares essenciais para estruturar grandes lançamentos digitais de sucesso.",
    thumbnailUrl: "https://img.youtube.com/vi/QpURa_fckYE/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_yt_business",
    createdAt: Date.now() - 10000
  },
  // OpenClaw - JP030626
  {
    id: "card_openclaw_1",
    url: "https://www.youtube.com/watch?v=HNAv85MfGUI",
    videoId: "HNAv85MfGUI",
    title: "YouTube Tutorial - OpenClaw Setup",
    channelName: "YouTube Tutorial",
    description: "Vídeo completo mostrando como baixar, configurar as chaves de API e rodar a interface autônoma de forma simplificada.",
    thumbnailUrl: "https://img.youtube.com/vi/HNAv85MfGUI/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_openclaw",
    createdAt: Date.now() - 9000
  },
  // YouTube Política
  {
    id: "card_pol_1",
    url: "https://www.youtube.com/watch?v=qYvVXFEMtns",
    videoId: "qYvVXFEMtns",
    title: "MBLiveTV - Lives do MBL [360 mil inscritos]",
    channelName: "MBLiveTV - Lives do MBL [360 mil inscritos]",
    description: "Transmissão ao vivo contendo discussões profundas sobre as principais notícias e movimentações políticas no Brasil.",
    thumbnailUrl: "https://img.youtube.com/vi/qYvVXFEMtns/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_politica",
    createdAt: Date.now() - 8000
  },
  // YouTube Religião
  {
    id: "card_rel_1",
    url: "https://www.youtube.com/watch?v=othkYCAsskc",
    videoId: "othkYCAsskc",
    title: "Bible Project Português ||",
    channelName: "Bible Project Português ||",
    description: "Uma animação inteligente que explica a unidade narrativa e a rica história contida nos textos antigos.",
    thumbnailUrl: "https://img.youtube.com/vi/othkYCAsskc/hqdefault.jpg",
    isLiked: true,
    rating: 4,
    color: "emerald",
    notes: "",
    groupId: "g_religiao",
    createdAt: Date.now() - 7000
  },
  // YouTube Audio Visual
  {
    id: "card_av_1",
    url: "https://www.youtube.com/watch?v=s6CwBmQEuD0&t=394s",
    videoId: "s6CwBmQEuD0",
    title: "OBS Studio - Transmissão Profissional",
    channelName: "OBS Studio",
    description: "Aprenda a configurar cenas, fontes, áudio e transmissão de alta performance para YouTube e Twitch.",
    thumbnailUrl: "https://img.youtube.com/vi/s6CwBmQEuD0/hqdefault.jpg",
    isLiked: false,
    rating: 4,
    color: "emerald",
    notes: "",
    groupId: "g_audiovisual",
    createdAt: Date.now() - 6000
  },
  {
    id: "card_av_2",
    url: "https://www.youtube.com/watch?v=edUOvt6Y5ts",
    videoId: "edUOvt6Y5ts",
    title: "Graphic Motion",
    channelName: "Graphic Motion",
    description: "Conceitos básicos de animação vetorial e fluxos de trabalho eficientes para editores de vídeo.",
    thumbnailUrl: "https://img.youtube.com/vi/edUOvt6Y5ts/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_audiovisual",
    createdAt: Date.now() - 5000
  },
  // YouTube Produtos
  {
    id: "card_prod_1",
    url: "https://www.youtube.com/watch?v=AAbWGhl9MgQ",
    videoId: "AAbWGhl9MgQ",
    title: "Head Fones",
    channelName: "Head Fones",
    description: "Review detalhado cobrindo a assinatura sonora, conforto e o isolamento dos fones mais comentados da atualidade.",
    thumbnailUrl: "https://img.youtube.com/vi/AAbWGhl9MgQ/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_produtos",
    createdAt: Date.now() - 4000
  },
  // Hermes Agent - JP 10 06 2026
  {
    id: "card_hermes_1",
    url: "https://www.youtube.com/watch?v=n8CYukmm3xw",
    videoId: "n8CYukmm3xw",
    title: "Hermes Tutorial",
    channelName: "Hermes Tutorial",
    description: "Aprenda como configurar as variáveis, definir os gatilhos e orquestrar fluxos autônomos com o Hermes.",
    thumbnailUrl: "https://img.youtube.com/vi/n8CYukmm3xw/hqdefault.jpg",
    isLiked: true,
    rating: 4,
    color: "slate",
    notes: "",
    groupId: "g_hermes",
    createdAt: Date.now() - 3000
  },
  // Antigravity - JP150626
  {
    id: "card_anti_1",
    url: "https://www.youtube.com/watch?v=__vSrFlvHuY",
    videoId: "__vSrFlvHuY",
    title: "Instalando OpenCode e OpenRouter",
    channelName: "Instalando OpenCode e OpenRouter",
    description: "Guia completo demonstrando a integração local de modelos via OpenRouter e programação assistida por IA.",
    thumbnailUrl: "https://img.youtube.com/vi/__vSrFlvHuY/hqdefault.jpg",
    isLiked: false,
    rating: 0,
    color: "slate",
    notes: "",
    groupId: "g_antigravity",
    createdAt: Date.now() - 2000
  }
];

export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export function loadState(): { groups: Group[]; cards: VideoCard[] } {
  try {
    const isInitializedV3 = localStorage.getItem("yt_curator_initialized_v3");
    if (!isInitializedV3) {
      // Wipes out old default data so that the new curate list is forced to load
      localStorage.removeItem("yt_curator_groups");
      localStorage.removeItem("yt_curator_cards");
      localStorage.setItem("yt_curator_initialized_v3", "true");
    }

    const savedGroups = localStorage.getItem("yt_curator_groups");
    const savedCards = localStorage.getItem("yt_curator_cards");
    
    return {
      groups: savedGroups ? JSON.parse(savedGroups) : DEFAULT_GROUPS,
      cards: savedCards ? JSON.parse(savedCards) : DEFAULT_CARDS
    };
  } catch (error) {
    console.error("Erro ao carregar dados do localStorage:", error);
    return { groups: DEFAULT_GROUPS, cards: DEFAULT_CARDS };
  }
}

export function saveState(groups: Group[], cards: VideoCard[]) {
  try {
    localStorage.setItem("yt_curator_groups", JSON.stringify(groups));
    localStorage.setItem("yt_curator_cards", JSON.stringify(cards));
  } catch (error) {
    console.error("Erro ao salvar dados no localStorage:", error);
  }
}
