import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ThumbsUp from 'react-icons/lib/md/thumb-up';
import ThumbsDown from 'react-icons/lib/md/thumb-down';
import Edit from 'react-icons/lib/md/edit';
import Delete from 'react-icons/lib/md/delete';
import { updatePostVote, deletePost } from '../../actions/postsAction';

class PostControls extends Component {
  render() {
    return (
      <div>
        <span>
          <a className="waves-effect waves-light btn edits blue" 
            onClick={() => (this.props.changeVote(this.props.post, 'upVote'))}>
            <ThumbsUp size={20} />
          </a>
          <a className="waves-effect waves-light btn edits blue" 
            onClick={() => (this.props.changeVote(this.props.post, 'downVote'))}>
            <ThumbsDown size={20} />
          </a>
          <Link to={`/edit/${this.props.post.id}`} className="waves-effect waves-light btn edits blue">
            <Edit size={20} />
          </Link>
          <a className="waves-effect waves-light btn edits blue" onClick={() => (this.props.deletePost(this.props.post))}>
            <Delete size={20} />
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
  changeVote : (post, value) => dispatch(updatePostVote(post, value)),
  deletePost : (post) => dispatch(deletePost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostControls);
