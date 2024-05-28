import React from 'react';
import '@styles/HamamModal.css';

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Заказать звонок</h2>
        <form>
          <input type="text" placeholder="Имя" />
          <input type="text" placeholder="Телефон" />
          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
