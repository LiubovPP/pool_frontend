
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@app/slices/authSlice';
import '@styles/Modals.css';
import { RootState, AppDispatch } from '@app/store';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginUser } from '@app/slices/authSlice';
import '@styles/Modals.css';
import { useAppDispatch, useAppSelector } from '@app/hooks/hooks';
import { RootState } from '@app/store';
development

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onRegister }) => {
bal_ser
  const dispatch: AppDispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const error = useSelector((state: RootState) => state.auth.error);
  const dispatch = useAppDispatch();
  const error = useAppSelector((state: RootState) => state.auth.error);
  development

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    phoneNumber: '',
  });

  const validateField = (name: string, value: string) => {
    let error = '';

    if (name === 'username') {
      if (value.trim().length < 2) {
        error = 'Имя пользователя должно содержать минимум 2 символа';
      }
    } else if (name === 'password') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
      if (!passwordRegex.test(value)) {
        error = 'Пароль должен содержать минимум 4 символа, одну заглавную букву, одну строчную букву, одну цифру и один специальный символ';
      }
    } else if (name === 'phoneNumber') {
      const phoneRegex = /^\+?[\d\s\-()]{7,15}$/;
      if (!phoneRegex.test(value)) {
        error = 'Некорректный номер телефона';
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (name: string, value: string) => {
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
    if (name === 'phoneNumber') setPhoneNumber(value);

    validateField(name, value);
  };

  const handleLogin = async () => {
    if (errors.username || errors.password || errors.phoneNumber) {
      return;
    }

    try {
      await dispatch(loginUser({ username, password })).unwrap();
      handleClose();
    } catch (error) {
      console.error('Ошибка входа', error);
    }
  };

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setPhoneNumber('');
    setErrors({ username: '', password: '', phoneNumber: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
bal_ser
      <h2>Вход</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        value={username}
        onChange={(e) => handleChange('username', e.target.value)}
        placeholder="Имя пользователя"
      />
      {errors.username && <p className="error">{errors.username}</p>}
      <input
        type="password"
        value={password}
        onChange={(e) => handleChange('password', e.target.value)}
        placeholder="Пароль"
      />
      {errors.password && <p className="error">{errors.password}</p>}
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => handleChange('phoneNumber', e.target.value)}
        placeholder="Телефон"
      />
      {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
      <button onClick={handleLogin}>Войти</button>
      <button onClick={onRegister}>Регистрация</button>
      <button onClick={handleClose}>Закрыть</button>
      <div className="modal-content">
        <h2>Вход</h2>
        {error && <p className="error">{error}</p>}
        <Formik
          initialValues={{ username: '', password: '' }}
          validate={validate}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <Field type="text" name="username" placeholder="Имя пользователя" autoComplete="username" />
                <ErrorMessage name="username" component="div" className="error" />
              </div>
              <div>
                <Field type="password" name="password" placeholder="Пароль" autoComplete="current-password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <button type="submit" disabled={isSubmitting}>Войти</button>
              <button type="button" onClick={onRegister}>Регистрация</button>
              <button type="button" onClick={onClose}>Закрыть</button>
            </Form>
          )}
        </Formik>
      </div>

    </div>
  );
};

export default LoginModal;
