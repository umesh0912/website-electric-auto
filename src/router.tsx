import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { browserHistory } from './history';

import App from './components/app/App';
import Signin from './components/signIn/SignIn';
import Signup from './components/signUp/SignUp';
import NotFound from './components/notFound/NotFound';
import Header from './components/header/Header';
import AuthComponent from './HOC/AuthComponent';

const history = browserHistory;

const Routes = () => {
  return (
    <Router history={history}>
      <div>
        <Header />
        <Switch>
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route exact={true} path="/" component={AuthComponent(App)} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
