import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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
    textShadow: '0 0 20px black',
    marginBottom: '20px'
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
  },
  button: {
    marginBottom: '20px'
  },
  link: {
    textDecoration: 'none'
  }
});

class Decisions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.background}>
        <div className={classes.foreground}>
          <div className={classes.section}>
            <div>
              <Typography variant='display3' className={classes.text}>
              What do you want to do?
              </Typography>
            </div>
            <div>
              <Link to="/add-trip" className={classes.link}>
                <Button variant="contained" className={classes.button}>
                  ADD NEW TRIP
                </Button>
              </Link>
            </div>
            <div>
              <Button variant="contained">
                VIEW PREVIOUS TRIPS
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Decisions);