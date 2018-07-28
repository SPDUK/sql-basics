import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components
import Register from './Components/Register/Register';
import Landing from './Components/Landing/Landing';

// Css
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
