import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// MUI Imports:
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';

// // MUI Custom Styling :
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
    borderTop: `1px solid ${theme.palette.divider}`,
    textAlign:'center',

  },
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
  viewDetails: {
    position: 'absolute',
    top: 5,
    right: 30
  }
});

// function DialogTitle ({ children, classes, onClose }) {
//    return (
//      <MuiDialogTitle disableTypography className={classes.root}>
//        <Typography variant="h6">{children}</Typography>
//        {onClose ? (
//          <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
//            <CloseIcon />
//          </IconButton>
//        ) : null}
//      </MuiDialogTitle>
//    );
//  }

class DeviceBundleBox extends React.Component {
  constructor(props:WelcomeProps){
    super(props);
    this.state = {
      bundleDialogOpen: false,
    };
  };

   handleClickOpenBundleDialog = () => {
     this.setState({
       bundleDialogOpen: true,
     });
   };

   handleClickCloseBundleDialog = () => {
     this.setState({ bundleDialogOpen: false });
   };

  render() {
    const { classes, fullScreen } = this.props;
    return (
    <div className={classes.details}>
      <ExpansionPanel>
        <ExpansionPanelSummary className="viewDetails" expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{this.props.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography component="h4">
            Date Instantiated: { this.props.intializeDate ?  this.props.intializeDate : "Not yet in use" }
          </Typography>
           <div>
            <Button className={classnames(classes.viewDetails, "viewDetails")} size="small" variant="outlined" color="primary" onClick={this.handleClickOpenBundleDialog}>
              View Details
            </Button>
            <Dialog
              onClose={this.handleClickCloseBundleDialog}
              aria-labelledby="customized-dialog-title"
              open={this.state.bundleDialogOpen}
            >
              <DialogTitle id="customized-dialog-title" className={classes.root} onClose={this.handleClickCloseBundleDialog}>
                Bundle Details
              </DialogTitle>
              <DialogContent className={classes.root}>

                <Typography component="h4" gutterBottom>
                  Type: {this.props.bundle.type}
                </Typography>
                <Typography component="h4" gutterBottom>
                  Hint: {this.props.bundle.hint}
                </Typography>
                <Typography component="h4" gutterBottom>
                  Data: {this.props.bundle.data}
                </Typography>

              </DialogContent>
              <DialogActions className={classes.root}>
                <Button onClick={this.handleClickCloseBundleDialog} color="primary">
                  Hide Details
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
    );
  }
}

DeviceBundleBox.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeviceBundleBox);
// export default withStyles(styles, { withTheme: true })(DeviceBundleBox);


// <Typography variant="subtitle1" color="textSecondary">
//   {this.props.bundle}
// </Typography>
