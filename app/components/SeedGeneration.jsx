import * as React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import logo from '../assets/holo-logo.svg'
import styles from './Welcome.css';

type seedGenerationProps = {
  pin_set: boolean,
  set_pin: () => void,
  fetch_state: () => void
}

export default class SeedGeneration extends React.Component<seedGenerationProps, {}> {
  constructor(props:WelcomeProps){
    super(props);
  };
  render() {
    return (
      <div className={styles.container} data-tid="container">
      <img src={logo} className="App-Logo" alt="logo" />
      <h2>Seed Generation Stage</h2>

      <Link to={routes.WELCOME}>
        <button>Go Back</button>
      </Link>
      </div>
    )
  }
}

SeedGeneration.defaultProps = {
  pin_set: false
}
