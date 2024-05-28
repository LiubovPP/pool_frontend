import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginUser } from '@app/slices/authSlice';
import '@styles/Modals.css';
import { useAppDispatch, useAppSelector } from '@app/hooks/hooks';
import { RootState } from '@app/store';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onRegister }) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state: RootState) => state.auth.error);

  const validate = (values: { username: string; password: string }) => {
    const errors: { username?: string; password?: string } = {};
    if (!values.username) {
      errors.username = 'Имя пользователя обязательно';
    }
    if (!values.password) {
      errors.password = 'Пароль обязателен';
    }
    return errors;
  };

  const handleLogin = async (values: { username: string; password: string }) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      onClose();
    } catch (error) {
      console.error('Ошибка входа', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
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
