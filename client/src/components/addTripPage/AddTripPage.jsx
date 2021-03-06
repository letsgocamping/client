import React from 'react';
import Header from './Header.jsx';
import Container from './Map/Container.jsx';

class AddTripPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: []
    };
  }

  render() {
    return (
      <div>
        <Header handleHomeClick={this.props.handleHomeClick}/>
        <Container email={this.props.email} trips={this.props.trips} getTrips={this.props.getTrips}/>
      </div>
    );
  }
}

export default AddTripPage;