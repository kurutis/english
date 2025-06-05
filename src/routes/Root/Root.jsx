import React from 'react';
import s from './Root.module.css';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import AuthorizationForm from '../../components/AuthorizationForm/AuthorizationForm';
import ChoosePlace from '../ChoosePlace/ChoosePlace';

export const Root = () => {
  const location = useLocation();

  return (
    <div className={s.container}>
      <Header />
      <div className="main-page">
        {location.pathname === '/' && <AuthorizationForm />}
        {location.pathname === '/ChoosePlace' && <ChoosePlace />}
      </div>
    </div>
  );
};
