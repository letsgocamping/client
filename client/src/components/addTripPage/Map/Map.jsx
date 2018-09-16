import React from 'react';
import GoogleMapReact from 'google-map-react';
import Location from './Location.jsx';
import { fitBounds } from 'google-map-react/utils';
import UserLocation from './UserLocation.jsx';



export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.coordinates.centerLat,
      lng: this.props.coordinates.centerLng,
      zoom: 4,
    };
  }



  componentDidUpdate(prevProps) {
    
    if (this.props.coordinates !== prevProps.coordinates) {
      this.setState({
        lat: this.props.coordinates.centerLat,
        lng: this.props.coordinates.centerLng,
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
          {this.props.searched ? 
            <Location
              lat={this.props.coordinates.lat}
              lng={this.props.coordinates.lng}
            />
            :
            null
          }
          {this.props.users.map(user=>{
            return <UserLocation
              lat={user[0]}
              lng={user[1]}
            />;
          })}
        </GoogleMapReact>

      </div>
    );
  }
}
