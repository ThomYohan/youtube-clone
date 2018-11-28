import React, { Component } from 'react';
import './App.css';
import routes from './routes';
import Upload from './Components/Upload/Upload.js'
import Nav from './Components/Nav/Nav'

class App extends Component {
  render() {
    return (
      <div className="App">
        { routes }
        <Upload />
        <Nav/>
      </div>
    );
  }
}

export default App;
