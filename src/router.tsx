import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Router } from 'react-router-dom';
import { browserHistory } from './history';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import MenuBar from './components/menu/MenuBar';
import RoutesMap from './routerLinks';

const history = browserHistory;

const Routes = () => {
  return (
    <Router history={history}>
      <>
        <Header />
        <MenuBar />
        {renderRoutes(RoutesMap as any)}
        <Footer />
      </>
    </Router>
  );
};

export default Routes;
