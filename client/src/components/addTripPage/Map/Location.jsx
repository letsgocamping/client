import React from 'react';

import { api_url } from '../../../../../../config.js';

export default class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <img style={{height: '25px', width: '25px'}}
        src={"https://github.com/letsgocamping/client/blob/master/client/dist/assets/Campfire-PNG-Transparent.png?raw=true"} />
    );
  }
}
