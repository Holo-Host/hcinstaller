import * as React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import WelcomePage from './containers/WelcomePage';
import WelcomeNewUserPage from './containers/WelcomeNewUserPage';
import InstallationPage from './containers/InstallationPage';
import SeedGenerationPage from './containers/SeedGenerationPage';
import CoreAppSeletionPage from './containers/CoreAppSeletionPage';
import RootSeedPage from './containers/RootSeedPage';
import RootSeedPassphrasePage from './containers/RootSeedPassphrasePage';
import DeviceBundlePage from './containers/DeviceBundlePage';
// import HelloWorldPage from './containers/HelloWorldPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.DEVICEBUNDLES} component={DeviceBundlePage} />
      <Route path={routes.ROOTSEEDPASSPHRASE} component={RootSeedPassphrasePage} />
      <Route path={routes.ROOTSEED} component={RootSeedPage} />
      <Route path={routes.WELCOMENEWUSER} component={WelcomeNewUserPage} />
      <Route path={routes.COREAPPS} component={CoreAppSeletionPage} />
      <Route path={routes.SEEDDERIVATION} component={SeedGenerationPage} />
      <Route path={routes.INSTALLATION} component={InstallationPage} />
      <Route path={routes.WELCOME} component={WelcomePage} />
    </Switch>
  </App>
);

// "DEVICEBUNDLES": "/devicebundles",
// "ROOTSEEDPASSPHRASE": "/rootseedpassphrase",
// "ROOTSEED": "/rootseed",

// <Route path={routes.HELLOWORLD} component={HelloWorldPage} />
