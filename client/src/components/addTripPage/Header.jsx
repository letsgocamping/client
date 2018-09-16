import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  background: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1529288871968-9945adb0588f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=a0aa44a088abfb97ae739701cf59f98c)',
    backgroundSize: 'cover',
    height: '28vh'
  },
  foreground: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: '28vh',
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
  link: {
    textDecoration: 'none'
  }
});

class Header extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.background}>
        <div className={classes.foreground}>
          <div className={classes.section}>
            <Link to="/" className={classes.link}>
              <Typography variant='display2' className={classes.text}>Let's Go Camping!</Typography>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Header);