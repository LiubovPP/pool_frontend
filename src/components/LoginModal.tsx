import type React from 'react';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginUser } from '@app/slices/authSlice';
import '@styles/Modals.css';
import { useAppDispatch, useAppSelector } from '@app/hooks/hooks';
import type { RootState } from '@app/store';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onRegister }) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state: RootState) => state.auth.error);
  const [showPassword, setShowPassword] = useState(false);

  const validate = (values: { username: string; password: string }) => {
    const errors: { username?: string; password?: string } = {};
    if (!values.username) {
      errors.username = 'Имя пользователя обязательно';
    } else if (values.username.length < 2) {
      errors.username = 'Имя пользователя должно быть не менее 2 символов';
    }

    if (!values.password) {
      errors.password = 'Пароль обязателен';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/.test(values.password)) {
      errors.password = 'Пароль должен содержать не менее одной заглавной и строчной буквы, одного спецсимвола и быть длиной не менее 6 символов';
    }

    return errors;
  };

  const handleLogin = async (values: { username: string; password: string }, { resetForm }: { resetForm: () => void }) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      onClose();
      resetForm();
    } catch (error) {
      console.error('Ошибка входа', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Вход</h2>
        {error && <p className="error">{error}</p>}
        <Formik
          initialValues={{ username: '', password: '' }}
          validate={validate}
          onSubmit={handleLogin}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isSubmitting, setFieldValue, setFieldTouched, values, errors, touched, setErrors, setTouched }) => (
            <Form>
              <div className="input-container">
                <label htmlFor="username">Имя пользователя</label>
                <Field
                  type="text"
                  name="username"
                  placeholder="example@domain.com"
                  autoComplete="username"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    setFieldValue('username', value);
                    const validationErrors = validate({ ...values, username: value });
                    setErrors(validationErrors);
                    setTouched({ ...touched, username: true });
                  }}
                  value={values.username}
                />
                {errors.username && touched.username && (
                  <div className="error">{errors.username}</div>
                )}
              </div>
              <div className="input-container">
                <label htmlFor="password">Пароль</label>
                <div className="password-input-wrapper">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Введите пароль"
                    autoComplete="current-password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      setFieldValue('password', value);
                      const validationErrors = validate({ ...values, password: value });
                      setErrors(validationErrors);
                      setTouched({ ...touched, password: true });
                    }}
                    value={values.password}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <div className="error">{errors.password}</div>
                )}
              </div>
              <button type="submit" disabled={isSubmitting}>Войти</button>
              <p className="register-link">
                Нет аккаунта? <a href="#" onClick={onRegister}>Регистрация</a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginModal;
