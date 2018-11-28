import React, { Component } from 'react';
import './App.css';
import routes from './routes';
import Upload from './Components/Upload/Upload.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        { routes }
        <Upload />
      </div>
    );
  }
}

export default App;
