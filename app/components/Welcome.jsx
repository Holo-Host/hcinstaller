import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// MUI Imports:
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// local imports:
import routes from '../constants/routes';
import logo from '../assets/holo-logo.svg'
import styles from './Welcome.css';

type WelcomeProps = {
  fetch_state: () => void,
}

export default class Welcome extends React.Component<WelcomeProps, {}>{
  constructor(props:WelcomeProps){
    super(props);
  };
  render() {
    return (
      <div className={styles.container} data-tid="container">
        <img src={logo} className="App-Logo" alt="logo" />
        <h2>Welcome to Holochain</h2>

        <br/>
        <Link to={routes.INSTALLATION}>
          <button>Go to Installation</button>
        </Link>
      </div>
    )
  }
}
/////////////////////////


// const styles = theme => ({
//   root: {
//     width: '100%',
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     fontWeight: theme.typography.fontWeightRegular,
//   },
// });
//
// function SimpleExpansionPanel(props) {
//   const { classes } = props;
//   return (
//     <div className={classes.root}>
//       <ExpansionPanel>
//         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography className={classes.heading}>Expansion Panel 1</Typography>
//         </ExpansionPanelSummary>
//         <ExpansionPanelDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
//             sit amet blandit leo lobortis eget.
//           </Typography>
//         </ExpansionPanelDetails>
//       </ExpansionPanel>
//       <ExpansionPanel>
//         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography className={classes.heading}>Expansion Panel 2</Typography>
//         </ExpansionPanelSummary>
//         <ExpansionPanelDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
//             sit amet blandit leo lobortis eget.
//           </Typography>
//         </ExpansionPanelDetails>
//       </ExpansionPanel>
//       <ExpansionPanel disabled>
//         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography className={classes.heading}>Disabled Expansion Panel</Typography>
//         </ExpansionPanelSummary>
//       </ExpansionPanel>
//     </div>
//   );
// }
//
// SimpleExpansionPanel.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
//
// export default withStyles(styles)(SimpleExpansionPanel);
