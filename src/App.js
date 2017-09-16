import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import './test.scss';
import MainView from './components/mainView';
import PostDetail from './components/posts/postDetail';
import EditPost from './components/posts/editPost';
import AddPost from './components/posts/addPost';
import AddComment from './components/comments/addComment';
import EditComment from './components/comments/editComment';
import AppHeader from './components/commons/appHeader';
import NotFound from './components/commons/notFound';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  appBar: {
    height: 65,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <AppHeader />
          <Switch>
            <Route exact path="/" component={MainView} />
            <Route path="/addPost" component={AddPost} />
            <Route path="/addComment/:postId" component={AddComment} />
            <Route path="/comments/:postID/:commentID" component={EditComment} />
            <Route path="/edit/:postID" component={EditPost} />
            <Route path="/post/:category/:postID" component={PostDetail} />
            <Route path="/category/:category" component={MainView} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
