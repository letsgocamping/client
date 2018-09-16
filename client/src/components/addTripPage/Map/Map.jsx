import React from 'react';
import GoogleMapReact from 'google-map-react';
import Location from './Location.jsx';
import { fitBounds } from 'google-map-react/utils';

const bounds = {
  nw: {
    lat: 50.01038826014866,
    lng: -118.6525866875
  },
  se: {
    lat: 32.698335045970396,
    lng: -92.0217273125
  }
};


const size = {
  width: 640, // Map width in pixels
  height: 380, // Map height in pixels
};


const { center, zoom } = fitBounds(bounds, size);

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: Number(this.props.coordinates.lat),
      lng: this.props.coordinates.lng,
      zoom: 4
    };
  }



  componentDidUpdate(prevProps) {
    
    if (this.props.coordinates !== prevProps.coordinates) {
      this.setState({
        lat: Number(this.props.coordinates.lat),
        lng: this.props.coordinates.lng,
      }
      // , () => { console.log('newLAt State', this.state.lat); }
      );
    }
  }



  render() {
    return (
      <div>
        <GoogleMapReact
          bootstrapURLKeys={{ key: this.props.apiKey, libraries: 'places' }}
          center = {
            [this.state.lat, this.state.lng]
          }
          defaultZoom={this.state.zoom}
        > 
          <Location
            lat={this.state.lat}
            lng={this.state.lng}
            text={'Here"s the thing' }
          />
        </GoogleMapReact>

      </div>
    );
  }
}
