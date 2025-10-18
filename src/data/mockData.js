import thumbEpis from '../assets/thumbnails/epis.jpg';
import thumbErgonomia from '../assets/thumbnails/ergonomia.png';
import thumbAltura from '../assets/thumbnails/trabalho-altura.jpg';

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
    title: 'Segurança em Trabalho em Altura NR 35',
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
  relatedVideoId: 4, // ID de um futuro vídeo sobre o tema
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
];

export const checklists = [
    { id: 201, title: 'Checklist Diário: Empilhadeira', status: 'pending' },
    { id: 202, title: 'Checklist: Trabalho em Altura', status: 'pending' },
    { id: 203, title: 'Inspeção de Ferramentas Elétricas', status: 'pending' },
]