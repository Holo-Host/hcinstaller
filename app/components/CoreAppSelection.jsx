import * as React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import logo from '../assets/icons/HC-logo.svg'
import styles from './Welcome.css';

type CoreAppSelectionProps = {
  fetch_state: () => void,
  update_core_apps: () => void,
  coreApps: string,
}

export default class CoreAppSelection extends React.Component<CoreAppSelectionProps, {}>{
  constructor(props:WelcomeProps){
    super(props);
  };
  render() {
    return (
      <Grid container className={classes.root} spacing={16}>
        <Fab aria-label="primary" className={classes.closeIcon} onClick={this.handleCloseWindow}>
          <Icon>X</Icon>
        </Fab>

        <div className={customStyle.container} data-tid="container">
          <h2 className={classes.header1}>Select your Core hApps</h2>
          <h3 className={classes.header2}>Let us welcome you into the community by introducing ourselves a bit more and offering you some additional resources.</h3>
          <img src={logo} className="App-Logo" alt="logo" />

          <Grid item xs={12}>
             <div className={classes.modal}>
              <div className={classes.modal}>
                <Fab variant="extended" aria-label="next" className={classes.nextBtn} onClick={this.handleInstallationNoticeOpen}>
                   Begin hApp Installation
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
        </div>
      </Grid>
    )
  }
}
