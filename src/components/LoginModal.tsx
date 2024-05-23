import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@app/slices/authSlice';
import '@styles/Modals.css';
import { RootState, AppDispatch } from '@app/store';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onRegister }) => {
  const dispatch: AppDispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'username') {
      if (value.trim().length < 2) {
        error = 'Имя пользователя должно содержать минимум 2 символа';
      }
    } else if (name === 'password') {
      if (value.length < 4) {
        error = 'Пароль должен содержать минимум 4 символа';
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

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
      <input
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          validateField('username', e.target.value);
        }}
        placeholder="Имя пользователя"
      />
      {errors.username && <p className="error">{errors.username}</p>}
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          validateField('password', e.target.value);
        }}
        placeholder="Пароль"
      />
      {errors.password && <p className="error">{errors.password}</p>}
      <button onClick={handleLogin} disabled={Object.values(errors).some((error) => error !== '')}>Войти</button>
      <button onClick={onRegister}>Регистрация</button>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
};

export default LoginModal;
