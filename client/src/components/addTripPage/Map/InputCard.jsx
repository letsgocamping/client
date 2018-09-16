import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    maxWidth: '90%',
    margin: '10px auto'
  },
  media: {
    objectFit: 'cover',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 0,
    width: '80%',
  },
  button: {
    marginLeft: '20px'
  }
});

class InputCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null
    };
  }

  componentDidMount() {
    console.log('NEW CARD', this.props.number);
  }

  render() {

    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Friend #{this.props.number}
          </Typography>
        </CardContent>
        <CardActions>
          <TextField
            id="City"
            label="City"
            className={classes.textField}
            onChange={(e)=>{ this.props.handleCardCityInput(e, this.props.number); }}
            margin="normal"
          />
          <TextField
            id="State"
            label="State"
            className={classes.textField}
            onChange={(e) => { this.props.handleCardStateInput(e, this.props.number); }}
            margin="normal"
          />
         
        </CardActions>
      </Card>
    );
  }
}
  
  
InputCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
    
export default withStyles(styles)(InputCard);