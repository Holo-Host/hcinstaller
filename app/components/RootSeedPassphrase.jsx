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
import routes from '../constants/routes';
// import handleCloseWindow from '../utils/helper-functions';
import logo from '../assets/icons/HC-logo.svg';
import customStyle from './Welcome.css';

// // MUI Custom Styling :
import { styles } from "./componentImports/ImportsRootSeedPassphrase";
// import importFn from "./componentImports/ImportsRootSeedPassphrase";
// importfn();

// typing :
type WelcomeNewUserProps = {
  fetch_state: () => void,
}

type WelcomeNewUserState = {
  expanded: boolean,
  HCmodalOpen: boolean,
  installationNotice: boolean,
  passwordNumber: array,
  showPassword: boolean,
  message: string,
  passwordSuccess: boolean,
  affirm: boolean
}

function ModalTransition(props) {
  return <Slide direction="down" {...props} />;
}

class RootSeedPassphrase extends React.Component<RootSeedPassphraseProps, RootSeedPassphraseState>{
  constructor(props:WelcomeProps){
    super(props);
    this.state = {
      expanded: false,
      HCmodalOpen: false,
      installationNotice: false,
      passwordNumber: [],
      showPassword: false,
      message: "",
      passwordSuccess: true, // TODO: CHANGE BACK TO 'false'
      affirm: false
    };
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
    this.sendFormData = this.sendFormData.bind(this);
    this.PassphraseRef = React.createRef();
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
    const newPwLength = this.state.passwordNumber;
    newPwLength.push("x");
    this.setState({passwordNumber: newPwLength })
    const key = event.target.value
    console.log("This should be the password that was passed in...", key);
  };

   handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  sendFormData() {
    console.log("inside sendFormData...");
    console.log("PASS REF", this.PassphraseRef.current.focus());

    const SubmittedPassData = {
      passphrase: this.refs.Passphrase.value
    };
    console.log(SubmittedPassData);

    if(SubmittedPassData.length > 8 ) {
      console.log("passed length test...");
      // TODO : Make API call out to the container to send PASSWORD.
    }
    else {
      alert("Hey there. It looks like your passphrase doesn't meet the minimum security requirements. Please review the requirements and reenter your passphrase.")
    }
    setTimeout(() => {
      this.setState({
        message: "Password created!",
        passwordNumber: [],
        passwordSuccess: true
      });
    }, 3000);
  }

  handleSubmitPassword = event => {
    event.preventDefault();
    this.setState({ message: "Verifying Passphrase..." });
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
          <h2 className={classes.header1}>Let's talk Cryptography</h2>
          <h3 className={classes.header2}>Please type in a passphrase below in order to generate a Root Seed for this device. </h3>

          <Grid item xs={6} className={classnames(classes.passRoot, classes.instructions)}  elevation={1}>
            <div className={classes.sectionInstructions}>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography gutterBottom variant="h4" className={classes.whiteText}>
                What is a Root Seed?
              </Typography>
              </Grid>
              <Divider variant="middle" />
            <Grid item>
            <Typography gutterBottom variant="h6" className={classes.whiteText}>
               Description about the Root Seed and how to store it go here...
            </Typography>
            </Grid>
            </Grid>
            <Typography color="textSecondary" className={classes.whiteText}>
              The Root Seed is the core of your idenity within Holochain.  It facilities the creation and control of your identity on your device and device applications.
            </Typography>
          </div>
          <Divider variant="middle" className={classes.whiteText} />
          <img src="assets/icons/fingerprint-security.png" alt="fingerprint image" className={classes.iconImg}/>
          </Grid>

          <Grid item xs={6} className={classes.passRoot}  elevation={1}>
            <div className={classes.sectionInstructions}>
             <Grid container alignItems="center" id="passphrase-container">
               <Grid item xs>
                 <Typography gutterBottom variant="h4">
                   Set Your Passphrase
                 </Typography>
               </Grid>
               <Grid item>
                 <Typography gutterBottom variant="h6">
                    INSTRUCTIONS FOR SETTING A PASSPHRASE
                 </Typography>
               </Grid>
             </Grid>
             <Typography color="textSecondary">
               INFO HERE...
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
          <Divider variant="middle" />

          {this.state.passwordSuccess ?
            <Grid item xs={12} elevation={1}>
              <div className={classes.modal} className={classes.root}  >
                <Fab variant="extended" aria-label="next" className={classes.nextBtn} onClick={this.handleInstallationNoticeOpen}>
                   Discover Root Seed
                </Fab>
               <Dialog
                  fullScreen={fullScreen}
                  open={this.state.installationNotice}
                  onClose={this.handleInstallationNoticeClose}
                  aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">{"Let's get prepared.."}</DialogTitle>
                  <DialogContent>
                      <DialogContentText>
                      You are about to receive your Root Seed Bundle (and mnemonics?...).
                      <br/>
                        1.Prepare user to receive this sensitive info.
                        <br/>
                        2.Describe/reiterate importance of Root Seed.
                      </DialogContentText>
                  </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleInstallationNoticeClose} color="primary">
                      Close
                    </Button>
                    <Link to={routes.ROOTSEED}>
                      <Button onClick={this.handleInstallationNoticeCloseAffirm} color="primary" autoFocus>
                        Ready for my Root Seed
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

RootSeedPassphrase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RootSeedPassphrase);
