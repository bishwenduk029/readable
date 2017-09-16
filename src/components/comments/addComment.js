import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import uniqid from 'uniqid';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import { addNewComment } from '../../actions/postsAction.js';
import {labelStyle, submitStyle} from '../../component.styles';

class AddComment extends Component {

  state = {
    comment: {
      body: '',
      author: ''
    },
    currentPost: {},
    commentAddSuccess: false
  };
  
  
  componentDidMount() {
    this.setState({
      currentPost: this.props.posts.filter(post => (this.props.match.params.postId === post.id))[0]
    });
  }
  

  componentWillReceiveProps(nextProps) {
    if (this.state.currentPost === {}) {
      this.setState({
        currentPost: this.props.posts.filter(post => (this.props.match.params.postID === post.id))[0]
      });
    }
    if (this.props.isAdding && !nextProps.isAdding){
      this.setState({
        commentAddSuccess: true
      });
    }
  }

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

    if (this.state.commentAddSuccess) {
      return <Redirect to={`/post/${this.state.currentPost.category}/${this.state.currentPost.id}`} />;
    }
    
    return (
      <div>
        {this.props.isAdding ?
          <CircularProgress size={80} thickness={5} />
          :
          <div className="container">
            <TextField
              hintText="Comment Author"
              floatingLabelText="Enter Author Name"
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
              backgroundColor="#00bcd4" 
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
  posts: state.posts.items,
  isAdding: state.posts.isAdding
});

const mapDispatchToProps = (dispatch) => ({
  addComment: (newComment) => dispatch(addNewComment(newComment))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
