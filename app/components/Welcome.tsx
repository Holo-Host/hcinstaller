import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import logo from '../assets/holo-logo.svg'
import { rustBuild, discoverRustupVersion, discoverCargoVersion } from "../utils/hc-container-install";

type Props = {
  rust: {
    rustup_version: string,
    cargo_version: string,
  },
  zmq_version: string,
  hc_rust_version: string,
  container_installed: boolean,
  update_rustup_version: (payload) => void,
  update_cargo_version: (payload) => void
};

export default class Home extends Component<Props, {}> {
  constructor(props){
    super(props);
    this.findCargoVersion = this.findCargoVersion.bind(this);
    this.findRustupVersion = this.findRustupVersion.bind(this);
  }

  componentDidMount = () => {
    this.findRustupVersion();
  }

  findRustupVersion = () => {
    console.log("Checking for Rustup Version");

    discoverRustupVersion(res => {
      // console.log("rustup result : ", res);
      if(!res) {
        rustBuild(data => {
          console.log("rustBuild resulting data : ", data);
          const rustupV = data.slice(0,1).toString();
          this.props.update_rustup_version(rustupV);
          this.findCargoVersion();
        });
      }
      else {
        const rustupV = res.slice(0,1).toString();
        console.log("Rustup Version: ", rustupV);
        this.props.update_rustup_version(rustupV);
        this.findCargoVersion();
      }
    });
  }

   findCargoVersion = () => {
     // console.log("Checking for Cargo Version");
      discoverCargoVersion(res => {
        console.log("cargo result : ", res);
        if(!res) {
          console.log("ERROR: No cargo version found, (re?)install rustup...");
          this.findRustupVersion();
        }
        else {
          console.log("Cargo Version: ", res);
          const cargoV = res.slice(0,1).toString();
          console.log("Rustup Version: ", cargoV);
          this.props.update_cargo_version(cargoV)
        }
      });
    }

  render() {
    const { rust } = this.props

    if(!rust) {
      return (
        <div className={styles.container} data-tid="container">
          <img src={logo} className="App-Logo" alt="logo" />
          <h2>Home</h2>
          <Link to={routes.HELLOWORLD}>
            <button>Ping Hello World</button>
          </Link>
        </div>
      );
    }
    else {
      return (
        <div className={styles.container} data-tid="container">
          <img src={logo} className="App-Logo" alt="logo" />
          <h2>Home</h2>
          <h3>Rustup Version: {rust.rustup_version}</h3>
          <h3>Cargo Version: {rust.cargo_version}</h3>
        </div>
      );
    }
  }
}


// check OS:
// windows: systeminfo | findstr /B /C:"OS Name" /C:"OS Version"
// linux: cat /etc/os-release
//
