import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import PostControls from './postControls';

class PostDetail extends Component {
  render() {
    const currentPost = this.props.posts.filter(post => (this.props.match.params.postID === post.id))[0];
    return (
      <div>
        <div className='row teal'>
          <nav>
            <div className="nav-wrapper  teal lighten-2">
              <Link to="/" className="brand-logo center">Readables</Link>
            </div>
          </nav>
        </div>
        <div className="container">
          <Card>
            <CardHeader
              title={currentPost.title}
            />
            <CardText>
              {currentPost.body}
            </CardText>
            <CardText>
              Author: {currentPost.author}
            </CardText>
            <CardText>
              Vote Rating: {currentPost.voteScore}
            </CardText>
            <CardActions>
              <PostControls post={currentPost} />
            </CardActions>
          </Card>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.items
});

export default connect(mapStateToProps, null)(PostDetail);
