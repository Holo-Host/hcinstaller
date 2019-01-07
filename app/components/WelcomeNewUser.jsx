import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
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
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
// local imports:
import routes from '../constants/routes';
import logo from '../assets/icons/HC-logo.svg';
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
  control: {
    padding: theme.spacing.unit * 2,
  },
  card: {
  maxWidth: 400,
},
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  button: {
    margin: theme.spacing.unit,
    color: '#eee',
    backgroundColor: "#00A6AE"
  },
  input: {
    display: 'none',
  },
  iconSection: {
    flexGrow: 1,
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    width: 274,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTitle:{
    marginBottom: 25,
    color: '#061630 '
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
  nextIcon: {
    marginRight: theme.spacing.unit,
  },
  modalButton: {
    marginTop:30,
    color: '#21acba',
    border: '2px solid #10d6a9',
    '&:hover, &$focusVisible': {
      border: '3px solid #6600ff',
      background: '#3d65d6'
    },
  },
  modal: {
    marginTop: 33,
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
  }
});


// typing :
type WelcomeNewUserProps = {
  fetch_state: () => void,
}

type WelcomeNewUserState = {
  expanded: boolean,
  HCmodalOpen: boolean,
  installationNotice: boolean,
  affirm: boolean
}

function ModalTransition(props) {
  return <Slide direction="down" {...props} />;
}

class WelcomeNewUser extends React.Component<WelcomeNewUserProps, WelcomeNewUserState>{
  constructor(props:WelcomeProps){
    super(props);
    this.state = {
      expanded: false,
      HCmodalOpen: false,
      installationNotice: false,
      affirm: false
    };
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleClickHCinfoOpen = () => {
    this.setState({ HCmodalOpen: true });
  };

  handleHCinfoClose = () => {
    this.setState({ HCmodalOpen: false });
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
    console.log('this.state', this.state);
    // navegate to next page... as user has affirmed !!
    this.props.history.push(routes.INSTALLATION);
  };

  render() {
    const { classes, fullScreen } = this.props;
    const descriptionIcons = [
      {
        url: 'assets/icons/versatile.png',
        title: 'Versatile',
        description: '',
        width: '100%',
      },
      {
        url: 'assets/icons/peer-to-peer.png',
        title: 'Peer-to-Peer',
        description: '',
        width: '100%',
      },
      {
        url: 'assets/icons/check-mark-circle.png',
        title: 'Agent Centric',
        description: '',
        width: '100%',
      },
    ];

    return (
      <Grid container className={classes.root} spacing={16}>
        <div className={customStyle.container} data-tid="container">
        <span className={classes.inline}>
          <img src={logo} className={"App-Logo", classes.hcLogo} alt="logo" />
        </span>
          <h2 className={classes.header1}>We're so glad you're here!</h2>
          <h3 className={classes.header2}>Let us welcome you into the community by introducing ourselves a bit more and offering you to some additional resources.</h3>

          <Grid item xs={12} className={classes.iconSection}>
             <Grid container justify="center" spacing={16}>
               {descriptionIcons.map(icon => (
                 <Grid className={classes.icons} key={icon.title} item>
                   <Typography className={classes.iconTitle} variant="h5" component="h3">
                     {icon.title}
                   </Typography>
                   <img src={icon.url} alt={`${icon.title}-image`}/>
                   <Typography component="p">
                     {icon.description}
                   </Typography>
                 </Grid>
               ))}
             </Grid>
          </Grid>

          <Grid item xs={12}>
           <div className={classes.modal}>
              <Button variant="outlined" className={classnames('learn-more',classes.modalButton)} onClick={this.handleClickHCinfoOpen}>
               Learn more about Holochain
              </Button>
              <Dialog
                open={this.state.HCmodalOpen}
                TransitionComponent={ModalTransition}
                keepMounted
                onClose={this.handleHCinfoClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">
                  {"Find out more"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    <Card className={classes.card}>
                      <CardHeader
                        title="Take a closer look into Holochain"
                      />
                      <CardMedia
                        className={classes.media}
                        image="assets/images/distributed-hash-table_diagram.png"
                        title="Holochain"
                      />
                      <CardContent>
                        <Typography component="p">
                          With Holochain you can build and participate in scalable distributed apps with data integrity, while also owning your own data, controling your idenity, tranacting without a centralixed system, and connecting to communities of applications able to be best suited for your needs.
                        </Typography>
                      </CardContent>
                      <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton
                          className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                          })}
                          onClick={this.handleExpandClick}
                          aria-expanded={this.state.expanded}
                          aria-label="Show more"
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                      </CardActions>
                      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                          <Typography paragraph>Curious to know more?</Typography>
                          <Typography paragraph>
                            We're glad to hear it!
                          </Typography>
                          <Typography paragraph>
                          Check out the following links to learn more about how Holochain help you protect your data, regain authorship of your interactions online, and even partipate in the developer community!
                          </Typography>
                          <Button className={classes.button} href="https://holochain.org/">
                            Holochain.org
                          </Button>
                          <Button className={classes.button} href="https://holo.host/">
                            Holo
                          </Button>
                          <Button className={classes.button} href="https://developer.holochain.org/">
                            HC Developer Docs
                          </Button>
                        </CardContent>
                      </Collapse>
                    </Card>
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


          <div className={classes.modal}>
            <Fab variant="extended" aria-label="next" className={classes.fab} onClick={this.handleInstallationNoticeOpen}>
                 <Icon className={classes.nextIcon} />
                 Start Intallation
            </Fab>
             <Dialog
              fullScreen={fullScreen}
              open={this.state.installationNotice}
              onClose={this.handleInstallationNoticeClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">{"Ready to Install Holochain?"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Hold on tight. You are about to enter into installation process for Holochain!
                  <br/>
                  <br/>
                  Please keep in mind that Holochain is built with a few other software products and will require their installation prior to that of Holochain.
                  <br/>
                  <br/>
                  Don't worry, though we have your back! If any of the required software required does not yet exist on your device, we will install it for you.
                </DialogContentText>
                <br/>
                <DialogContentText>
                  All we need from you is to read over the following list of softare products, and affirm that you agree and are ready to begin their installation.
                    <br/>
                    <br/>
                    - Node (>8v : JavaScript Engine)
                    <br/>
                    - Rustup (>1.1 : Rust Toolchain Installer)
                    <br/>
                    - Cargo (>1.3 nightly build : Rust Package Manager)
                    <br/>
                    - ZeroMQ (>4v : Distributed Messaging Library )
                    <br/>
                    ... AND
                    <br/>
                    - Holochain Rust (latest version)
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleInstallationNoticeClose} color="primary">
                  Close
                </Button>
                <Link to={routes.INSTALLATION}>
                  <Button onClick={this.handleInstallationNoticeCloseAffirm} color="primary" autoFocus>
                    Let's Begin Installing!
                  </Button>
                </Link>
              </DialogActions>
            </Dialog>
           </div>
        </div>
      </Grid>
    )
  }
}

WelcomeNewUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WelcomeNewUser);
