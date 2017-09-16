import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { editPost } from '../../actions/postsAction.js';

const labelStyle = {
  color: '#00bcd4'
};

const submitStyle = {
  color: 'white',
  fontFamily: 'laila'
};

class EditPost extends Component {

  state = {
    post: {
      title: '',
      body: '',
      author: ''
    },
    postEditSucess: false
  };

  componentDidMount(){
    if (this.props.match.params) {
      const currentPost = this.props.posts.filter(post => (this.props.match.params.postID === post.id))[0];
      this.setState({
        post: currentPost
      });
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.isEditing && !nextProps.isEditing)
      this.setState({
        postEditSucess: true
      });
  }
  

  handleTitleChange = (event) => {
    this.setState({
      post: Object.assign({}, this.state.post, {
        title: event.target.value
      })
    });
  }

  handleBodyChange = (event) => {
    this.setState({
      post: Object.assign({}, this.state.post, {
        body: event.target.value
      })
    });
  }

  handleSubmit = () => {
    this.props.addNewPost(this.state.post);
  }

  render() {
    
    if (this.state.postEditSucess)
      return <Redirect to={`/post/${this.state.post.category}/${this.state.post.id}`} />

    return (
      <div>
        <div className="container edit">
          <TextField
            hintText="Post Tittle"
            floatingLabelText="Enter Title of the Post"
            floatingLabelStyle={labelStyle}
            fullWidth={true}
            value={this.state.post.title}
            onChange={this.handleTitleChange}
          /><br />
          <TextField
            hintText="Post Body"
            floatingLabelText="Enter text below"
            floatingLabelStyle={labelStyle}
            fullWidth={true}
            multiLine={true}
            value={this.state.post.body}
            onChange={this.handleBodyChange}
          /><br />
          <RaisedButton label="Edit the Post" 
            fullWidth={true} 
            backgroundColor='#00bcd4'
            labelStyle={submitStyle}
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.items,
  isEditing: state.posts.isEditing
});

const mapDispatchToProps = (dispatch) => ({
  addNewPost: (newPost) => dispatch(editPost(newPost))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
