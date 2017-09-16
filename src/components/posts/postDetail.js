import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import PostControls from './postControls';
import CommentControls from '../comments/commentControls';
import { fetchPosts, getCommentsForPost } from '../../actions/postsAction';


class PostDetail extends Component {

  state = {
    currentPost: null,
    postFound: true
  }

  componentDidMount() {
    this.props.fetchPosts();
  }
  
  componentWillReceiveProps(nextProps) {
    const currentPost = nextProps.posts.filter(post => (this.props.match.params.postID === post.id))[0];
    this.setState({ currentPost });
    if (this.props.isFetching && !nextProps.isFetching && !currentPost)
      this.setState({postFound: false});
  }  
  
  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentPost) {
      if (!this.state.currentPost.comments) {
        this.props.getComments(this.state.currentPost);
      }
    }
  }
  

  render() {
    if (!this.state.postFound)
      return <Redirect to="/pageNotFound" />;
    return (
      <div>
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
                  className="btn comment-button waves-effect waves-light blue" 
                  to={`/addComment/${this.state.currentPost.id}`}>
                  ADD NEW COMMENT
                </Link>
              </span>
            </span>
            <div className='collection'>
              {this.state.currentPost.comments && this.state.currentPost.comments
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
  posts: state.posts.items,
  isFetching: state.posts.isFetching
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchPosts()),
  getComments : (post) => (dispatch(getCommentsForPost(post)))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
