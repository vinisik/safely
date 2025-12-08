import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaClipboardList, FaMedal, FaQrcode, FaHeadset, FaArrowLeft, 
  FaBookOpen, FaVideo, FaCheckCircle, FaStar, FaArrowRight 
} from 'react-icons/fa';
import '../pages/Pages.css'; // Garante os estilos globais

function TutorialPage() {
  const navigate = useNavigate();

  const tutorialSteps = [
    {
      id: 1,
      step: "01",
      title: "Realize Inspeções",
      icon: <FaClipboardList />,
      color: "#005A9C", // Azul Michelin
      desc: "No menu 'Checklists', você encontra suas tarefas do dia. Marque os itens como conformes ou reporte problemas com fotos e observações."
    },
    {
      id: 2,
      step: "02",
      title: "Capacite-se",
      icon: <FaVideo />,
      color: "#E91E63", // Rosa Vibrante
      desc: "Acesse a galeria de vídeos e treinamentos. Assistir aos conteúdos até o fim garante pontos extras e mantém sua certificação em dia."
    },
    {
      id: 3,
      step: "03",
      title: "Scanner Ágil",
      icon: <FaQrcode />,
      color: "#8b5cf6", // Roxo
      desc: "No celular, use o botão flutuante central para ler QR Codes nas máquinas. O checklist correto abrirá automaticamente na sua tela."
    },
    {
      id: 4,
      step: "04",
      title: "Ganhe Recompensas",
      icon: <FaMedal />,
      color: "#FF9800", // Laranja/Ouro
      desc: "Cada ação vale pontos! Suba no Ranking da sua equipe e troque seus pontos acumulados por prêmios reais na nossa Loja."
    },
    {
      id: 5,
      step: "05",
      title: "Suporte Total",
      icon: <FaHeadset />,
      color: "#22c55e", // Verde
      desc: "Viu um risco? Precisa de EPI? Use o Chat no menu para falar com nosso Assistente Virtual ou chamar um técnico imediatamente."
    }
  ];

  return (
    <div className="checklistPageModern">
      <title>Safely | Como Usar</title>

      {/* Navegação Simples */}
      <div style={{marginBottom: '1rem'}}>
        <button 
            onClick={() => navigate('/')} 
            className="btnGhost" 
            style={{border:'none', paddingLeft:0, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px'}}
        >
           <FaArrowLeft /> Voltar ao Início
        </button>
      </div>

      {/* Banner de Boas-vindas (Hero Section) */}
      <div className="welcomeBannerGlass" style={{background: 'linear-gradient(135deg, #005A9C, #2563eb)', padding: '3rem 2rem', textAlign: 'center'}}>
        <FaBookOpen style={{fontSize: '3rem', color: 'rgba(255,255,255,0.2)', marginBottom: '1rem'}} />
        <h1 style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>Bem-vindo à Safely</h1>
        <p style={{fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9}}>
            Sua plataforma de segurança inteligente. Acompanhe abaixo o guia rápido para transformar segurança em hábito e recompensas.
        </p>
      </div>

      {/* Título da Seção */}
      <h2 style={{marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--text-color)', textAlign: 'center'}}>
          Jornada do Colaborador
      </h2>

      {/* Grid de Passos (Cards Visuais) */}
      <div className="dashboardGridModern" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem'}}>
        {tutorialSteps.map(step => (
            <div key={step.id} className="summaryCardGlass" style={{
                flexDirection: 'column', 
                alignItems: 'center', 
                padding: '2rem 1.5rem', 
                gap: '1rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                borderTop: `4px solid ${step.color}`
            }}>
                {/* Número de Fundo (Marca d'água) */}
                <span style={{
                    position: 'absolute', top: '-10px', right: '10px', 
                    fontSize: '4rem', fontWeight: '900', color: step.color, opacity: 0.1
                }}>
                    {step.step}
                </span>

                {/* Ícone */}
                <div style={{
                    width: '70px', height: '70px', borderRadius: '50%', 
                    background: `${step.color}15`, // Cor com transparência
                    color: step.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.8rem', marginBottom: '0.5rem'
                }}>
                    {step.icon}
                </div>

                {/* Texto */}
                <h3 style={{fontSize: '1.2rem', margin: 0, color: 'var(--text-color)'}}>{step.title}</h3>
                <p style={{fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0}}>
                    {step.desc}
                </p>
            </div>
        ))}
      </div>

      {/* Seção FAQ (Dúvidas Rápidas) */}
      <div className="dashboardSectionGlass" style={{marginTop: '3rem', maxWidth: '800px', margin: '3rem auto 0 auto'}}>
          <div className="sectionHeader">
              <h2 style={{display:'flex', alignItems:'center', gap:'10px'}}>
                  <FaStar style={{color: '#fbbf24'}}/> Dicas de Ouro
              </h2>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              
              <div className="modernListItem" style={{padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--input-bg)'}}>
                  <h4 style={{margin: '0 0 5px 0', color: 'var(--primary-color)', display:'flex', alignItems:'center', gap:'8px'}}>
                      <FaCheckCircle size={14}/> O que acontece se eu não fizer o checklist?
                  </h4>
                  <p style={{margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
                      Seu supervisor será notificado e seu indicador de conformidade cairá. Mantenha a rotina para garantir a segurança de todos.
                  </p>
              </div>

              <div className="modernListItem" style={{padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--input-bg)'}}>
                  <h4 style={{margin: '0 0 5px 0', color: 'var(--primary-color)', display:'flex', alignItems:'center', gap:'8px'}}>
                      <FaCheckCircle size={14}/> Como subo de nível no Ranking?
                  </h4>
                  <p style={{margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
                      Seja consistente! Faça checklists diários, não atrase tarefas e acerte as perguntas dos Quizzes semanais.
                  </p>
              </div>

          </div>
      </div>

      {/* Call to Action Final */}
      <div style={{textAlign: 'center', marginTop: '4rem', marginBottom: '2rem'}}>
          <p style={{color: 'var(--text-secondary)', marginBottom: '1rem'}}>Tudo pronto para começar?</p>
          <button 
            onClick={() => navigate('/')} 
            className="btnNewChecklist" 
            style={{
                padding: '1rem 3rem', fontSize: '1.1rem', margin: '0 auto', 
                background: 'linear-gradient(135deg, #22c55e, #16a34a)', // Verde Ação
                boxShadow: '0 10px 25px rgba(34, 197, 94, 0.4)'
            }}
          >
             Ir para o Painel <FaArrowRight style={{marginLeft: '10px'}}/>
          </button>
      </div>

    </div>
  );
}

export default TutorialPage;