import React from 'react';

export default class MidPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <img style={{height: '25px', width: '25px'}}
        src={'https://github.com/letsgocamping/client/blob/dev/client/dist/assets/icons8-marker-26.png?raw=true'} />
    );
  }
}
