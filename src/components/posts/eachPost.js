import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCommentsForPost } from '../../actions/postsAction';

import PostControls from './postControls';

class EachPost extends Component {
  
  componentDidMount() {
    this.props.getComments(this.props.post);
  }
  
  render() {
    return (
      <div className="collection-item postItem">
        <Link to={`/post/${this.props.post.category}/${this.props.post.id}`}>
          <p>
            <span className='col-1'>Post Title</span>
            <span>:{this.props.post.title}</span><br />
            <span className='col-1'>Post By</span>
            <span>:{this.props.post.author}</span><br />
            <span className='col-1'>Rated</span>
            <span>:{this.props.post.voteScore}</span><br />
            <span className='col-1'>TimeStamp</span>
            <span>:{this.props.post.timestamp}</span> <br />
            <span className='col-1'>Comments Count</span>
            <span>:{this.props.comments ? this.props.comments.length : 0}</span> <br />
          </p>
        </Link>
        <PostControls post={this.props.post} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getComments : (post) => (dispatch(getCommentsForPost(post)))
});

export default connect(null, mapDispatchToProps)(EachPost);