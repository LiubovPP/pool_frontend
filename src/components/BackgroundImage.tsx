import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import homeBackground from '@assets/head-d.png';
import poolsBackground from '@assets/head-d.png';
import hamamsBackground from '@assets/hamam.png';
import saunasBackground from '@assets/saynabg.png';
import '@styles/BackgroundImage.css';

const BackgroundImage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const backgroundImageElement = document.querySelector('.background-image') as HTMLElement;

    if (backgroundImageElement) {
      console.log(`Current path: ${location.pathname}`);
      switch (location.pathname) {
        case '/':
          backgroundImageElement.style.backgroundImage = `url(${homeBackground})`;
          break;
        case '/products':
          backgroundImageElement.style.backgroundImage = `url(${poolsBackground})`;
          break;
        case '/hamamy':
          backgroundImageElement.style.backgroundImage = `url(${hamamsBackground})`;
          break;
        case '/sauny':
          backgroundImageElement.style.backgroundImage = `url(${saunasBackground})`;
          break;
        default:
          backgroundImageElement.style.backgroundImage = 'none';
          break;
      }
      console.log(`Background image set to: ${backgroundImageElement.style.backgroundImage}`);
    } else {
      console.error('Background image element not found');
    }
  }, [location.pathname]);

  return <div className="background-image" />;
};

export default BackgroundImage;