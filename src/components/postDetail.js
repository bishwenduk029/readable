import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import PostControls from './postControls';
import CommentControls from './commentControls';
import { getCommentsForPost } from '../actions/postsAction';


class PostDetail extends Component {

  state = {
    currentPost: null
  }

  componentDidMount() {
    const currentPost = this.props.posts.filter(post => (this.props.match.params.postID === post.id))[0];
    this.setState({
      currentPost
    });
    this.props.getComments(currentPost);
  }

  
  componentWillReceiveProps(nextProps) {
    this.setState({
      currentPost: nextProps.posts.filter(post => (this.props.match.params.postID === post.id))[0]
    });
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
        {this.state.currentPost && 
          <div className="container">
            <Card>
              <CardHeader
                title={this.state.currentPost.title}
              />
              <CardText>
                {this.state.currentPost.body}
              </CardText>
              <CardText>
                Author: {this.state.currentPost.author}
              </CardText>
              <CardText>
                Vote Rating: {this.state.currentPost.voteScore}
              </CardText>
              <CardActions>
                <PostControls post={this.state.currentPost} />
              </CardActions>
            </Card>
            <span className='comment-header'>
              <h4>All Comments</h4>
              <span>
                <Link 
                  className="btn comment-button waves-effect waves-light teal" 
                  to={`/addComment/${this.state.currentPost.id}`}>
                  ADD NEW COMMENT
                </Link>
              </span>
            </span>
            <div className='collection'>
              {this.state.currentPost.comments
                .sort((e1, e2) => (e2.timestamp > e1.timestamp))
                .map(
                  item => (
                    <div key={item.id} className="collection-item postItem">
                      <p>
                        <span className='col-1'>Comment Owner</span>
                        <span>:{item.author}</span><br />
                        <span className='col-1'>Comment Body</span>
                        <span>:{item.body}</span><br />
                        <span className='col-1'>Ratings</span>
                        <span>:{item.voteScore}</span><br />
                      </p>
                      <CommentControls comment={item} />
                    </div>
                  )
                )
              }
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.items
});

const mapDispatchToProps = (dispatch) => ({
  getComments : (post) => (dispatch(getCommentsForPost(post)))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
