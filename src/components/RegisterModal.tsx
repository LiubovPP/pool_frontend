import type React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerUser } from '@app/slices/authSlice';
import '@styles/Modals.css';
import type { RootState, AppDispatch } from '@app/store';
import { useAppDispatch, useAppSelector } from "@app/hooks/hooks";
import type { User } from '@app/types';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const dispatch: AppDispatch = useAppDispatch();
  const error = useAppSelector((state: RootState) => state.auth.error);

  const validate = (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
  }) => {
    const errors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      phoneNumber?: string;
    } = {};
    if (!values.firstName) {
      errors.firstName = 'Имя обязательно';
    }
    if (!values.lastName) {
      errors.lastName = 'Фамилия обязательна';
    }
    if (!values.email) {
      errors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Неверный формат email';
    }
    if (!values.password) {
      errors.password = 'Пароль обязателен';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Подтверждение пароля обязательно';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Пароли не совпадают';
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Телефон обязателен';
    }
    return errors;
  };

  const handleRegister = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
  }) => {
    await dispatch(registerUser({ ...values, role: 'USER' } as User)).unwrap();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Регистрация</h2>
      {error && <p className="error">{error}</p>}
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phoneNumber: '',
        }}
        validate={validate}
        onSubmit={handleRegister}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <ErrorMessage name="firstName" component="div" className="error" />
              <Field type="text" name="firstName" placeholder="Имя" />
            </div>
            <div>
              <ErrorMessage name="lastName" component="div" className="error" />
              <Field type="text" name="lastName" placeholder="Фамилия" />
            </div>
            <div>
              <ErrorMessage name="email" component="div" className="error" />
              <Field type="email" name="email" placeholder="Email" />
            </div>
            <div>
              <ErrorMessage name="password" component="div" className="error" />
              <Field type="password" name="password" placeholder="Пароль" />
            </div>
            <div>
              <ErrorMessage name="confirmPassword" component="div" className="error" />
              <Field type="password" name="confirmPassword" placeholder="Подтвердите пароль" />
            </div>
            <div>
              <ErrorMessage name="phoneNumber" component="div" className="error" />
              <Field type="text" name="phoneNumber" placeholder="Телефон" />
            </div>
            <button type="submit" disabled={isSubmitting}>Регистрация</button>
            <button type="button" onClick={onClose}>Закрыть</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterModal;
