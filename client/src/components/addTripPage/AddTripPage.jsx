import React from 'react';
import Header from './Header.jsx';
import Map from '../Map.jsx';

class AddTripPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: []
    };
  }

  render() {
    return (
      <div style={{ backgroundColor: '#fff7e4' }}>
        <Header />
        <Map />
      </div>
    );
  }
}

export default AddTripPage;