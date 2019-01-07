// For the Rust container interface
// import Container from '@holochain/holochain-nodejs';

import * as React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Welcome.css';
import logo from '../assets/icons/HC-logo.svg'
import {
  discoverNodeVersion,
  nodeBuild,
  rustupBuild,
  discoverRustupVersion,
  discoverCargoVersion,
  configureWASMtarget,
  discoverZmqVersion,
  zmqBuild,
  discoverHCrustVersion,
  HCrustBuild
} from "../utils/hc-container-install";


type WelcomeProps = {
  rust: {
    rustup_version: string,
    cargo_version: string,
  },
  zmq_version: string,
  hc_rust_version: string,
  update_rustup_version: (payload) => void,
  update_cargo_version: (payload) => void,
  update_zmq_version: (payload) => void,
  update_hc_rust_version: (payload) => void,
  fetch_state: () => void
};

export default class Welcome extends React.Component<WelcomeProps, {}> {
  constructor(props:WelcomeProps){
    super(props);
    this.state = {
      container_installed: false,
      hc_rust_version: "",
      rustup_version: "",
      cargo_version: "",
      zmq_version: "",
      node_version: "",
    };
    this.findCargoVersion = this.findCargoVersion.bind(this);
    this.findRustupVersion = this.findRustupVersion.bind(this);
  }

  componentDidMount = () => {
    this.findNodeVersion();
    // this.setState({
    //   node_version: "nodeV",
    // });
    //
    // this.setState({
    //   hc_rust_version: "nodeV",
    // });
    //
    // this.setState({
    //   zmq_version: "nodeV",
    // });
  }

// NODE
  findNodeVersion = () => {
    console.log("Checking for Node Version");
    discoverNodeVersion(res => {
      console.log("node result : ", res);
      if(!res) {
        nodeBuild(data => {
          console.log("nodeBuild resulting data : ", data);
          const nodeV = data.slice(0,1).toString();
          this.setState({
            node_version: nodeV,
          })
          this.findRustupVersion();
        });
      }
      else {
        const nodeV = res.slice(0,1).toString();
        console.log("Node Version: ", nodeV);
        this.setState({
          node_version: nodeV,
        })
        this.findRustupVersion();
      }
    });
  }

// RUSTUP
  findRustupVersion = () => {
    console.log("Checking for Rustup Version");
    discoverRustupVersion(res => {
      // console.log("rustup result : ", res);
      if(!res || res === "error") {
        rustupBuild(data => {
          console.log("rustBuild resulting data : ", data);
          const rustupV = data.slice(0,1).toString();
          this.props.update_rustup_version(rustupV);
          this.setState({
            rustup_version: rustupV
          });
          this.findCargoVersion();
        });
      }
      else {
        const rustupV = res.slice(0,1).toString();
        console.log("Rustup Version: ", rustupV);
        // this.props.update_rustup_version(rustupV);
        this.setState({
          rustup_version: rustupV
        });
        this.findCargoVersion();
      }
    });
  }
// CARGO
   findCargoVersion = () => {
     // console.log("Checking for Cargo Version");
      discoverCargoVersion(res => {
        console.log("cargo result : ", res);
        if(!res) {
          console.log("ERROR: No cargo version found, delete and (re?)install rustup...");
          // uninstall current version of rust ??
          // this.findRustupVersion();
        }
        else {
          console.log("Cargo Version: ", res);
          const cargoV = res.slice(0,1).toString();
          console.log("Rustup Version: ", cargoV);
          // this.props.update_cargo_version(cargoV)
          this.setState({
            cargo_version: cargoV
          });

          configureWASMtarget((res) => {
              console.log("WASM config result : ", res);
              this.installLibzmq();
        //       if(error) {
        //         console.log("ERROR with WASM");
        //       }
        //       else {
        // // TODO: Comment the below back in once the version-check and install for ZMQ work properly
        //         // this.installLibzmq();
        //       }
          });
        }
      });
    }

// libZMQ
    installLibzmq = () => {
      zmqBuild(data => {
        console.log("libZMQ resulting data : ", data);
        const zmqV = data.slice(0,1).toString();
        // this.props.update_zmq_version(zmqV);
        this.setState({
          zmq_version: zmqV
        });
        this.findHCrustVersion();
      });
    }

// HC Rust
    findHCrustVersion = () => {
      console.log("Checking for HC Rust Version");
      discoverHCrustVersion(res => {
        // console.log("HC Rust result : ", res);
        if(!res) {
          rustupBuild(data => {
            console.log("HC Rust resulting data : ", data);
            // if(data !== error) {
            // }
            const hcRustV = data.slice(0,1).toString();
            // this.props.update_hc_rust_version(hcRustV);
            this.setState({
              hc_rust_version: hcRustV,
              container_installed: true
            });
            // this.pingContainer();
          });
        }
        else {
          const hcRustV = res.slice(0,1).toString();
          console.log("hcRust Version: ", hcRustV);
          // this.props.update_hc_rust_version(hcRustV);
          this.setState({
            hc_rust_version: hcRustV,
            container_installed: true
          });
          // this.pingContainer();

        }
      });
    }

    // TODO: create function to test out container installation
    //  and interface with hc-installer
    // Reference: NPM PACKAGE>> https://www.npmjs.com/package/@holochain/holochain-nodejs
    // pingContainer = () => {
      // ping container and inspect communication / installation...
    // }

  render() {
    console.log("this.props : ",this.props);
    console.log("this.state : ",this.state);

    const {node_version, rustup_version, cargo_version, hc_rust_version, zmq_version, container_installed} = this.state
    // const { rust } = this.props
    // if(!rust) {
    if(!rustup_version || !cargo_version || !hc_rust_version || !zmq_version || !node_version) {
      return (
        <div className={styles.container} data-tid="container">
          <img src={logo} className="App-Logo" alt="logo" />
          <h2>Holochain Container Setup</h2>
          <Link to={routes.HELLOWORLD}>
            <button>Go to Hello World</button>
          </Link>
        </div>
      );
    }

    return (
      <div className={styles.container} data-tid="container">
        <img src={logo} className="App-Logo" alt="logo" />
        <h2>Holochain Container Setup</h2>

        <br/>
        <h3>Your Node Version: {node_version}</h3>
        <h3>Your Rustup Version: {rustup_version}</h3>
        <h3>Your Cargo Version: {cargo_version}</h3>
        <h3>Your libZMQ Version: {zmq_version}</h3>
        <h3>Your HC Rust Version: {hc_rust_version}</h3>

        <br/>
        <Link to={routes.HELLOWORLD}>
          <button>Go to Hello World</button>
        </Link>

        {container_installed ?
          <Link to={routes.SEEDDERIVATION}>
            <button>Go to Next Step</button>
          </Link>
          :
          <div/>
        }
      </div>
    );
  }
}
