import * as React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import WelcomePage from './containers/WelcomePage';
import HelloWorldPage from './containers/HelloWorldPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.WELCOME} component={WelcomePage} />
      <Route path={routes.HELLOWORLD} component={HelloWorldPage}>
    </Switch>
  </App>
);
