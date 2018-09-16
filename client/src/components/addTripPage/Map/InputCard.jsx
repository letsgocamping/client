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
    maxWidth: '100%'
  },
  media: {
    objectFit: 'cover',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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

  render() {

    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
            Member City
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <TextField
            id="City"
            label="City"
            className={classes.textField}
            value={this.state.name}
            onChange={(e)=>{ this.props.handleCardInput(e); }}
            margin="normal"
          />
          <Button size="large" color="primary" className={classes.button} >
      Submit
          </Button>
        </CardActions>
      </Card>
    );
  }
}
  
  
InputCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
    
export default withStyles(styles)(InputCard);