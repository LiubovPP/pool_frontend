import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@app/store';
import '@styles/Home.css';

const Home: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="home-container">
      <span className="welcome-message">
        Добро пожаловать, {user?.firstName} {user?.lastName}
      </span>
    </div>
  );
};

export default Home;
