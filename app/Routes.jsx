import * as React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
// import HelloWorldPage from './containers/HelloWorldPage';
import InstallationPage from './containers/InstallationPage';
import SeedGenerationPage from './containers/SeedGenerationPage';
import CoreAppSeletionPage from './containers/CoreAppSeletionPage';
import WelcomePage from './containers/WelcomePage';
import WelcomeNewUserPage from './containers/WelcomePage';

export default () => (
  <App>
    <Switch>
    <Route path={routes.WELCOMENEWUSER} component={WelcomeNewUserPage} />
      <Route path={routes.COREAPPS} component={CoreAppSeletionPage} />
      <Route path={routes.SEEDDERIVATION} component={SeedGenerationPage} />
      <Route path={routes.INSTALLATION} component={InstallationPage} />
      <Route path={routes.WELCOME} component={WelcomePage} />
    </Switch>
  </App>
);

// <Route path={routes.HELLOWORLD} component={HelloWorldPage} />
