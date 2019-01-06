import * as React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import logo from '../assets/holo-logo.svg'
import styles from './Welcome.css';

type CoreAppSelectionProps = {
  fetch_state: () => void,
  update_core_apps: () => void,
  coreApps: string,
}

export default class CoreAppSelection extends React.Component<CoreAppSelectionProps, {}>{
  constructor(props:WelcomeProps){
    super(props);
  };
  render() {
    return (
      <div className={styles.container} data-tid="container">
        <img src={logo} className="App-Logo" alt="logo" />
        <h2>Core Apps Stage</h2>
      </div>
    )
  }
}
