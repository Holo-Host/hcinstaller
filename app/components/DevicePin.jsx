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
import routes from '../constants/routes';
// import handleCloseWindow from '../utils/helper-functions'
import logo from '../assets/icons/HC-logo.svg';
import NumberSquare from "./subcomponents/NumberSquare";
import { numbers } from "./subcomponents/NumberSquare";
import customStyle from "./Welcome.css";

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
  pinPad: {
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

type devicePinProps = {
  pin_set: boolean,
  set_pin: () => void,
  fetch_state: () => void
}

type devicePinState = {
  numbers: any,
  pinSuccess: false
}

class DevicePin extends React.Component<devicePinProps, {}> {
  constructor(props:WelcomeProps){
    super(props);
    this.state = {
      numbers,
      pinSuccess: false
    };
  };

  componenetDidMount() {
    this.setState({
      numbers: this.shufflePics(this.state.numbers)
    })
  };

  // handleInputChange = name => event => {
  //   this.setState({
  //     [name]: event.target.value,
  //   });
  // };

  shuffleNumbers = numbers => {
    let currentIndex = numbers.length - 1;
    while (currentIndex > 0){
      const randomNum = Math.floor(Math.random() * (currentIndex + 1));
      const lastIndexPlaceholder = numbers[currentIndex];
      numbers[currentIndex] = numbers[randomNum];
      numbers[randomNum] = lastIndexPlaceholder;
      currentIndex--;
    }
    return numbers;
  }

  reset = numbers => {
    const resetNumberLog = numbers.map(num => ({ ...num, clicked: false}) );
    return this.shuffleNumbers(resetNumberLog);
  }

  handleRefresh = numbers => {
    this.setState ({
      numbers: this.reset(numbers),
    })
  }

  handleItemClick = id => {
    let satisfactoryLength = false;
    // const pinpass = [];

    const numbers = this.state.numbers.map(num => {
      const newNumber = { ...num };
      if (newNumber.id === id) {
        if(!newNumber.clicked) {
          newNumber.clicked = true;
        }
        else if (newNumber.clicked) {
          const lastNumber = [penpass.length-1];
          if (lastNumber === newNumber) {
            // TODO : Create proper alter with imporved error message....
            alert("Sorry, no consecutive numbers are allowed in your pin code.")
          }
        }
        // pinpass.push(newNumber);

      }
    });
  }

  handleSubmitPin= () => {
    if(pin.length > 4 ) {
      this.setState({
        pinSuccess: true
      })
      // TODO : Make API call out to the container to send PIN.
    }
    else {
      alert("Hey there. It looks like you need to increase the length of your Pin Code. The pin code must be at least 4 numbers in total in length.")
    }
  };

  handleCloseWindow = () => {
    const { ipcRenderer } = electron;
    const quit = 'quit'
    ipcRenderer.send("window:close", quit);
  };

  render() {
    console.log("NUMBER FILE : ", this.state.numbers);

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
        <h2 className={classes.header1}>Device Pin Generation</h2>
        <h3 className={classes.header2}>Please enter in a Device Pin.  This Pin will be used alongside your Device Bundle to generate a Device Seed on each of your devices to ensure your identity within Holochain is unique and protected.</h3>

          <Grid item xs={12} className={classes.iconSection}>
             <Grid container justify="center" spacing={16}>
               <Paper className={classes.root} elevation={1}>
                 <Typography variant="h5" component="h3">
                   How to choose a PIN.
                 </Typography>
                 <Typography component="p">
                   INSTRUCTIONS FOR SETTING PIN
                 </Typography>
               </Paper>
             </Grid>
          </Grid>

          <div className={classes.pinPad}>
          {this.state.numbers.map(item => (
            <NumberSquare
            key={item.number}
            id={item.number}
            number={item.number}
            handleClick={this.handleItemClick}
            />
          ))}
          </div>

          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="outlined-password-input"
              label="Password"
              className={classes.textField}
              type="password"
              margin="normal"
              variant="outlined"
            />

            <Button variant="contained" color="primary" fullWidth handleClick={this.handleItemClick}>
               Submit Passphrase
            </Button>
          </form>
        </div>
      </Grid>
    )
  }
}

DevicePin.defaultProps = {
  pin_set: false
}

export default withStyles(styles)(DevicePin);
