import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
// electron:
import * as electron from "electron";
// MUI Imports:
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
// local imports:
// import handleCloseWindow from '../utils/helper-functions'
import routes from '../constants/routes';
import logo from '../assets/icons/HC-logo.svg';
import DeviceBundleBox from './subcomponents/DeviceBundleBox';
import customStyle from './Welcome.css';

// MUI Custom Styling :
const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
  },
  passRoot: {
   marginTop: 30,
   width: '100%',
   maxWidth: 360,
   backgroundColor: theme.palette.background.paper,
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
  inlineBlock: {
    display: 'inline-block'
  },
  focusVisible: {},
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
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
  },
  bundlePanel: {
    margin: 50,
    background: '#e0a919',
    maxHeight: 750,
    display: 'flex',
    flexFlow: 'row wrap',
    padding: 20,
    justifyContent: 'space-around',
    aligncontent: 'flex-start',
    overflow: 'auto',
  },
  instructions: {
    maxHeight: 450,
    border: '3px solid #00017fb3'
  },
  iconImg: {
    maxWidth: 140,
    marginTop: -65,
  },
  nextBtn :{
    marginTop: 50,
  }
});

// THE BELOW SHOULD be be REPLACED by an API call and respnose with the DPKI
const rootSeedBundle = {
    name: "My Root Seed Bundle",
    id: "RS1",
    bundle: {
      type: "Root Seed",
      hint: "ZoElJettTech",
      data: "My Key Pair, Nonce, and other key data..."
    }
  }

  type RootSeedProps = {
    fetch_state: () => void,
  }

  type RootSeedState = {
    rootSeedBundle: any,
  }

class RootSeed extends React.Component {
  constructor(props:WelcomeProps){
    super(props);
  	//setting this.state.bundles to equal the bundles json array:
  	this.state = {
  		rootSeedBundle,
      expanded: false,
      installationNotice: false,
      affirm: false,
      showPassword: false
  	};
  };

  handleInstallationNoticeOpen = () => {
    this.setState({ installationNotice: true });
  };

  handleInstallationNoticeClose = () => {
    this.setState({ installationNotice: false });
  };

  handleInstallationNoticeCloseAffirm = () => {
    this.setState({
      installationNotice: false,
      affirm: true
    });
  };

  handleCloseWindow = () => {
    const { ipcRenderer } = electron;
    const quit = 'quit'
    ipcRenderer.send("window:close", quit);
  };

  render() {
    const { classes, fullScreen } = this.props;
    const { rootSeedBundle } = this.state;

    return (
      <Grid container className={classes.root} spacing={16}>
        <Fab aria-label="primary" className={classes.closeIcon} onClick={this.handleCloseWindow}>
          <Icon>X</Icon>
        </Fab>
        <div className={customStyle.container} data-tid="container">
          <span className={classes.inline}>
            <img src={logo} className={"App-Logo", classes.hcLogo} alt="logo" />
          </span>

          <h2 className={classes.header1}>Your Root Seed Bundle</h2>
          <h3 className={classes.header2}>This is your Holochain fingerprint. Please handle and save your Root Seed Bundle with extreme care.</h3>

          <Grid item xs={6} className={classnames(classes.passRoot, classes.instructions)}  elevation={1}>
          <img src="assets/icons/key-icon.png" alt="fingerprint image" className={classes.iconImg}/>
            <div className={classes.sectionInstructions}>
              <Grid container alignItems="center">
                <Divider variant="middle" />
                <Grid item>
                  <Typography gutterBottom variant="h6">
                   STEPS FOR HOW TO SAFELY STORE A ROOT SEED BUNDLE
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <Divider variant="middle" />
            <DeviceBundleBox
              key={rootSeedBundle.key}
              name={rootSeedBundle.name}
              bundle={rootSeedBundle.bundle}
            />
          </Grid>

          <Grid item xs={12} className={classes.iconSection}>
           <Grid container justify="center" spacing={16}>
               <div className={classes.modal}>
                  <Fab color="primary" variant="extended" aria-label="next" className={classes.nextBtn} onClick={this.handleInstallationNoticeOpen}>
                     Discover Device Bundles
                  </Fab>
                 <Dialog
                    fullScreen={fullScreen}
                    open={this.state.installationNotice}
                    onClose={this.handleInstallationNoticeClose}
                    aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">{"...and onto the Device Seed Bundles"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Nice Job! You have now successfully recorded the Root Seed Bundle and are ready to store your Device Seed Bundles.
                      </DialogContentText>
                      <br/>
                      <DialogContentText>
                      You are about to receive your Root Seed Bundle (and mnemonics?...).
                        1.Prepares user to receive this sensative info.
                        2.Describes/reiterates importance of Device Bundles
                      </DialogContentText>
                    </DialogContent>
                  <DialogActions>
                      <Button onClick={this.handleInstallationNoticeClose} color="primary">
                        Go Back
                      </Button>
                      <Link to={routes.DEVICEBUNDLES}>
                        <Button onClick={this.handleInstallationNoticeCloseAffirm} color="primary" autoFocus>
                          Ready for my Root Seed
                        </Button>
                      </Link>
                  </DialogActions>
                </Dialog>
               </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  }
};

export default withStyles(styles)(RootSeed);
