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
      redirectToDecisions: false,
      trips: []
    };
  }

  // componentDidMount() {
  //   if (this.state.email.length > 0) {
  //     this.submitForm(this.state.email);
  //   }
  // }

 

  handleHomeClick = () => {
    this.setState({
      email: '',
      redirectToAddTrip: false,
      redirectToDecisions: false,
      trips: []
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
            redirectToAddTrip: true,
          });
        } else {
          this.setState({
            redirectToDecisions: true,
            trips: res.data
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
        <Route exact path="/triplist" render={props => {
          return <TripList 
            router={props}
            trips={this.state.trips}
            submitForm={this.submitForm}
            email={this.state.email}
          />;
        }} />
        <Route exact path="/add-trip" render={props => {
          return <AddTripPage 
            router={props}
            handleHomeClick={this.handleHomeClick}
          />;
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
