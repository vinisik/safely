import React from 'react';
import { FaCommentDots } from 'react-icons/fa'; // Ícone de chat

function FloatingChatButton({ onClick }) {
  return (
    <button className="fab" onClick={onClick} aria-label="Abrir chat de suporte">
      <FaCommentDots size={24} />
    </button>
  );
}

export default FloatingChatButton;