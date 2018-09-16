import React from 'react';
import Map from './Map.jsx';
import ParksList from './ParksList.jsx';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import InputCard from './InputCard.jsx';
import { api_key, api_url } from '../../../../../config.js';
import { Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import { Redirect } from 'react-router-dom';


const style = theme => ({
  main: {
    display: 'grid',
    height: '100vh',
    gridTemplateColumns: '1fr 1fr'
  },
  button: {
    margin: '0 auto'
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #4054B2',
    height: '100%'
  }

});


class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      centerLat: 37.697948,
      centerLng: -97.314835,
      lng: -97.314835,
      lat: 37.697948,
      tab: 0,
      key: api_key,
      cards: [{ number: 0, city: null, state: null }],
      cardNumber: 1,
      cities: [],
      parks: {},
      parksParse: [],
      searched: false,
      renderDialog: false,
      redirectToPreviousSearches: false
    };
  }

  TabContainer(props) {
    return (
      <Typography component="div" style={{
        padding: 8 * 3
      }}>
        {props.children}
      </Typography>
    );
  }

  
  handleTabChange = (event, value) => {
    this.setState({ tab: value });
  };

  componentWillMount() {
    axios(
      {
        method: 'GET',
        url: `${api_url}/api/googlemaps`,
      })
      .then(reply => {
        const apiKey = reply.data.key;
        this.setState({
          key: apiKey
        });
      });
  }

  handleEnter = (e) => {
    this.setState({
      lat: e.target.value
    });
  }

  tabSelect = () => {
    if (this.state.tab === 0) {
      return <Map coordinates={{ lng: this.state.lng, lat: this.state.lat, centerLat: this.state.centerLat, centerLng: this.state.centerLng }} 
        apiKey={this.state.key} 
        users={this.state.cities} 
        searched={this.state.searched}
        parks={this.state.parksParse}/>;      
    } else {
      if (this.state.parks) {
        return <ParksList parks={this.state.parks.data} />;
      } else {
        return <Typography style={{ margin: '20px'}}>Enter at least two cities and we'll show you a list of parks!</Typography>;
      }
    }
  }

  addCard = () => {
    this.setState({
      cardNumber: this.state.cardNumber + 1,
      cards: this.state.cards.concat([{number: this.state.cardNumber, city: null}]),
    });
  }


  submitCities = () => {
    let result = [];
    this.state.cards.forEach(card=>{
      result.push([card.city, card.state]);
    });

    console.log(result);
    axios(
      {method: 'POST',
        url: `${api_url}/api/midpoint`,
        data: {
          'cities': result
        }
      })
      .then((reply) =>{
        let parksParse = JSON.parse(reply.data.parks);
        let parksCoords = parksParse.data.map(park =>{
          let split = park.latLong.split(',');
          let lat = split[0].slice(split[0].indexOf(':') + 1, split[0].length - 1);
          let lng = split[1].slice(split[1].indexOf(':') + 1, split[1].length - 1);
          return [Number(lat), Number(lng)];
        });

        this.setState({
          lat: reply.data.lat,
          centerlat: reply.data.lat,
          centerlng: reply.data.lon,
          lng: reply.data.lon,
          parks: JSON.parse(reply.data.parks),
          parksParse: parksCoords,
          cities: reply.data.cities,
          searched: true
        });
      })
      .catch((err) => console.error(err));
  }

  saveTrip = () => {
    let result = [];
    this.state.cards.forEach(card => {
      result.push([`${card.city}, ${card.state}`]);
    });

    axios(
      {
        method: 'POST',
        url: `${api_url}/api/account`,
        data: {
          'email': this.props.email,
          'cities': result,
          'parks': this.state.parks.data
        }
      })
      .then((res) => {
        this.setState({
          renderDialog: true
        });
        console.log(res);
      })
      .catch((err) => console.error(err));
  }

  handleCardCityInput = (e, number) => {
    let oldState = this.state.cards;
    oldState[number].city = e.target.value;
    this.setState({
      cards: oldState
    });
  }

  handleCardStateInput = (e, number) => {
    let oldState = this.state.cards;
    oldState[number].state = e.target.value;
    this.setState({
      cards: oldState
    });
  }

  render() {
    const { classes, coordinates } = this.props;
    const { value } = this.state;

    if (this.state.renderDialog) {
      return (
        <Dialog
          open={true}
          onClose={() => {
            this.setState({
              renderDialog: false
            });
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Your search was successfully saved!'}</DialogTitle>
          <DialogActions>
          <Button onClick={() => {
              this.setState({
                renderDialog: false,
                redirectToPreviousSearches: true
              })
            }} color="primary" autoFocus>
          GO TO PREVIOUS SEARCHES
            </Button>
            <Button onClick={() => {
              this.setState({
                renderDialog: false
              })
            }} color="primary" autoFocus>
          OKAY
            </Button>
          </DialogActions>
        </Dialog>
      );
    }

    if (this.state.redirectToPreviousSearches) {
      return (
        <Redirect to={{ pathname: '/triplist'}} />
      );
    }

    return (
      <div className={classes.main}>
        <div style={{ gridRow: 2 / 3, gridColumn: 1 / 2, backgroundColor: 'lightgray' }}>
          {this.state.cards.map(card =>{
            return <InputCard key={card.number} number={card.number} handleCardCityInput={this.handleCardCityInput} handleCardStateInput={this.handleCardStateInput} submitCity={this.submitCity}/>;
          })}
          <div style={{ display: 'flex' }}>
            <Button onClick={() => { this.addCard(); }} variant="contained" color="primary" aria-label="Add" className={classes.button}>
              Add City
            </Button>
            <Button
              onClick={() => this.submitCities()}
              variant="contained"
              size="large"
              color="primary"
              className={classes.button} >
              Search For Parks
            </Button>
            <Button
              onClick={() => this.saveTrip()}
              variant="contained"
              size="large"
              color="primary"
              className={classes.button} >
              Save Search
            </Button>
          </div>
        </div>
        <div className='map-container'>
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleTabChange}>
                <Tab label="Map" />
                <Tab label="List" />
              </Tabs>
            </AppBar>
            {value === 0 && <TabContainer>Map</TabContainer>}
            {value === 1 && <TabContainer>List</TabContainer>}
            {this.tabSelect()}
          </div>
          
        </div>
      </div>
    );
  }
}

export default withStyles(style)(Container);
