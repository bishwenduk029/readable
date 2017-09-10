import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ThumbsUp from 'react-icons/lib/md/thumb-up';
import ThumbsDown from 'react-icons/lib/md/thumb-down';
import Edit from 'react-icons/lib/md/edit';
import Delete from 'react-icons/lib/md/delete';
import { requestCommentUpdate, updateCommentVote, deleteComment } from '../actions/postsAction';

class CommentControls extends Component {
  render() {
    return (
      <div>
        <span>
           <a className="waves-effect waves-light btn edits" 
            onClick={() => (this.props.changeVote(this.props.comment, 'upVote'))}>
            <ThumbsUp size={20} />
          </a>
          <a className="waves-effect waves-light btn edits" 
            onClick={() => (this.props.changeVote(this.props.comment, 'downVote'))}>
            <ThumbsDown size={20} />
          </a>
          <Link to={`/editComments/${this.props.comment.id}`} 
            className="waves-effect waves-light btn edits"
            onClick={() => (this.props.editTheComment(this.props.comment))}>
            <Edit size={20} />
          </Link>
          <a className="waves-effect waves-light btn edits" 
            onClick={() => (this.props.deleteComment(this.props.comment))}
          >
            <Delete size={20} />
          </a>
        </span>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  editTheComment: (comment) => (dispatch(requestCommentUpdate(comment))),
  changeVote : (comment, value) => dispatch(updateCommentVote(comment, value)),
  deleteComment : (comment) => dispatch(deleteComment(comment))
});

export default connect(null, mapDispatchToProps)(CommentControls);
