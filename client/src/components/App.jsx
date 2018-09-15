import React, { Component } from 'react';
// import { Layout, Header, HeaderRow, Textfield, Drawer, Content, Navigation } from 'react-mdl'
// import './App.css';
import { Route } from 'react-router-dom';
import Map from './Map/Map.jsx';
import Container from './Map/Container.jsx';
import Splash from './Splash.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/"
          render={(props) => 
            <Container {...props} /> } />
        <Route path="/Splash" component={Splash} />
      </div>

    );
  }
}

export default App;
