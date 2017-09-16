import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { updateComment } from '../../actions/postsAction.js';
import {labelStyle, submitStyle} from '../../component.styles';

class EditComment extends Component {

  state = {
    currentPost: null,
    commentToEdit: null,
    editComplete: false,
    body: ''
  };

  componentDidMount(){
    const currentPost = this.props.posts.filter(item => (item.id === this.props.match.params.postID))[0];
    const commentToEdit = currentPost.comments.filter(item => (item.id === this.props.match.params.commentID))[0];
    this.setState({
      body: commentToEdit.body,
      commentToEdit,
      currentPost
    });
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.isEditing && !nextProps.isEditing) {
      this.setState({
        editComplete: true
      });
    }
  }

  handleBodyChange = (event) => {
    this.setState({
      body: event.target.value
    });
  }

  handleSubmit = () => {
    this.props.editComments(Object.assign({}, this.state.commentToEdit,{
      body: this.state.body
    }));
  }

  render() {

    if (this.state.editComplete)
      return <Redirect to={`/post/${this.state.currentPost.category}/${this.state.currentPost.id}`} />;
    
    if (this.state.commentToEdit)
      return (
        <div>
          <div className="container edit">
            <TextField
              hintText="Comment Body"
              floatingLabelText="Enter text below"
              floatingLabelStyle={labelStyle}
              fullWidth={true}
              multiLine={true}
              value={this.state.body}
              onChange={this.handleBodyChange}
            /><br />
            <RaisedButton label="Edit the comment" 
              fullWidth={true} 
              backgroundColor="#00bcd4" 
              labelStyle={submitStyle}
              onClick={this.handleSubmit}
            />
          </div>
        </div>
      );
    return null;
  }
}

const mapStateToProps = (state) => ({
  isEditing: state.posts.isEditing,
  posts: state.posts.items
});

const mapDispatchToProps = (dispatch) => ({
  editComments: newComment => (dispatch(updateComment(newComment)))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditComment);
