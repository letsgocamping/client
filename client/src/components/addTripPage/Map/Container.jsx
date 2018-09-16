import React from 'react';
import Map from './Map.jsx';
import SearchBox from './SearchBox.jsx';
import ParksList from './ParksList.jsx';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
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
      searched: false,
      parks: {
        'total': 3,
        'data': [
          {
            'states': 'TX',
            'latLong': 'lat:29.29817767, long:-103.2297897',
            'description': 'There is a place in Far West Texas where night skies are dark as coal and rivers carve temple-like canyons in ancient limestone. Here, at the end of the road, hundreds of bird species take refuge in a solitary mountain range surrounded by weather-beaten desert. Tenacious cactus bloom in sublime southwestern sun, and diversity of species is the best in the country. This magical place is Big Bend...',
            'designation': 'National Park',
            'parkCode': 'bibe',
            'id': 'C9056F71-7162-4208-8AE9-2D0AEFA594FD',
            'directionsInfo': 'Hwy 118 south from Alpine; Hwy 385 south from Marathon; FM 170 from Presidio through Study Butte.',
            'directionsUrl': 'http://www.nps.gov/bibe/planyourvisit/directions.htm',
            'fullName': 'Big Bend National Park',
            'url': 'https://www.nps.gov/bibe/index.htm',
            'weatherInfo': 'Variable\n-- February through April often pleasant and comfortable temperatures.\n-- May through August is hot and can be stormy. Temperatures regularly reach well over 100 degrees in the lower elevations and along the river.\n-- September through January temperatures are cooler; the weather can turn cold any time during these months.',
            'name': 'Big Bend'
          },
          {
            'states': 'TX',
            'latLong': 'lat:31.92304462, long:-104.885527',
            'description': 'Guadalupe Mountains National Park protects the world\'s most extensive Permian fossil reef, the four highest peaks in Texas, an environmentally diverse collection of flora and fauna, and the stories of lives shaped through conflict, cooperation and survival. Come experience mountains and canyons, desert and dunes, night skies and spectacular vistas within a place unlike any other within the NPS.',
            'designation': 'National Park',
            'parkCode': 'gumo',
            'id': '6510001B-685D-4688-A963-4ECE7AB609DB',
            'directionsInfo': 'Guadalupe Mountains National Park is located on the north side of US Hwy 62/180. \nIf you are traveling east from El Paso, TX, we are 110 miles East of the city. Follow US Hwy 62/180 North to the Pine Springs Visitor Center. \nIf you are traveling from Van Horn, TX, you will travel north on US 54 and make a left hand turn at the junction of US 62/180 to arrive at the park.\nIf you are traveling west from Carlsbad, NM, you will travel on US Hwy 62/180 South and cross into Texas. Follow signs to the park.',
            'directionsUrl': 'http://www.nps.gov/gumo/planyourvisit/directions.htm',
            'fullName': 'Guadalupe Mountains National Park',
            'url': 'https://www.nps.gov/gumo/index.htm',
            'weatherInfo': 'Weather in the Guadalupe Mountains can change in an instant. In the Spring and Summer, average temperatures vary with highs between 70F-80F+ with evening lows in the 40F-60F range. The Fall and Winter bring milder temperatures with highs in between 50F-60F with evening lows in the 30F-50F range.',
            'name': 'Guadalupe Mountains'
          },
          {
            'states': 'TX',
            'latLong': 'lat:31.60465887, long:-97.17606143',
            'description': 'On July 10, 2015, President Barack Obama issued a Presidential Proclamation making the Waco Mammoth Site a new unit of the National Park System. This paleontological site represents the nation’s only recorded discovery of a nursery herd of Columbian mammoths. Visitors can view "in situ" fossils including female mammoths, a bull mammoth, and a camel that lived approximately 67,000 years ago.',
            'designation': 'National Monument',
            'parkCode': 'waco',
            'id': '46CA5FAF-2AEE-4795-B609-8CB81F9FBBEC',
            'directionsInfo': 'From I-35 North, take exit 339 and head west on Lake Shore Drive. Turn right on Steinbeck Bend Drive and travel 1.5 miles to the Monument.\n\nFrom I-35 South, take exit 335C and head northwest on Martin Luther King, Jr. Boulevard. Continue straight onto Steinbeck Bend Drive and travel 1.5 miles to the Monument.\n\nThe Monument is easily accessible via personal vehicle, bus, or motor home.',
            'directionsUrl': 'http://www.nps.gov/waco/planyourvisit/directions.htm',
            'fullName': 'Waco Mammoth National Monument',
            'url': 'https://www.nps.gov/waco/index.htm',
            'weatherInfo': 'Overall, the monume enjoys a sunny, mild climate during three seasons of the year.\n\nSpring: Temperatures range from 45 F to 85 F (7 C/29 C). Rain is common in April and May.\n\nSummer: Temperatures range from 70 F to 95 F (21 C/35 C). Temperatures can exceed 100 F (38 C) in July and August. Lightweight clothing and sunscreen are advisable. Be prepared with plenty of water.\n\nFall: Temperatures range from 45 F to 85 F (7 C/29 C).\n\nWinter: Temperatures range from 35 F to 65 F (2 C/18 C) . Snow and ice are rare.',
            'name': 'Waco Mammoth'
          }
        ],
        'limit': 50,
        'start': 1
      }
    };
    this.tabSelect = this.tabSelect.bind(this);
    this.handleCardCityInput = this.handleCardCityInput.bind(this);
    this.handleCardStateInput = this.handleCardStateInput.bind(this);
    this.submitCities = this.submitCities.bind(this);
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
      return <Map coordinates={{ lng: this.state.lng, lat: this.state.lat }} apiKey={this.state.key} users={this.state.cities} searched={this.state.searched}/>;      
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
          lng: reply.data.lon,
          cities: reply.data.cities,
          searched: true,
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