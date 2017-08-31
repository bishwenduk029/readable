import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import './test.scss';
import MainView from './components/mainView';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Route exact path="/" component={MainView} />
          <Route path="/:category" component={MainView} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
