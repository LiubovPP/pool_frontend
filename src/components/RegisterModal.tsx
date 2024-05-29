import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerUser } from '@app/slices/authSlice';
import '@styles/Modals.css';
import { useAppDispatch, useAppSelector } from '@app/hooks/hooks';
import { RootState, AppDispatch } from '@app/store';
import { User } from '@app/types';

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
    } else if (values.firstName.length < 2) {
      errors.firstName = 'Имя должно быть не менее 2 символов';
    }
    if (!values.lastName) {
      errors.lastName = 'Фамилия обязательна';
    } else if (values.lastName.length < 2) {
      errors.lastName = 'Фамилия должна быть не менее 2 символов';
    }
    if (!values.email) {
      errors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Неверный формат email';
    }
    if (!values.password) {
      errors.password = 'Пароль обязателен';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/.test(values.password)) {
      errors.password = 'Пароль должен содержать не менее одной заглавной и строчной буквы, одного спецсимвола и быть длиной не менее 6 символов';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Подтверждение пароля обязательно';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Пароли не совпадают';
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Телефон обязателен';
    } else if (!/^\+?\d{10,15}$/.test(values.phoneNumber)) {
      errors.phoneNumber = 'Неверный формат телефона';
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
    try {
      await dispatch(registerUser({ ...values, role: 'USER' } as User)).unwrap();
      onClose();
    } catch (error) {
      console.error('Ошибка регистрации', error);
    }
  };

  if (!isOpen) return null;

  return (
      <div className="modal">
        <div className="modal-content">
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
            {({ isSubmitting, handleChange, handleBlur, values, errors, touched, setFieldTouched, setFieldValue }) => (
                <Form>
                  <div>
                    <Field
                        type="text"
                        name="firstName"
                        placeholder="Имя"
                        autoComplete="given-name"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e);
                          setFieldTouched('firstName', true, false);
                        }}
                        onBlur={handleBlur}
                        value={values.firstName}
                    />
                    {errors.firstName && touched.firstName && (
                        <div className="error">{errors.firstName}</div>
                    )}
                  </div>
                  <div>
                    <Field
                        type="text"
                        name="lastName"
                        placeholder="Фамилия"
                        autoComplete="family-name"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e);
                          setFieldTouched('lastName', true, false);
                        }}
                        onBlur={handleBlur}
                        value={values.lastName}
                    />
                    {errors.lastName && touched.lastName && (
                        <div className="error">{errors.lastName}</div>
                    )}
                  </div>
                  <div>
                    <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e);
                          setFieldTouched('email', true, false);
                        }}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    {errors.email && touched.email && (
                        <div className="error">{errors.email}</div>
                    )}
                  </div>
                  <div>
                    <Field
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        autoComplete="new-password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e);
                          setFieldTouched('password', true, false);
                        }}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    {errors.password && touched.password && (
                        <div className="error">{errors.password}</div>
                    )}
                  </div>
                  <div>
                    <Field
                        type="password"
                        name="confirmPassword"
                        placeholder="Подтвердите пароль"
                        autoComplete="new-password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e);
                          setFieldTouched('confirmPassword', true, false);
                        }}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                        <div className="error">{errors.confirmPassword}</div>
                    )}
                  </div>
                  <div>
                    <Field
                        type="text"
                        name="phoneNumber"
                        placeholder="Телефон"
                        autoComplete="tel"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e);
                          setFieldTouched('phoneNumber', true, false);
                        }}
                        onBlur={handleBlur}
                        value={values.phoneNumber}
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                        <div className="error">{errors.phoneNumber}</div>
                    )}
                  </div>
                  <button type="submit" disabled={isSubmitting}>Регистрация</button>
                  <button type="button" onClick={onClose}>Закрыть</button>
                </Form>
            )}
          </Formik>
        </div>
      </div>
  );
};

export default RegisterModal;
