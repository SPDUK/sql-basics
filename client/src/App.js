import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';

// Components
import Landing from './Components/Landing/Landing';

import Register from './Components//Auth/Register/Register';
import Login from './Components//Auth/Login/Login';

// Css
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DevTools />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
