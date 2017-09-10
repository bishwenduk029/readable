import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import { addNewComment } from '../actions/postsAction.js';

const labelStyle = {
  color: 'teal'
};

const submitStyle = {
  color: 'white',
  fontFamily: 'laila'
};

class AddComment extends Component {

  state = {
    comment: {
      body: '',
      author: ''
    }
  };

  handleBodyChange = (event) => {
    this.setState({
      comment: Object.assign({}, this.state.comment, {
        body: event.target.value
      })
    });
  }

  handleAuthorChange = (event) => {
    this.setState({
      comment: Object.assign({}, this.state.comment, {
        author: event.target.value
      })
    });
  }

  handleSubmit = () => {
    let newPost = Object.assign({}, this.state.comment,{
      timestamp: Date.now(),
      id: uniqid(),
      parentId: this.props.match.params.postId
    });
    this.props.addComment(newPost);
  }

  render() {
    
    return (
      <div>
        <div className='row teal'>
          <nav>
            <div className="nav-wrapper  teal lighten-2">
              <Link to="/" className="brand-logo center">Readables</Link>
            </div>
          </nav>
        </div>
        {this.props.isAdding ?
          <CircularProgress size={80} thickness={5} />
          :
          <div className="container">
            <TextField
              hintText="Comment Author"
              floatingLabelText="Enter Author Namex"
              floatingLabelStyle={labelStyle}
              fullWidth={true}
              multiLine={true}
              className='add'
              value={this.state.comment.author}
              onChange={this.handleAuthorChange}
            /><br />
            <TextField
              hintText="Comment Body"
              floatingLabelText="Enter text below"
              floatingLabelStyle={labelStyle}
              fullWidth={true}
              multiLine={true}
              className='add'
              value={this.state.comment.body}
              onChange={this.handleBodyChange}
            /><br />
            <RaisedButton label="ADD NEW COMMENT"
              fullWidth={true} 
              backgroundColor="teal" 
              labelStyle={submitStyle}
              onClick={this.handleSubmit}
            />
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAdding: state.posts.isAdding
});

const mapDispatchToProps = (dispatch) => ({
  addComment: (newComment) => dispatch(addNewComment(newComment))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
