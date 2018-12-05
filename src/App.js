import React, { Component } from 'react';
import './App.css';
import routes from './routes';
import Nav from './Components/Nav/Nav'

class App extends Component {
  constructor(){
    super()
    this.state = {
      searchField: ''
    }
  }

  search = (userInput) => {
    this.setState({
      searchField: userInput
    })
  }

  render() {
    return (
      <div className="App">
        <Nav search={this.search}/>
        { routes(this.state.searchField) }
      </div>
    );
  }
}

export default App;
