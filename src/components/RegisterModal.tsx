import React, { useState, useEffect } from 'react';
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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const error = useSelector((state: RootState) => state.auth.error);

  const validateField = (name: string, value: string) => {
    let error = '';

    if (name === 'firstName' || name === 'lastName') {
      if (value.trim().length < 2) {
        error = 'Имя и фамилия должны содержать минимум 2 символа';
      }
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = 'Некорректный формат электронной почты';
      }
    } else if (name === 'password') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
      if (!passwordRegex.test(value)) {
        error = 'Пароль должен содержать минимум 4 символа, одну заглавную букву, одну строчную букву, одну цифру и один специальный символ';
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    const valid = !Object.values(errors).some((error) => error !== '');

    if (valid) {
      await dispatch(registerUser({ firstName, lastName, email, password, phoneNumber, role: 'USER' } as User));

      // Очистка полей после успешной регистрации
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPhoneNumber('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Регистрация</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
          validateField('firstName', e.target.value);
        }}
        placeholder="Имя"
      />
      {errors.firstName && <p className="error">{errors.firstName}</p>}
      <input
        type="text"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
          validateField('lastName', e.target.value);
        }}
        placeholder="Фамилия"
      />
      {errors.lastName && <p className="error">{errors.lastName}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          validateField('email', e.target.value);
        }}
        placeholder="Email"
      />
      {errors.email && <p className="error">{errors.email}</p>}
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
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Подтвердите пароль"
      />
      {password !== confirmPassword && <p className="error">Пароли не совпадают</p>}
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Телефон"
      />
      <button onClick={handleRegister} disabled={Object.values(errors).some((error) => error !== '')}>Регистрация</button>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
};

export default RegisterModal;
