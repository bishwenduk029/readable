import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThumbsUp from 'react-icons/lib/md/thumb-up';
import ThumbsDown from 'react-icons/lib/md/thumb-down';
import Edit from 'react-icons/lib/md/edit';
import Delete from 'react-icons/lib/md/delete';
import { updatePostVote } from '../actions/postsAction';

class PostControls extends Component {
  render() {
    return (
      <div>
        <span>
          <a className="waves-effect waves-light btn edits" 
            onClick={() => (this.props.changeVote(this.props.post, 'upVote'))}>
            <ThumbsUp />
          </a>
          <a className="waves-effect waves-light btn edits" 
            onClick={() => (this.props.changeVote(this.props.post, 'downVote'))}>
            <ThumbsDown />
          </a>
          <a className="waves-effect waves-light btn edits">
            <Edit />
          </a>
          <a className="waves-effect waves-light btn edits">
            <Delete />
          </a>
        </span>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  post: ownProps.post
});

const mapDispatchToProps = (dispatch) => ({
  changeVote : (post, value) => dispatch(updatePostVote(post, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostControls);
