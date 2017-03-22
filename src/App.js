import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>This should be a KANBAN</h2>
        </div>
        <p className="App-intro">
          I really don't have anything to say
        </p>
      </div>
    );
  }
}

export default App;
