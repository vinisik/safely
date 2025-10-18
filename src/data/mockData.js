// Imagens para os cards de vídeo
import thumbEpis from '../assets/thumbnails/epis.jpg';
import thumbErgonomia from '../assets/thumbnails/ergonomia.png';
import thumbAltura from '../assets/thumbnails/trabalho-altura.jpg';
import rewardCaderno from '../assets/rewards/caderno.png';
import rewardCaneca from '../assets/rewards/caneca.png';
import rewardGarrafa from '../assets/rewards/garrafa.png';
import rewardCafe from '../assets/rewards/cafe.png';

export const videos = [
  {
    id: 1,
    title: 'Uso Correto de EPIs',
    thumbnail: thumbEpis,
    description: 'Aprenda a importância e a maneira correta de utilizar os Equipamentos de Proteção Individual para garantir sua segurança no ambiente de trabalho.',
    videoUrl: '/videos/epi-video.mp4',
    relatedQuizId: 101,
  },
  {
    id: 2,
    title: 'Princípios de Ergonomia',
    thumbnail: thumbErgonomia,
    description: 'Este vídeo aborda os princípios fundamentais da ergonomia para prevenir lesões e melhorar o bem-estar no trabalho.',
    videoUrl: '/videos/ergonomia.mp4',
    relatedQuizId: 102,
  },
  {
    id: 3,
    title: 'Segurança em Trabalho em Altura',
    thumbnail: thumbAltura,
    description: 'Conheça os procedimentos e equipamentos essenciais para realizar trabalhos em altura com máxima segurança.',
    videoUrl: '/videos/nr35.mp4',
  },
];

export const quizzes = [
  {
    id: 101,
    title: 'Teste de Conhecimento: EPIs',
    relatedVideoId: 1,
    questions: [
      {
        text: 'O que significa a sigla EPI?',
        options: [
          { text: 'Equipamento de Proteção Individual', correct: true },
          { text: 'Equipamento para Incêndio', correct: false },
          { text: 'Equipe de Pronta Intervenção', correct: false },
        ],
      },
      {
        text: 'Qual EPI é utilizado para proteção da cabeça?',
        options: [
          { text: 'Luvas', correct: false },
          { text: 'Capacete', correct: true },
          { text: 'Botas', correct: false },
        ],
      },
    ],
  },
  {
    id: 102,
    title: 'Teste de Conhecimento: Ergonomia',
    relatedVideoId: 2,
    questions: [
      {
        text: 'Qual o objetivo principal da ergonomia?',
        options: [
          { text: 'Aumentar a velocidade da produção', correct: false },
          { text: 'Adaptar o trabalho ao homem', correct: true },
          { text: 'Reduzir o número de funcionários', correct: false },
        ],
      },
    ],
  },
  {
    id: 103,
    title: 'Teste de Conhecimento: Primeiros Socorros',
    relatedVideoId: 4, 
    questions: [
      {
        text: 'Em caso de queimadura, o que se deve fazer primeiro?',
        options: [
          { text: 'Passar pasta de dente', correct: false },
          { text: 'Resfriar a área com água corrente', correct: true },
          { text: 'Estourar as bolhas', correct: false },
        ],
      },
    ],
  }
];

export const checklists = [
  { 
    id: 201, 
    title: 'Verificação Pré-Uso - Prensa Hidráulica PH-02', 
    status: 'pending',
    items: [
      { id: 1, text: 'Botão de parada de emergência está desobstruído e funcional?' },
      { id: 2, text: 'Guardas de proteção (frontal e lateral) estão no lugar e sem avarias?' },
      { id: 3, text: 'Não há vazamento de óleo visível no cilindro principal ou nas mangueiras?' },
      { id: 4, text: 'A área ao redor da máquina está limpa e desobstruída?' },
      { id: 5, text: 'Os sensores de segurança (cortina de luz) estão limpos e operantes?' },
    ]
  },
  { 
    id: 202, 
    title: 'Checklist: Trabalho em Altura', 
    status: 'pending',
    items: [
        { id: 1, text: 'Cinto de segurança e talabarte foram inspecionados?' },
        { id: 2, text: 'O ponto de ancoragem é seguro e foi verificado?' },
    ]
  },
  { 
    id: 203, 
    title: 'Inspeção de Ferramentas Elétricas', 
    status: 'completed',
    items: []
  },
];

// Dados para a Loja de Recompensas
export const rewards = [
  {
    id: 301,
    title: 'Caderno Safely',
    cost: 500,
    image: rewardCaderno,
    stock: 15,
  },
  {
    id: 302,
    title: 'Caneca Safely',
    cost: 750,
    image: rewardCaneca,
    stock: 10,
  },
  {
    id: 303,
    title: 'Garrafa Térmica',
    cost: 1200,
    image: rewardGarrafa,
    stock: 5,
  },
  {
    id: 304,
    title: 'Voucher: Café Grátis (1 semana)',
    cost: 1500,
    image: rewardCafe,
    stock: 20,
  },
];