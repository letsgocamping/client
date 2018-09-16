import React from 'react';

import { api_url } from '../../../../../config.js';

export default class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <img style={{height: '25px', width: '25px'}}
        src={`${api_url}/images/Campfire-PNG-Transparent.png`} />
    );
  }
}
