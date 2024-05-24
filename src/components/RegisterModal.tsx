import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearRegisterError } from '@app/slices/authSlice';
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
  const { error, validationErrors } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isOpen) {
      dispatch(clearRegisterError());
      setErrors({});
    }
  }, [isOpen, dispatch]);

  const handleRegister = async () => {
    const validationErrors = validateRegister({ firstName, lastName, email, password, phoneNumber, role: 'USER' } as User);
    if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Пароли не совпадают';
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    await dispatch(registerUser({ firstName, lastName, email, password, phoneNumber, role: 'USER' } as User));
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPhoneNumber('');
    onClose();
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'firstName' || name === 'lastName') {
      if (value.trim().length < 2) {
        error = 'Поле должно содержать минимум 2 символа';
      }
    } else if (name === 'email') {
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        error = 'Неверный формат email';
      }
    } else if (name === 'password') {
      if (value.length < 8) {
        error = 'Пароль должен содержать минимум 8 символов';
      } else if (!/[A-Z]/.test(value)) {
        error = 'Пароль должен содержать хотя бы одну заглавную букву';
      } else if (!/[a-z]/.test(value)) {
        error = 'Пароль должен содержать хотя бы одну строчную букву';
      } else if (!/[0-9]/.test(value)) {
        error = 'Пароль должен содержать хотя бы одну цифру';
      } else if (!/[!@#$%^&*]/.test(value)) {
        error = 'Пароль должен содержать хотя бы один специальный символ';
      }
    } else if (name === 'phoneNumber') {
      if (!/^\+?[0-9]{3}-?[0-9]{6,12}$/.test(value)) {
        error = 'Неверный формат номера телефона';
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleInputChange = (name: string, value: string) => {
    validateField(name, value);
    if (name === 'firstName') {
      setFirstName(value);
    } else if (name === 'lastName') {
      setLastName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else if (name === 'phoneNumber') {
      setPhoneNumber(value);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Регистрация</h2>
      {error && <p className="error">{error}</p>}
      <div className="input-group">
        <label htmlFor="firstName">Имя</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          placeholder="Имя"
          style={{ borderColor: errors.firstName ? 'red' : 'initial' }}
        />
        {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}
      </div>
      <div className="input-group">
        <label htmlFor="lastName">Фамилия</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          placeholder="Фамилия"
          style={{ borderColor: errors.lastName ? 'red' : 'initial' }}
        />
        {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
      </div>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Email"
          style={{ borderColor: errors.email ? 'red' : 'initial' }}
        />
        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
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
      <div className="input-group">
        <label htmlFor="confirmPassword">Подтвердите пароль</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          placeholder="Подтвердите пароль"
          style={{ borderColor: errors.confirmPassword ? 'red' : 'initial' }}
        />
        {errors.confirmPassword && <div style={{ color: 'red' }}>{errors.confirmPassword}</div>}
      </div>
      <div className="input-group">
        <label htmlFor="phoneNumber">Телефон</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          placeholder="Телефон"
          style={{ borderColor: errors.phoneNumber ? 'red' : 'initial' }}
        />
        {errors.phoneNumber && <div style={{ color: 'red' }}>{errors.phoneNumber}</div>}
      </div>
      <button onClick={handleRegister}>Регистрация</button>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
};

const validateRegister = (userData: User) => {
  const errors: { [key: string]: string } = {};
  if (userData.firstName.trim().length < 2) {
    errors.firstName = 'Поле должно содержать минимум 2 символа';
  }
  if (userData.lastName.trim().length < 2) {
    errors.lastName = 'Поле должно содержать минимум 2 символа';
  }
  if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
    errors.email = 'Неверный формат email';
  }
  if (userData.password.length < 8) {
    errors.password = 'Пароль должен содержать минимум 8 символов';
  }
  if (!/[A-Z]/.test(userData.password)) {
    errors.password = 'Пароль должен содержать хотя бы одну заглавную букву';
  }
  if (!/[a-z]/.test(userData.password)) {
    errors.password = 'Пароль должен содержать хотя бы одну строчную букву';
  }
  if (!/[0-9]/.test(userData.password)) {
    errors.password = 'Пароль должен содержать хотя бы одну цифру';
  }
  if (!/[!@#$%^&*]/.test(userData.password)) {
    errors.password = 'Пароль должен содержать хотя бы один специальный символ';
  }
  if (!/^\+?[0-9]{3}-?[0-9]{6,12}$/.test(userData.phoneNumber)) {
    errors.phoneNumber = 'Неверный формат номера телефона';
  }
  return errors;
};

export default RegisterModal;
