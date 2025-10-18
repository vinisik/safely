import { useState, useEffect } from 'react';

// Este hook retorna 'true' se a largura da tela for menor que 768px
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // Função que será chamada toda vez que a janela for redimensionada
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Adiciona o "ouvinte" de evento de redimensionamento
    window.addEventListener('resize', handleResize);

    // Função de limpeza: remove o "ouvinte" quando o componente não estiver mais na tela
    // Isso é importante para evitar vazamentos de memória
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // O array vazio [] garante que o efeito rode apenas uma vez (ao montar/desmontar)

  return isMobile;
}

export default useIsMobile;