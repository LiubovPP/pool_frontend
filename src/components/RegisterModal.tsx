import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@app/slices/authSlice';
import '@styles/Modals.css';
import { RootState, AppDispatch } from '@app/store';
import { User } from '@app/types';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const error = useSelector((state: RootState) => state.auth.error);

  const handleRegister = async () => {
    await dispatch(registerUser({ firstName, lastName, email, password, phoneNumber, role: 'USER' } as User));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Регистрация</h2>
      {error && <p className="error">{error}</p>}
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Имя" />
      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Фамилия" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
      <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Телефон" />
      <button onClick={handleRegister}>Регистрация</button>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
};

export default RegisterModal;
