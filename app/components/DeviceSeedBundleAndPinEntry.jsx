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
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
import Send from '@material-ui/icons/Send';
// local imports:
// import handleCloseWindow from '../utils/helper-functions';
import routes from '../constants/routes';
import NumberSquare from "./subcomponents/NumberSquare";
import { numbers } from "./subcomponents/NumberSquare";
import logo from '../assets/icons/HC-logo.svg';
import customStyle from './Welcome.css';

// // MUI Custom Styling :
import { styles } from "./componentImports/ImportsRootSeedPassphrase";
// import importFn from "./componentImports/ImportsRootSeedPassphrase";
// importfn();

// typing :
type DevicePinProps = {
  fetch_state: () => void,
}

type DevicePinState = {
  expanded: boolean,
  HCmodalOpen: boolean,
  installationNotice: boolean,
  passwordNumber: array,
  showPassword: boolean,
  pinSuccess: boolean,
  affirm: boolean
}

function ModalTransition(props) {
  return <Slide direction="down" {...props} />;
}

class DevicePin extends React.Component<DevicePinProps, DevicePinState>{
  constructor(props:WelcomeProps){
    super(props);
    this.state = {
      expanded: false,
      HCmodalOpen: false,
      installationNotice: false,
      pinNumber: [],
      showPassword: false,
      message: "",
      pinSuccess: true, // TODO: CHANGE BACK TO 'false'
      affirm: false,
      numbers
    };
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
    this.sendFormData = this.sendFormData.bind(this);
    this.PinRef = React.createRef();
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

  handlePassInputChange = key => event => {
    // setValues({ ...values, [key]: event.target.value });
    const newPinLength = this.state.passwordNumber;
    newPinLength.push("x");
    this.setState({passwordNumber: newPinLength })

    const key = event.target.value
    console.log("This should be the PIN that was passed in...", key);
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
   };

   sendFormData() {
     console.log("inside sendFormData...");
     console.log("PASS REF", this.PinRef.current.focus());

     const SubmittedPassData = {
       passphrase: this.refs.Passphrase.value
     };
     console.log(SubmittedPassData);

     if(SubmittedPassData.length > 8 ) {
       console.log("passed length test...");
       // TODO : Make API call out to the container to send PASSWORD.
     }
     else {
       alert("Hey there. It looks like your PIN doesn't meet the minimum security requirements. Please review the requirements and reenter your PIN.")
     }
     setTimeout(() => {
       this.setState({
         message: "PIN created!",
         passwordNumber: [],
         passwordSuccess: true
       });
     }, 3000);
   }

   handleSubmitPassword = event => {
     event.preventDefault();
     this.setState({ message: "Verifying PIN..." });
     this.sendFormData();
   };
  render() {
    const { classes, fullScreen } = this.props;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Fab aria-label="primary" className={classes.closeIcon} onClick={this.handleCloseWindow}>
          <Icon>X</Icon>
        </Fab>
        <div className={customStyle.container} data-tid="container">
          <span className={classes.inline}>
            <img src={logo} className={"App-Logo", classes.hcLogo} alt="logo" />
          </span>
          <h2 className={classes.header1}>Device Seed Bundle and PIN Entry</h2>
          <h3 className={classes.header2}>Please enter in your Bundle and PIN to verify your idenity and extend your personal Holochain Envionrment onto this device. </h3>

          <Grid item xs={6} className={classes.passRoot}  elevation={1}>
            <div className={classes.sectionInstructions}>
             <Grid container alignItems="center" id="passphrase-container">
               <Grid item xs>
                 <Typography gutterBottom variant="h4">
                   Enter Your Passphrase
                 </Typography>
               </Grid>
               <Grid item>
                 <Typography gutterBottom variant="h6">

                 </Typography>
               </Grid>
             </Grid>
             <Typography color="textSecondary">

             </Typography>
            </div>

           <Divider variant="middle" />

           <div className={classes.sectionPassphrase}>
              {this.state.message}
             <form onSubmit={this.handleSubmitPassword}>
               <Typography gutterBottom variant="body1">
                 Enter Passpharase
               </Typography>
               <div>
                 <TextField
                    id="outlined-adornment-password"
                    className={classnames(classes.margin, classes.textField)}
                    variant="outlined"
                    type={this.state.showPassword ? 'text' : 'password'}
                    label="Password"
                    aria-label="Passphrase"
                    ref={this.PassphraseRef}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton aria-label="Toggle password visibility" className="viewDetails" onClick={this.handleClickShowPassword}>
                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
               </div>

               <div className={classes.sectionSubmit}>
                 <Button type="submit" variant="contained" color="primary" fullWidth>
                   Submit Passphrase
                 </Button>
               </div>
             </form>
           </div>
          </Grid>

          <Grid item xs={6} className={classes.passRoot}  elevation={1}>
            <div className={classes.sectionInstructions}>
             <Grid container alignItems="center" id="passphrase-container">
               <Grid item xs>
                 <Typography gutterBottom variant="h4">
                   Enter Your Device PIN
                 </Typography>
               </Grid>
               <Grid item>
                 <Typography gutterBottom variant="h6">

                 </Typography>
               </Grid>
             </Grid>
             <Typography color="textSecondary">

             </Typography>
           </div>

           <Divider variant="middle" />

           <div className={classes.sectionPassphrase}>
               <form onSubmit={this.handleSubmitPassword}>
                 <Typography gutterBottom variant="body1">
                   Enter PIN
                 </Typography>
                 <div>
               ///////////////////////////

                 <div className={classnames(classes.pinPad, 'viewDetails')}>
                 {this.state.numbers.map(num => (
                   <div className={classes.pinPadNumbersContainer}>
                     <NumberSquare
                       key={num.number}
                       number={num.number}
                       className="viewDetails"
                       handleClick={this.handleItemClick}
                       className={classes.pinPadNumbers}
                     />
                  </div>
                 ))}
                 </div>

               ///////////////////////////

                 <TextField
                    id="outlined-adornment-password"
                    className={classnames(classes.margin, classes.textField)}
                    variant="outlined"
                    type={this.state.showPassword ? 'text' : 'password'}
                    label="PIN"
                    aria-label="PIN"
                    ref={this.PassphraseRef}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton aria-label="Toggle password visibility" className="viewDetails" onClick={this.handleClickShowPassword}>
                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
               </div>
               <div className={classes.sectionSubmit}>
                 <Button type="submit" variant="contained" color="primary" fullWidth>
                   Submit PIN
                 </Button>
               </div>
             </form>
           </div>
          </Grid>
          <Divider variant="middle" />

          {this.state.pinSuccess ?
            <Grid item xs={12} elevation={1}>
              <div className={classes.modal} className={classes.root}  >
                <Fab variant="extended" aria-label="next" className={classes.nextBtn} onClick={this.handleInstallationNoticeOpen}>
                    Install Core Apps
                </Fab>
               <Dialog
                  fullScreen={fullScreen}
                  open={this.state.installationNotice}
                  onClose={this.handleInstallationNoticeClose}
                  aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">{"You're almost there!"}</DialogTitle>
                  <DialogContent>
                      <DialogContentText>
                      Congrats! You have now created a PIN that will be used to access your Holochain identity whenever you initiate installation of Holochain on a new device.
                      <br/>
                      Please note that the storing of this PIN is critically related to the security and privacy of your Holochain identity.  Please do not share this with anyone.
                      <br/>
                      <br/>
                      NOTICE:
                      You are now about to receive your Root Seed Bundle.
                        1.Prepares user to receive this sensative info.
                        2.Describes/reiterates importance of Device Bundles
                      </DialogContentText>
                  </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleInstallationNoticeClose} color="primary">
                      Close
                    </Button>
                    <Link to={routes.DEVICEBUNDLES}>
                      <Button onClick={this.handleInstallationNoticeCloseAffirm} color="primary" autoFocus>
                        Ready for Device Bundles
                      </Button>
                    </Link>
                </DialogActions>
                </Dialog>
              </div>
            </Grid>
          :
            <div/>
          }

        </div>
      </Grid>
    )
  }
}

DevicePin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DevicePin);
