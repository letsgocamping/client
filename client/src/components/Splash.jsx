import React from 'react';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  render() {
    return (<p>This is the splash page</p>);
  }
}

export default Splash;