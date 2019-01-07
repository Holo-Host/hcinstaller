import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
// MUI Imports:
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
// local imports:
import routes from '../constants/routes';
import logo from '../assets/icons/HC-logo.svg';
import customStyle from './Welcome.css';

// MUI Custom Styling :
const styles = theme => ({
  root: {
    marginTop: '3%',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: 140,
    width: 100,
  },
  header: {
    // Add main header styling here...
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  typography: {
    fontFamily: 'Raleway',
    fontWeight: theme.typography.fontWeightRegular,
  },
  buttonBackground: {
    marginTop:20,
    position: 'relative',
    margin: 10,
    width: 10,
    height: 50,
    border: '4px solid #21acba',
    '&:hover, &$focusVisible': {
      zIndex: 1,
      border: '4px solid #6600ff',
      color: "#21acba",
      '& $buttonBackdrop': {
        opacity: 0.1,
        backgroundColor: "#2e1c68",
        transition: theme.transitions.create('opacity'),
      },
      '& $buttonSelected': {
        opacity: 0,
      }
    },
  },
  buttonTitle: {
    fontSize: '1.5rem',
    letterSpacing: 3,
    fontFamily: 'Raleway',
    fontWeight:'lighter',
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  buttonSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  buttonBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#130738',
    opacity: 0.6,
    transition: theme.transitions.create('opacity'),
  },
  buttonSelected: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  modal: {
    margin:10
  },
  modalButton: {
    marginTop:45,
    color: '#21acba',
    border: '2px solid #10d6a9',
    '&:hover, &$focusVisible': {
      border: '3px solid #6600ff',
      background: 'rgba(0, 1, 127, 0.7)'
    },
  },
  h3: {
    fontFamily: 'Raleway',
    marginTop: -10,
    fontSize: '1.25rem',
    letterSpacing: '-0.015em',
    color: '#fff',
  },
  focusVisible: {},
  questionBlock: {
    marginTop:45,
  },
  hcLogo: {
    height: '65%',
    marginTop: '-.1%'
  }
});

// typing :
type WelcomeProps = {
  fetch_state: () => void,
}

type WelcomeState = {
  HCmodalOpen: boolean,
}

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class Welcome extends React.Component<WelcomeProps, WelcomeState>{
  constructor(props:WelcomeProps){
    super(props);
    this.state = {
      HCmodalOpen: false,
    };
  };

  handleClickHCinfoOpen = () => {
    this.setState({ HCmodalOpen: true });
  };

  handleHCinfoClose = () => {
    this.setState({ HCmodalOpen: false });
  };

  render() {
    const { classes } = this.props;
    const buttonBackgrounds = [
      {
        color: 'transparent',
        title: 'No',
        link: routes.INSTALLATION,
        width: '30%',
      },
      {
        color: 'transparent',
        title: 'Yes',
        link: routes.WELCOMENEWUSER,
        width: '30%',
      },
    ];

    return (
      <Grid id="holoMotion" container className={classes.root} spacing={16}>
        <div className={classnames('container', customStyle.container)} data-tid="container">
          <h2 className={classes.header}>Welcome to Holochain</h2>
          <img src={logo} className={classnames('app-logo', classes.hcLogo)} alt="logo" />

          <Grid item xs={12} className={classes.questionBlock}>
            <Typography className={classes.h3} component="h3">
              Is this your first time installing Holochain?
            </Typography>

            <div className={classes.control}>
              {buttonBackgrounds.map(background => (
                <Link to={background.link} key={background.title}>
                  <ButtonBase
                  focusRipple
                  className={classes.buttonBackground}
                  focusVisibleClassName={classes.focusVisible}
                  style={{
                    width: background.width,
                  }}
                  >
                    <span
                    className={classes.buttonSrc}
                    style={{
                      backgroundImage: background.color,
                    }}
                    />
                      <span className={classes.buttonBackdrop} />
                        <span className={classes.imageButton}>
                          <Typography
                          component="span"
                          variant="subtitle1"
                          color="inherit"
                          className={classes.buttonTitle}
                          >
                          {background.title}
                        <span className={classes.buttonSelected} />
                      </Typography>
                      </span>
                    </ButtonBase>
                </Link>
              ))}
            </div>
          </Grid>

          <Grid item xs={12}>
             <div className={classes.modal}>
                <Button variant="outlined" className={classnames('learn-more',classes.modalButton)} onClick={this.handleClickHCinfoOpen}>
                 Learn more about Holochain
                </Button>
                <Dialog
                  open={this.state.HCmodalOpen}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={this.handleHCinfoClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle id="alert-dialog-slide-title">
                    {"What is Holochain?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      <strong>Well, we like to call it a more human internet!</strong>
                      <br/>
                      <br/>
                      Each of us wants to have control over how and with whom we interact. In order to evolve and thrive, our communities must support everyone's uniqueness. Yet today, our online relationships are dominated by centralized corporate web sites.
                      <br/>
                      <br/>
                      Holochain enables a distributed web with user autonomy built directly into its architecture and protocols. Data is about remembering our lived and shared experiences. Distributing the storage and processing of that data can change how we coordinate and interact. With digital integration under user control, Holochain liberates our online lives from corporate control over our choices and information.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleHCinfoClose} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
          </Grid>
        </div>
      </Grid>
    )
  }
}

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Welcome);
