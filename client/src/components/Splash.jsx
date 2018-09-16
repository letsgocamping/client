import React from 'react';
import { TextField, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { api_url } from '../../../config.js';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
  background: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1529288871968-9945adb0588f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=a0aa44a088abfb97ae739701cf59f98c)',
    backgroundSize: 'cover',
    height: '100vh'
  },
  foreground: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: '100vh',
    width: '100vw',
    display: 'table'
  },
  section: {
    textAlign: 'center',
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  text: {
    color: 'white',
    textShadow: '0 0 20px black'
  },
  textField: {
    margin: '0 auto',
    width: 200,
    color: 'white'
  },
  placeholder: {
    color: 'white'
  },
  input: {
    color: 'white'
  },
  formLabelRoot: { 
    '&$formLabelFocused': { color: 'white' },
  },
  formLabelFocused: {
    color: 'white'
  },
  underline: {
    borderBottom: '1px solid white'
  }
});

class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  // handleChange = (e) => {
  //   this.setState({ email: e.target.value });
  // }


  handleEnterPress = e => {
    if (e.key === 'Enter') {
      this.props.submitForm(this.props.email);
    }
  }

  render() {
    const { classes } = this.props;

    if (this.props.redirectToAddTrip) {
      return (<Redirect to={{ pathname: '/add-trip'}} />);
    }

    if (this.props.redirectToDecisions) {
      return (<Redirect to={{ pathname: '/decisions'}} />);
    }

    return (
      <div className={classes.background}>
        <div className={classes.foreground}>
          <div className={classes.section}>
            <Typography variant='display4' className={classes.text}>Let's Go Camping!</Typography>
            <TextField
              id="email"
              label="Email Address"
              className={classes.textField}
              value={this.props.email}
              onChange={this.props.handleChange}
              onKeyPress={this.handleEnterPress}
              margin="normal"
              InputProps={{
                className: classes.input,
                classes: {
                  underline: classes.underline
                }
              }}
              InputLabelProps={{
                className: classes.placeholder,
                FormLabelClasses: {
                  root: classes.formLabelRoot,
                  focused: classes.formLabelFocused
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Splash);