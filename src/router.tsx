import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { browserHistory } from './history';
import App from './components/app/App';
import NotFound from './components/notFound/NotFound';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import MenuBar from './components/menu/MenuBar';
import Make from './components/make/Make';
import Variant from './components/variant/Variant';
const history = browserHistory;

const Routes = () => {
  return (
    <Router history={history}>
      <>
        <Header />
        <MenuBar />
        <Switch>
          <Route exact={true} path="/" component={App} />
          <Route path="/:make/:model" exact={true} component={Variant} />
          <Route path="/:make" exact={true} component={Make} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </>
    </Router>
  );
};

export default Routes;
