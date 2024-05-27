import type React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@app/slices/authSlice';
import '@styles/Modals.css';
import type { RootState, AppDispatch } from '@app/store';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onRegister }) => {
  const dispatch: AppDispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector((state: RootState) => state.auth.error);

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ username, password })).unwrap();
      onClose();
    } catch (error) {
      console.error('Ошибка входа', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Вход</h2>
      {error && <p className="error">{error}</p>}
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Имя пользователя" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
      <button onClick={handleLogin}>Войти</button>
      <button onClick={onRegister}>Регистрация</button>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
};

export default LoginModal;