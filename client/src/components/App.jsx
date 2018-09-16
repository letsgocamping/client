import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddTripPage from './addTripPage/AddTripPage.jsx';
import Decisions from './Decisions.jsx';
import Splash from './Splash.jsx';
import TripList from './TripList.jsx';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { api_url } from '../../../config.js';

// const styles = theme => ({
//   app: {
//     display: 'table',
//     height: '100vh',
//     margin: '0 auto'
//   }
// });
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      redirectToAddTrip: false,
      redirectToDecisions: false
    };
  }

  handleHomeClick = () => {
    this.setState({
      email: '',
      redirectToAddTrip: false,
      redirectToDecisions: false
    });
  }

  handleChange = (e) => {
    this.setState({ email: e.target.value });
  }

  submitForm = email => {
    console.log('you submitted a form!');
    console.log(email);
    axios.get(`${api_url}/api/account/${email}`)
      .then(res => {
        console.log(res);
        if (!res.data.length) {
          this.setState({
            redirectToAddTrip: true
          });
        } else {
          this.setState({
            redirectToDecisions: true
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Route exact path="/triplist" component={TripList}/>
        <Route exact path="/add-trip" render={props => {
          return <AddTripPage 
            router={props}
            handleHomeClick={this.handleHomeClick}
          />
        }} />
        <Route exact path="/decisions" component={Decisions} />
        <Route exact path="/" render={props => {
          return <Splash 
            router={props}
            email={this.state.email}
            redirectToAddTrip={this.state.redirectToAddTrip}
            redirectToDecisions={this.state.redirectToDecisions}
            submitForm={this.submitForm}
            handleChange={this.handleChange}
          />;
        }} />
      </div>

    );
  }
}

export default App;
