import React, { useState } from 'react';
import Modal from '@components/HamamModal';
import '@styles/HamamyPage.css'; // Подключение стилей

const HamamyPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="hamamy-page">
      <div className="hamamy-content">
        <h1 className="hamamy-title">Хамамы</h1>
        <p className="hamamy-description">
          Турецкая баня хамам – это гармония здоровья семьи и бизнеса.
          В наших хамамах вы сможете насладиться паром,
          расслабиться и улучшить своё здоровье. Хамамы - это идеальное место для отдыха и оздоровления.
        </p>
        <button className="hamamy-button" onClick={handleButtonClick}>Заказать звонок</button>
      </div>
      <Modal show={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default HamamyPage;
