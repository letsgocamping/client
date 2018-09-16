import React from 'react';
import Map from './Map.jsx';
import SearchBox from './SearchBox.jsx';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
  main: {
    display: 'grid',
    height: '100vh',
    gridTemplateColumns: '1fr 1fr',

  }
});


class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -97.314835,
      lat: 37.697948,
      key: 'AIzaSyBJPyAgod2AwUaGFOTMb3IqmuRnckLnC_E'
    };

  }
  componentWillMount() {
    console.log('ENV VARIABLE', process.env.GOOGLEMAPS_API_KEY);
    axios(
      {
        method: 'GET',
        url: 'http://localhost:1337/api/googlemaps',
      })
      .then(reply => {
        const apiKey = reply.data.key;
        this.setState({
          key: apiKey
        }, () => console.log('NEW KEY STATE', this.state.key));
      });
  }

  handleEnter(e) {
    this.setState({
      lat: e.target.value
    });
  }
  render() {
    const { classes, coordinates } = this.props;
    return (
      <div className={classes.main}>
        <div style={{ gridRow: 2 / 3, gridColumn: 1 / 2 }}>
          <input value={this.state.lat }onChange={(e)=>{ this.handleEnter(e); }} />
        </div>
        {/* <SearchBox /> */}
        <div className='map-container' style={{float: 'right'}}>
          <Map coordinates={{lng: this.state.lng, lat: this.state.lat}} apiKey={this.state.key} />
        </div>
      </div>
    );
  }
}

export default withStyles(style)(Container);