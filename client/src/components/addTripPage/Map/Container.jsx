import React from 'react';
import Map from './Map.jsx';
import SearchBox from './SearchBox.jsx';
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
      key: 'AIzaSyBeT_xIj_GserJq4MuzMyjDylzYmkpiD6k',
      cards: [{}],
      cities: []
    };
    this.tabSelect = this.tabSelect.bind(this);
    this.submitCity = this.submitCity.bind(this);
    this.handleCardInput = this.handleCardInput.bind(this);
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
      return <h1>LIST</h1>;
    }
  }

  addCard() {
    this.setState({
      cards: this.state.cards.concat([{}]),
    });
  }


  submitCity() {
    this.setState({
      cities: this.state.cities.concat([this.state.name])
    });
  }

  handleCardInput(e) {
    console.log('CARDINPUT', e.target.value);
    this.setState({
      state: e.target.value,
    });
  }

  render() {
    const { classes, coordinates } = this.props;
    const { value } = this.state;


    return (
      <div className={classes.main}>
        <div style={{ gridRow: 2 / 3, gridColumn: 1 / 2 }}>
          {this.state.cards.map(card =>{
            return <InputCard number={this.state.cardNumber} handleCardInput={this.handleCardInput} submitCity={this.submitCity}/>;
          })}
          <Button onClick={()=> { this.addCard(); }} variant="fab" color="primary" aria-label="Add" className={classes.button}>
            <AddIcon />
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