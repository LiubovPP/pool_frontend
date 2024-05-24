import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearLoginError } from '@app/slices/authSlice';
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
  const { error, validationErrors } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isOpen) {
      dispatch(clearLoginError());
      setErrors({});
    }
  }, [isOpen, dispatch]);

  const handleLogin = async () => {
    const validationErrors = validateLogin({ username, password });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    await dispatch(loginUser({ username, password }));
    onClose();
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'username') {
      if (value.trim().length < 3) {
        error = 'Имя пользователя должно содержать минимум 3 символа';
      }
    } else if (name === 'password') {
      if (value.length < 8) {
        error = 'Пароль должен содержать минимум 8 символов';
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleInputChange = (name: string, value: string) => {
    validateField(name, value);
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Вход</h2>
      {error && <p className="error">{error}</p>}
      <div className="input-group">
        <label htmlFor="username">Имя пользователя</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          placeholder="Имя пользователя"
          style={{ borderColor: errors.username ? 'red' : 'initial' }}
        />
        {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
      </div>
      <div className="input-group">
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          placeholder="Пароль"
          style={{ borderColor: errors.password ? 'red' : 'initial' }}
        />
        {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
      </div>
      <button onClick={handleLogin}>Войти</button>
      <button className="secondary-button" onClick={onRegister}>Регистрация</button>
      <button className="secondary-button" onClick={onClose}>Закрыть</button>
    </div>
  );
};

const validateLogin = (credentials: { username: string; password: string }) => {
  const errors: { [key: string]: string } = {};
  if (credentials.username.trim().length < 3) {
    errors.username = 'Имя пользователя должно содержать минимум 3 символа';
  }
  if (credentials.password.length < 8) {
    errors.password = 'Пароль должен содержать минимум 8 символов';
  }
  return errors;
};

export default LoginModal;
