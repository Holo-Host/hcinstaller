// For the Rust container interface
// import Container from '@holochain/holochain-nodejs';
import * as React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
// electron:
import * as electron from "electron";
const { app } = electron;
// MUI Imports:
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import Send from '@material-ui/icons/Send';
// local imports:
import routes from '../constants/routes';
// import handleCloseWindow from '../utils/helper-functions';
import customStyle from './Welcome.css';
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

///////////////////////////////////
// MUI Custom Styling :
const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: 140,
    width: 100,
  },
  header1: {
    marginTop: 45,
    marginLeft: 88,
  },
  header2: {
    margin: 45,
    fontFamily: 'Raleway',
    fontWeight: 500,
    letterSpacing: 3
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  typography: {
    fontFamily: 'Raleway',
    fontWeight: theme.typography.fontWeightRegular,
  },
  actions: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing.unit,
    color: '#eee',
    backgroundColor: "#00A6AE"
  },
  fab: {
    // margin: theme.spacing.unit,
    margin: 54,
    color: '#eee',
    background: '#3d65d6',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover, &$focusVisible': {
      border: '3px solid #6600ff',
      background: 'rgba(0, 1, 127, 0.7)'
    },
  },
  closeIcon: {
    marginRight: theme.spacing.unit,
  },
  checkboxSection: {
    display: 'flex',
  },
  inline: {
    display: 'inline-block'
  },
  focusVisible: {},
  hcLogo: {
    height: '15%',
    position: 'fixed',
    left: 2,
    top: 2
  },
  closeIcon: {
    margin: theme.spacing.unit,
    position: 'fixed',
    top: 0,
    right: 0,
    fontSize: 10,
    color: '#70a297',
    border: '1px solid #70a297',
    background: 'transparent',
    '&:hover, &$focusVisible': {
      border: '2px solid red',
      color: 'red',
      background: 'transparent',
    },
  }
});
/////////////////////

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

class Installation extends React.Component<WelcomeProps, {}> {
  constructor(props:WelcomeProps){
    super(props);
    this.state = {
      container_installed: false,
      hc_rust_version: "",
      rustup_version: "",
      cargo_version: "",
      zmq_version: "",
      node_version: "",
      returning_user: false // TODO: Default this to false  +  handle true case && handle the toggle case...
    };
    this.findCargoVersion = this.findCargoVersion.bind(this);
    this.findRustupVersion = this.findRustupVersion.bind(this);
  }

  componentDidMount = () => {
    this.findNodeVersion();
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

    handleCloseWindow = () => {
      const { ipcRenderer } = electron;
      const quit = 'quit'
      ipcRenderer.send("window:close", quit);
    };

  render() {
    console.log("this.props : ",this.props);
    console.log("this.state : ",this.state);

    const { classes, fullScreen } = this.props;
    // const {node_version, rustup_version, cargo_version, hc_rust_version, zmq_version, container_installed} = this.props
    const { node_version, rustup_version, cargo_version, hc_rust_version, zmq_version, container_installed, returning_user } = this.state

    const softwareToInstall = [
      {
        name: 'Node',
        state_obj: node_version,
      },
      {
        name: 'Rustup',
        state_obj: rustup_version,
      },
      {
        name: 'Cargo',
        state_obj: cargo_version,
      },
      {
        name: 'ZeroMQ',
        state_obj: zmq_version,
      },
      {
        name: 'Holochain Rust',
        state_obj: hc_rust_version,
      },
    ];

    return (
      <Grid container className={classes.root} spacing={16}>
        <Fab aria-label="primary" className={classes.closeIcon} onClick={this.handleCloseWindow}>
          <Icon>X</Icon>
        </Fab>
        <div className={customStyle.container} data-tid="container">
          <span className={classes.inline}>
            <img src={logo} className={"App-Logo", classes.hcLogo} alt="logo" />
          </span>
          <h2 className={classes.header1}>Holochain Container Setup</h2>
          <h3 className={classes.header2}>Let us welcome you into the community by introducing ourselves a bit more and offering you to some additional resources.</h3>

          <Grid item xs={12} className={classes.checkboxSection}>
            <Grid container justify="center" spacing={16}>
              <ul>
              {softwareToInstall.map(software => (
                <li key={software.name}>
                {software.name ?
                  <div className="checkbox">
                  {software.name} Installed : {software.state_obj}
                    <label>
                      <input type="checkbox-checked" />
                      <span className="checkbox-material">
                        <span className="check"></span>
                      </span>
                    </label>
                  </div>
                  :
                  <div className="checkbox">
                  {software.name}
                    <label>
                      <input type="checkbox" />
                      <span className="checkbox-material">
                        <span classNam="check"></span>
                      </span>
                    </label>
                  </div>
                }
                </li>
              ))}
              </ul>
            </Grid>
         </Grid>

         <Grid item xs={12} className={classes.checkboxSection}>
           <Grid container justify="center" spacing={16}>
              <Fab variant="extended" aria-label="prev" className={classes.fab}>
                <Link to={routes.WELCOMENEWUSER}>
                   <Icon className={classes.nextIcon} />
                   Review Holochain Info
                 </Link>
              </Fab>
              <Fab color={container_installed ? "primary" : "disabled"} variant="extended" aria-label="next" className={classes.fab}>
                {container_installed ?
                    <div>
                      <Icon className={classes.nextIcon} />
                      Generate Root Seed
                    </div>
                    :
                    <div>
                    {returning_user ?
                      <Link to={routes.DEVICEPIN}>
                       <Icon className={classes.nextIcon} />
                       Enter Device Seed Bundle and PIN
                     </Link>
                     :
                     <Link to={routes.ROOTSEEDPASSPHRASE}>
                      <Icon className={classes.nextIcon} />
                      Generate Root Seed
                    </Link>
                  }
                  </div>
                }
              </Fab>
           </Grid>
         </Grid>
        </div>
      </Grid>
    );
  }
}

Installation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Installation);
//  ROOTSEED

// <h3>Your Node Version: {node_version}</h3>
// <h3>Your Rustup Version: {rustup_version}</h3>
// <h3>Your Cargo Version: {cargo_version}</h3>
// <h3>Your libZMQ Version: {zmq_version}</h3>
// <h3>Your HC Rust Version: {hc_rust_version}</h3>
