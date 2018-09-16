import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddTripPage from './addTripPage/AddTripPage.jsx';
import Decisions from './Decisions.jsx';
import Splash from './Splash.jsx';
import TripList from './TripList.jsx';

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Route exact path="/triplist" component={TripList}/>
        <Route exact path="/add-trip" component={AddTripPage} />
        <Route exact path="/decisions" component={Decisions} />
        <Route exact path="/" component={Splash} />
      </div>

    );
  }
}

export default App;
