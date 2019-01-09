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
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
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
   width: '100%',
   maxWidth: 500,
   margin: 10,
   backgroundColor: theme.palette.background.paper,
   color: 'white',
   borderRadius: 8
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
  nextBtn: {
    marginTop:-30,
    marginBottom:8,
    width:200,
    maxWidth:200
  },
  iconImg: {
    width: 80,
    marginTop: 15
  },
  instructions: {
    color: '#eee',
    marginTop: 18,
    maxHeight: 200,
    background: '#4f83a4',
    border: '1px solid #eee'
  },
  whiteText: {
    color: "#eee",
    textAlign: 'center'
  }
});

// THE BELOW SHOULD be be REPLACED by an API call and respnose with the DPKI
const bundles = [
  {
    name: "Bundle 1",
    id: "1",
    nickname: "",
    intializeDate: "",
    bundle: {
      type: "Device Seed",
      hint: "ZoElJettTech",
      data: "My Key Pair, Nonce, and other meta data..."
    }
  },
  {
    name: "Bundle 2",
    id: "2",
    nickname: "",
    intializeDate: "",
    bundle: {
      type: "Device Seed",
      hint: "APPLICATION HINT",
      data: "My Key Pair, Nonce, and other meta data..."
    }
  },
  {
    name: "Bundle 3",
    id: "3",
    nickname: "",
    intializeDate: "",
    bundle: {
      type: "Device Seed",
      hint: "My Special Hint",
      data: "My Key Pair, Nonce, and other meta data..."
    }
  },
  {
    name: "Bundle 4",
    id: "4",
    nickname: "",
    intializeDate: "",
    bundle: {
      type: "Device Seed",
      hint: "My Special Hint",
      data: "My Key Pair, Nonce, and other meta data..."
    }
  },
  {
    name: "Bundle 5",
    id: "5",
    nickname: "",
    intializeDate: "",
    bundle: {
      type: "Device Seed",
      hint: "My Special Hint",
      data: "My Key Pair, Nonce, and other meta data..."
    }
  }
]


type deviceBundleProps = {
  // pin_set: boolean
  // set_pin: () => void,
  fetch_state: () => void,
}

type deviceBundleState = {
  bundles: any,
  pinSet: boolean
}

class DeviceBundles extends React.Component {
  constructor(props:WelcomeProps){
    super(props);
  	//setting this.state.bundles to equal the bundles json array:
  	this.state = {
  		bundles,
      pinSet: true // TODO: CHANGE BACK TO 'false'
  	};
  };

  componenetDidMount() {
  // TODO: Check to see if the PIN is set, and if so.. update Component State...
    // this.setState({
    //   pinSet: this.props.pin_set
    // })
  };

  handlePinSet = () => {
    console.log("handlePinSet Triggered...");
// TODO: TRigger the action to update the set_pin prop.
    // this.props.set_pin();
  }

   handleCloseWindow = () => {
     const { ipcRenderer } = electron;
     const quit = 'quit'
     ipcRenderer.send("window:close", quit);
   };

  render() {
    const { classes }  = this.props;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Fab aria-label="primary" className={classes.closeIcon} onClick={this.handleCloseWindow}>
          <Icon>X</Icon>
        </Fab>
        <div className={customStyle.container} data-tid="container">
          <span className={classes.inline}>
            <img src={logo} className={"App-Logo", classes.hcLogo} alt="logo" />
          </span>

          <h2 className={classes.header1}>Your Device Bundles</h2>
          <h3 className={classes.header2}>Please store these items safely in a secure envionrment.</h3>

        <Grid item xs={12}  elevation={1}>
          <Link to={this.state.pinSet ? routes.COREAPPS : routes.DEVICEPIN }>
            <Fab onClick={this.handlePinSet} color="primary" variant="extended" aria-label="next" className={classes.nextBtn}>
            {this.state.pinSet ? 'Install Core Apps': 'Create Device PIN' }
            </Fab>
          </Link>
        </Grid>

        <Grid item xs={6} className={classnames(classes.passRoot)}  elevation={1}>
          <Divider variant="middle" />
          {this.state.bundles.map(bundle => (
            <DeviceBundleBox
              key={bundle.id}
              name={bundle.name}
              bundle={bundle.bundle}
            />
          ))}
        </Grid>

        <Grid item xs={4} className={classnames(classes.passRoot, classes.instructions)}  elevation={1}>
          <div className={classes.sectionInstructions}>
            <Grid container alignItems="center">
              <Divider variant="middle" />
              <Grid item>
              {this.state.pinSet ?
                <div>
                  <Typography className={classes.whiteText}>
                     STEPS FOR HOW TO SAFELY STORE A DEVICE BUNDLE
                  </Typography>
                  <img src="assets/icons/bundle-keys-icon.png" alt="Device Bundle Icon" className={classes.iconImg}/>
                </div>
                :
                <div>
                <br/>
                  <Typography className={classes.whiteText}>
                      1.) INFORMATION ABOUT SETTING A DEVICE PIN
                  </Typography>
                  <Typography className={classes.whiteText}>
                      2.) STEPS FOR HOW TO SAFELY STORE A DEVICE BUNDLE
                  </Typography>
                  <img src="assets/icons/bundle-keys-icon.png" alt="Device Bundle Icon" className={classes.iconImg}/>
                </div>
               }

              </Grid>
            </Grid>
          </div>
        </Grid>
        </div>
      </Grid>
    );
  }
};

export default withStyles(styles)(DeviceBundles);
