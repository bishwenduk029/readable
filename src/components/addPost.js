import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import uniqid from 'uniqid';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import { addNewPost } from '../actions/postsAction.js';

const labelStyle = {
  color: 'teal'
};

const submitStyle = {
  color: 'white',
  fontFamily: 'laila'
};

class AddPost extends Component {

  state = {
    post: {
      title: '',
      body: '',
      author: '',
      category: ''
    }
  };

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

  handleAuthorChange = (event) => {
    this.setState({
      post: Object.assign({}, this.state.post, {
        author: event.target.value
      })
    });
  }

  handlecategoryChange = (event, index, value) => {
    this.setState({
      post: Object.assign({}, this.state.post,{
        category: value
      }) 
    });
  }

  handleSubmit = () => {
    let newPost = Object.assign({}, this.state.post,{
      timestamp: Date.now(),
      id: uniqid()
    });
    this.props.addPost(newPost);
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
              hintText="Post Tittle"
              floatingLabelText="Enter Title of the Post"
              floatingLabelStyle={labelStyle}
              fullWidth={true}
              multiLine={true}
              className='add'
              value={this.state.post.title}
              onChange={this.handleTitleChange}
            /><br />
            <TextField
              hintText="Post Author"
              floatingLabelText="Enter Author of the Post"
              floatingLabelStyle={labelStyle}
              fullWidth={true}
              multiLine={true}
              className='add'
              value={this.state.post.author}
              onChange={this.handleAuthorChange}
            /><br />
            <TextField
              hintText="Post Body"
              floatingLabelText="Enter text below"
              floatingLabelStyle={labelStyle}
              fullWidth={true}
              multiLine={true}
              className='add'
              value={this.state.post.body}
              onChange={this.handleBodyChange}
            /><br />
            <SelectField
              floatingLabelText="Category"
              floatingLabelStyle={labelStyle}
              fullWidth={true}
              value={this.state.post.category}
              onChange={this.handlecategoryChange}
            >
              {this.props.categories.map(category => (
                <MenuItem key={category.name} value={category.name} primaryText={category.name.charAt(0).toUpperCase() + category.name.slice(1)} />
              ))}
            </SelectField>
            <br />
            <RaisedButton label="ADD NEW POST"
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
  posts: state.posts.items,
  categories: state.categories.items,
  isAdding: state.posts.isAdding
});

const mapDispatchToProps = (dispatch) => ({
  addPost: (newPost) => dispatch(addNewPost(newPost))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
