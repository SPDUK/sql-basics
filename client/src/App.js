import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

const hi = 'hello';
class App extends Component {
  constructor() {
    super();
    this.state = {
      name: {}
    };
  }
  componentDidMount() {
    this.fetchApi();
  }

  async fetchApi() {
    return await axios
      .get('/api/users')
      .then(res => this.setState({ name: res.data }));
  }
  render() {
    return (
      <div className="App">
        <h1>{this.state.name.id}</h1>
        <h1>{this.state.name.username}</h1>
      </div>
    );
  }
}

export default App;
