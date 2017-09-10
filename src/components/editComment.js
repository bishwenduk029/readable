import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { updateComment } from '../actions/postsAction.js';

const labelStyle = {
  color: 'teal'
};

const submitStyle = {
  color: 'white',
  fontFamily: 'laila'
};

class EditPost extends Component {

  state = {
    body: ''
  };

  componentDidMount(){
    this.setState({
      body: this.props.commentToEdit.body
    });
  }

  handleBodyChange = (event) => {
    this.setState({
      body: event.target.value
    });
  }

  handleSubmit = () => {
    this.props.editComments(Object.assign({}, this.props.commentToEdit,{
      body: this.state.body
    }));
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
            backgroundColor="teal" 
            labelStyle={submitStyle}
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  editComments: newComment => (dispatch(updateComment(newComment)))
});

const mapStateToProps = (state) => ({
  commentToEdit: state.posts.commentToEdit
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
