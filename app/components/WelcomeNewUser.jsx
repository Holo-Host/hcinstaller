import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
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
  fab: {
    margin: theme.spacing.unit,
  },
  nextIcon: {
    marginRight: theme.spacing.unit,
  },
});

// typing :
type WelcomeNewUserProps = {
  fetch_state: () => void,
}

type WelcomeNewUserState = {
  expanded: boolean,
}

class WelcomeNewUser extends React.Component<WelcomeNewUserProps, WelcomeNewUserState>{
  constructor(props:WelcomeProps){
    super(props);
    state = {
      expanded: false
    };
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
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
        <img src={logo} className="App-Logo" alt="logo" />
          <h2 className={classes.header}>We're so glad you're here!</h2>
          <h3 className={classes.header}>Let us welcome you into th ecommunity with an introduction and some additional resources.</h3>

          <Grid item xs={12} className={classes.iconSection}>
             <Grid container justify="center" spacing={16}>
               {descriptionIcons.map(icon => (
                 <Grid key={icon.title} item>
                   <Paper className={classes.paper}>
                     <Typography variant="h5" component="h3">
                       {icon.title}
                     </Typography>
                     <img src={icon.url} alt={`${icon.title}-image`}/>
                     <Typography component="p">
                       {icon.description}
                     </Typography>
                   </Paper>
                 </Grid>
               ))}
             </Grid>
          </Grid>


          <Card className={classes.card}>
            <CardHeader
              title="Take a look into Holochain"
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

          <Fab variant="extended" aria-label="next" className={classes.fab}>
             <NavigationIcon className={classes.nextIcon} />
             Let's Get Started!
         </Fab>
        </div>
      </Grid>
    )
  }
}

WelcomeNewUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WelcomeNewUser);
