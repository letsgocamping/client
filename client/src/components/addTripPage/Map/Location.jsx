import React from 'react';

export default class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <img style={{height: '25px', width: '25px'}}
        src={'http://localhost:1337/images/Campfire-PNG-Transparent.png'} />
    );
  }
}
