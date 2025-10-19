// Imagens para os cards de vídeo
import thumbEpis from '../assets/thumbnails/epis.jpg';
import thumbErgonomia from '../assets/thumbnails/ergonomia.png';
import thumbAltura from '../assets/thumbnails/trabalho-altura.jpg';
import rewardCaderno from '../assets/rewards/caderno.png';
import rewardCaneca from '../assets/rewards/caneca.png';
import rewardGarrafa from '../assets/rewards/garrafa.png';
import rewardCafe from '../assets/rewards/cafe.png';
import rewardCertificado from '../assets/rewards/certificado.jpg';
import quizEpi from '../assets/thumbnails/quiz-epi.png';
import quizErgonomia from '../assets/thumbnails/quiz-ergonomia.png';
import quizPs from '../assets/thumbnails/quiz-ps.png';
import quizElet from '../assets/thumbnails/quiz-elet.png';
import quizNr from '../assets/thumbnails/quiz-nr.png';
import quizIncendio from '../assets/thumbnails/quiz-incendio.png';


export const videos = [
  {
    id: 1,
    title: 'Uso Correto de EPIs',
    thumbnail: thumbEpis,
    description: 'Aprenda a importância e a maneira correta de utilizar os Equipamentos de Proteção Individual para garantir sua segurança no ambiente de trabalho.',
    videoUrl: '/videos/epi-video.mp4',
    relatedQuizId: 101,
    dueDate: '25/10/2025',
  },
  {
    id: 2,
    title: 'Princípios de Ergonomia',
    thumbnail: thumbErgonomia,
    description: 'Este vídeo aborda os princípios fundamentais da ergonomia para prevenir lesões e melhorar o bem-estar no trabalho.',
    videoUrl: '/videos/ergonomia.mp4',
    relatedQuizId: 102,
    dueDate: '31/10/2025',
  },
  {
    id: 3,
    title: 'Segurança em Trabalho em Altura',
    thumbnail: thumbAltura,
    description: 'Conheça os procedimentos e equipamentos essenciais para realizar trabalhos em altura com máxima segurança.',
    videoUrl: '/videos/nr35.mp4',
    dueDate: '05/11/2025',
  },
];

export const quizzes = [
  {
    id: 101,
    title: 'Teste de Conhecimento: EPIs',
    thumbnail: quizEpi,
    relatedVideoId: 1,
    dueDate: '28/10/2025',
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
    thumbnail: quizErgonomia,
    dueDate: '07/11/2025',
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
    thumbnail: quizPs,
    dueDate: '15/11/2025',
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
  },
  {
    id: 104,
    title: 'Quiz NR-10: Segurança em Eletricidade',
    relatedVideoId: 5,
    thumbnail: quizElet,
    dueDate: '19/10/2025',
    questions: [
      {
        text: 'Qual é a primeira medida de controle a ser adotada em trabalhos com eletricidade?',
        options: [
          { text: 'Usar luvas de alta tensão', correct: false },
          { text: 'Desenergização do circuito', correct: true },
          { text: 'Sinalizar a área de trabalho', correct: false },
        ],
      },
      {
        text: 'Qual a sigla para o procedimento que impede o religamento acidental de um circuito?',
        options: [
          { text: 'APR (Análise Preliminar de Risco)', correct: false },
          { text: '5S (Housekeeping)', correct: false },
          { text: 'LOTO (Lockout/Tagout)', correct: true },
        ],
      },
    ],
  },
  {
    id: 105,
    title: 'Teste de Conhecimento: NR-12 (Máquinas e Equipamentos)',
    relatedVideoId: 6,
    thumbnail: quizNr,
    dueDate: '31/10/2025',
    questions: [
      {
        text: 'O que a NR-12 estabelece como medida prioritária de segurança em máquinas?',
        options: [
          { text: 'Proteções coletivas (guardas fixas, sensores)', correct: true },
          { text: 'Uso de Equipamento de Proteção Individual (EPI)', correct: false },
          { text: 'Treinamento contínuo dos operadores', correct: false },
        ],
      },
    ],
  },
  {
    id: 106,
    title: 'Avaliação: Prevenção e Combate a Incêndio',
    relatedVideoId: 7,
    thumbnail: quizIncendio,
    dueDate: '20/10/2025',
    questions: [
      {
        text: 'Para um incêndio de Classe A (papel, madeira, tecido), qual o extintor mais indicado?',
        options: [
          { text: 'Extintor de Água Pressurizada (AP)', correct: true },
          { text: 'Extintor de CO2 (Dióxido de Carbono)', correct: false },
          { text: 'Extintor de Pó Químico Seco (PQS)', correct: false },
        ],
      },
      {
        text: 'Ao usar um extintor, para onde você deve direcionar o jato?',
        options: [
          { text: 'Para o meio das chamas', correct: false },
          { text: 'Para a fumaça', correct: false },
          { text: 'Para a base do fogo', correct: true },
        ],
      },
    ],
  },
];

export const checklists = [
  { 
    id: 201, 
    title: 'Verificação Pré-Uso - Prensa Hidráulica PH-02', 
    status: 'pending',
    dueDate: '20/10/2025',
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
    dueDate: '20/10/2025',
    items: [
        { id: 1, text: 'Cinto de segurança e talabarte foram inspecionados?' },
        { id: 2, text: 'O ponto de ancoragem é seguro e foi verificado?' },
    ]
  },
  { 
    id: 203, 
    title: 'Inspeção de Ferramentas Elétricas', 
    status: 'completed',
    dueDate: '29/11/2025',
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
    title: 'Certificado de Consciente em Segurança!',
    cost: 1600,
    image: rewardCertificado,
    stock: 20,
  },
  {
    id: 305,
    title: 'Voucher: Café Grátis (1 semana)',
    cost: 2200,
    image: rewardCafe,
    stock: 20,
  },
];