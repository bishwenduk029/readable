import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import './test.scss';
import MainView from './components/mainView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={MainView} />
        <Route path="/:id" component={MainView} />
      </div>
    );
  }
}

export default App;
