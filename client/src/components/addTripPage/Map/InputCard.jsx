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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Menu } from '@material-ui/core';

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
      name: null,
      state: ''
    };
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
          <Select
            margin="normal"
            value={this.state.state}
            onChange={(e) => { 
              this.setState({
                state: e.target.value
              });
              this.props.handleCardStateInput(e, this.props.number); 
            }}
          >
            <MenuItem value="AL">AL</MenuItem>
            <MenuItem value="AK">AK</MenuItem>
            <MenuItem value="AR">AR</MenuItem>	
            <MenuItem value="AZ">AZ</MenuItem>
            <MenuItem value="CA">CA</MenuItem>
            <MenuItem value="CO">CO</MenuItem>
            <MenuItem value="CT">CT</MenuItem>
            <MenuItem value="DC">DC</MenuItem>
            <MenuItem value="DE">DE</MenuItem>
            <MenuItem value="FL">FL</MenuItem>
            <MenuItem value="GA">GA</MenuItem>
            <MenuItem value="HI">HI</MenuItem>
            <MenuItem value="IA">IA</MenuItem>	
            <MenuItem value="ID">ID</MenuItem>
            <MenuItem value="IL">IL</MenuItem>
            <MenuItem value="IN">IN</MenuItem>
            <MenuItem value="KS">KS</MenuItem>
            <MenuItem value="KY">KY</MenuItem>
            <MenuItem value="LA">LA</MenuItem>
            <MenuItem value="MA">MA</MenuItem>
            <MenuItem value="MD">MD</MenuItem>
            <MenuItem value="ME">ME</MenuItem>
            <MenuItem value="MI">MI</MenuItem>
            <MenuItem value="MN">MN</MenuItem>
            <MenuItem value="MO">MO</MenuItem>	
            <MenuItem value="MS">MS</MenuItem>
            <MenuItem value="MT">MT</MenuItem>
            <MenuItem value="NC">NC</MenuItem>	
            <MenuItem value="NE">NE</MenuItem>
            <MenuItem value="NH">NH</MenuItem>
            <MenuItem value="NJ">NJ</MenuItem>
            <MenuItem value="NM">NM</MenuItem>			
            <MenuItem value="NV">NV</MenuItem>
            <MenuItem value="NY">NY</MenuItem>
            <MenuItem value="ND">ND</MenuItem>
            <MenuItem value="OH">OH</MenuItem>
            <MenuItem value="OK">OK</MenuItem>
            <MenuItem value="OR">OR</MenuItem>
            <MenuItem value="PA">PA</MenuItem>
            <MenuItem value="RI">RI</MenuItem>
            <MenuItem value="SC">SC</MenuItem>
            <MenuItem value="SD">SD</MenuItem>
            <MenuItem value="TN">TN</MenuItem>
            <MenuItem value="TX">TX</MenuItem>
            <MenuItem value="UT">UT</MenuItem>
            <MenuItem value="VT">VT</MenuItem>
            <MenuItem value="VA">VA</MenuItem>
            <MenuItem value="WA">WA</MenuItem>
            <MenuItem value="WI">WI</MenuItem>	
            <MenuItem value="WV">WV</MenuItem>
            <MenuItem value="WY">WY</MenuItem>
          </Select>
        </CardActions>
      </Card>
    );
  }
}
  
  
InputCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
    
export default withStyles(styles)(InputCard);