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
  }
});

// THE BELOW SHOULD be be REPLACED by an API call and respnose with the DPKI
const bundles = [
  {
    name: "Bundle 1",
    id: "1",
    bundle: {
      type: "Device Seed",
      hint: "ZoElJettTech",
      data: "My Key Pair, Nonce, and other meta data..."
    }
  },
  {
    name: "Bundle 2",
    id: "2",
    bundle: {
      type: "Device Seed",
      hint: "APPLICATION HINT",
      data: "My Key Pair, Nonce, and other meta data..."
    }
  },
  {
    name: "Bundle 3",
    id: "3",
    bundle: {
      type: "Device Seed",
      hint: "My Special Hint",
      data: "My Key Pair, Nonce, and other meta data..."
    }
  },
  {
    name: "Bundle 4",
    id: "4",
    bundle: {
      type: "Device Seed",
      hint: "My Special Hint",
      data: "My Key Pair, Nonce, and other meta data..."
    }
  },
  {
    name: "Bundle 5",
    id: "5",
    bundle: {
      type: "Device Seed",
      hint: "My Special Hint",
      data: "My Key Pair, Nonce, and other meta data..."
    }
  }
]


type deviceBundleProps = {
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
      pinSet: false
  	};
  };

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

          <Grid item xs={12} className={classes.iconSection}>
           <Grid container justify="center" spacing={16} className={classes.bundlePanel}>
            {this.state.pinSet ?
              <Typography>
                 STEPS FOR HOW TO SAFELY STORE A DEVICE BUNDLE
              </Typography>
              :
              <div>
                <Typography>
                    1.) INFORMATION ABOUT SETTING A DEVICE PIN
                </Typography>
                <Typography>
                    2.) STEPS FOR HOW TO SAFELY STORE A DEVICE BUNDLE
                </Typography>

                <br/>
                <div>
                  <Link to={routes.DEVICEPIN}>
                     <Button size="small" variant="outlined" color="primary">
                        Set Device Pin
                     </Button>
                  </Link>
                 </div>
              </div>
            }

             <br/>

             {this.state.bundles.map(item => (
               <DeviceBundleBox
                 key={item.key}
                 name={item.name}
                 bundle={item.bundle}
               />
             ))}
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  }
};

export default withStyles(styles)(DeviceBundles);
