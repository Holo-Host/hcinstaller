import * as React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 25,
  },
  pos: {
    marginBottom: 12,
  },
};

const numbers = [1,2,3,4,5,6,7,8,9,0];

const NumberSquare = props => (
  const { classes } = props;
  const bulletPoint = <span className={classes.bullet}>•</span>;
  return (
    <Card className={classes.card} aria-label="click-item" onClick={() => props.handleClick(props.id)}>
    <CardActions>
      <Button>
        <CardContent>
          <Typography component="h2">
            {props.number}
          </Typography>
        </CardContent>
        </Button>
      </CardActions>
    </Card>
  );
)

NumberSquare.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NumberSquare);
