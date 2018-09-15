import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddTripPage from './addTripPage/AddTripPage.jsx';
import Splash from './Splash.jsx';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  app: {
    display: 'table',
    height: '100vh',
    margin: '0 auto'
  }
});
class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.app}>
        <Route path="/add-trip" component={AddTripPage} />
        <Route path="/" component={Splash} />
      </div>

    );
  }
}

export default withStyles(styles)(App);
