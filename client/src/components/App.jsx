import React, { Component } from 'react';
// import { Layout, Header, HeaderRow, Textfield, Drawer, Content, Navigation } from 'react-mdl'
// import './App.css';
import Map from './Map.jsx';
import Splash from './Splash.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <Map />
        <Splash />
      </div>

    );
  }
}

export default App;
