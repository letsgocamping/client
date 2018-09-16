import React from 'react';
import GoogleMap from 'google-map-react';
import Location from './Location.jsx';
import UserLocation from './UserLocation.jsx';
import MidPoint from './Midpoint.jsx';
// import Polyline from './Polyline.jsx';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.coordinates.centerLat,
      lng: this.props.coordinates.centerLng,
      users: this.props.users,
      zoom: 4,
      mapLoaded: false
    };
    // this.renderPolylines = this.renderPolylines.bind(this);
  }

  // renderPolylines(map, maps) {
  //   /** Example of rendering geodesic polyline */
  //   console.log('HELO I\'M FIRING', this.props.users);
  //   let geodesicPolyline = new maps.Polyline({
  //     path: this.state.users,
  //     geodesic: true,
  //     strokeColor: '#00a1e1',
  //     strokeOpacity: 1.0,
  //     strokeWeight: 4
  //   });
  //   geodesicPolyline.setMap(map);
  // }

  componentDidUpdate(prevProps) {
    if (this.props.coordinates !== prevProps.coordinates) {
      this.setState({
        lat: this.props.coordinates.centerLat,
        lng: this.props.coordinates.centerLng,
        mapLoaded: true,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      users: nextProps.users
    });
  }


  render() {
    return (
      <div style={{ height: '92.5%' }}>
        <GoogleMap
          bootstrapURLKeys={{ key: this.props.apiKey, libraries: 'places' }}
          center = {
            [this.state.lat, this.state.lng]
          }
          defaultZoom={this.state.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          // onGoogleApiLoaded={({ map, maps }) => { this.setState({ map: map, maps: maps}); }}
        > 
          {this.props.searched ? 
            <MidPoint
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

          {this.props.parks.map(park=>{
            return <Location 
              lat={park[0]}
              lng={park[1]}
            />;
          })}
        </GoogleMap>
      </div>
    );
  }
}
