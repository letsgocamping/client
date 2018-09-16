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


const style = theme => ({
  main: {
    display: 'grid',
    height: '100vh',
    gridTemplateColumns: '1fr 1fr',
  },
  button: {
    margin: theme.spacing.unit,
    marginRight: '200px'
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }

});


class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -97.314835,
      lat: 37.697948,
      tab: 0,
      key: api_key,
      cards: [{ number: 0, city: null, state: null }],
      cardNumber: 0,
      cities: [],
      parks: {}
    };
    this.tabSelect = this.tabSelect.bind(this);
    this.handleCardCityInput = this.handleCardCityInput.bind(this);
    this.handleCardStateInput = this.handleCardStateInput.bind(this);
    this.submitCities = this.submitCities.bind(this);
  }

  componentDidMount() {
    this.getParks();
  }

  getParks = () => {
    axios.post(`${api_url}/api/midpoint`, {
      cities: this.state.cities
    })
      .then((res) => {
        this.setState({ parks: JSON.parse(res.data.parks) });
      });
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
        url: 'http://localhost:1337/api/googlemaps',
      })
      .then(reply => {
        const apiKey = reply.data.key;
        this.setState({
          key: apiKey
        });
      });
  }

  handleEnter(e) {
    this.setState({
      lat: e.target.value
    });
  }

  tabSelect() {
    if (this.state.tab === 0) {
      return <Map coordinates={{ lng: this.state.lng, lat: this.state.lat }} apiKey={this.state.key} />;      
    } else {
      return <ParksList parks={this.state.parks.data}/>;
    }
  }

  addCard() {
    this.setState({
      cardNumber: this.state.cardNumber + 1,
      cards: this.state.cards.concat([{number: this.state.cardNumber, city: null}]),
    }, ()=>{ console.log('Cards:', this.state.cards, this.state.cardNumber); });
  }


  submitCities() {
    console.log('SUBMITCITIES');
    let result = [];
    this.state.cards.forEach(card=>{
      result.push([card.city, card.state]);
    });

    axios(
      {method: 'POST',
        url: `${api_url}/api/midpoint`,
        data: {
          'cities': result
        }
      })
      .then((reply) =>{
        console.log('RESPLY', reply);
        this.setState({
          lat: reply.data.lat,
          lng: reply.data.lon
        },
        ()=> { console.log('NEWMIDPOINTSTATE:', this.state.lat, this.state.lng); });
      });
  }

  handleCardCityInput(e, number) {
    let oldState = this.state.cards;
    oldState[number].city = e.target.value;
    console.log('OLD STATE', oldState);
    this.setState({
      cards: oldState,
    }, ()=>{ console.log('Newstate', this.state.cards); });
  }

  handleCardStateInput(e, number) {
    let oldState = this.state.cards;
    oldState[number].state = e.target.value;
    console.log('OLD STATE', oldState);
    this.setState({
      cards: oldState,
    }, ()=>{ console.log('Newstate', this.state.cards); });
  }

  render() {
    const { classes, coordinates } = this.props;
    const { value } = this.state;


    return (
      <div className={classes.main}>
        <div style={{ gridRow: 2 / 3, gridColumn: 1 / 2 }}>
          {this.state.cards.map(card =>{
            return <InputCard key={card.number} number={this.state.cardNumber} handleCardCityInput={this.handleCardCityInput} handleCardStateInput={this.handleCardStateInput} submitCity={this.submitCity}/>;
          })}
          <Button onClick={()=> { this.addCard(); }} variant="fab" color="primary" aria-label="Add" className={classes.button}>
            <AddIcon />
          </Button>
          <Button
            onClick={() => this.submitCities()}
            size="large"
            color="primary"
            className={classes.button} >
            Submit
          </Button>
        </div>
        <div className='map-container'>
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleTabChange}>
                <Tab label="Map" />
                <Tab label="List" />
              </Tabs>
            </AppBar>
            {value === 0 && <TabContainer></TabContainer>}
            {value === 1 && <TabContainer>List</TabContainer>}
            {this.tabSelect()}
          </div>
          
        </div>
      </div>
    );
  }
}

export default withStyles(style)(Container);