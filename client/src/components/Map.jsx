import React from 'react';
import GoogleMapReact from 'google-map-react';


export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
      Hello world
        {/* <GoogleMapReact
            bootstrapURLKeys={{ key: '1234' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
        /> */}
      </div>
    );
  }
}
