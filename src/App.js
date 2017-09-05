import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import './test.scss';
import MainView from './components/mainView';
import PostDetail from './components/postDetail';
import EditPost from './components/editPost';
import AddPost from './components/addPost';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Switch>
            <Route exact path="/" component={MainView} />
            <Route path="/addPost" component={AddPost} />
            <Route path="/edit/:postID" component={EditPost} />
            <Route path="/:category/:postID" component={PostDetail} />
            <Route path="/:category" component={MainView} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
