import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postsAction';
import { Loader } from 'react-loaders'

import PostControls from './postControls';
//import sortBy from 'sort-by';

import PostHeader from './postHeader.js';

class Posts extends Component {

  state = {
    sortType: 'voteScore',
    posts: []
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  componentWillReceiveProps(nextProps){

    console.log("POsts is re-rendering");
    this.setState({
      posts: nextProps.allPosts
    });
  }

  render() {
    if (this.props.isFecthingPosts) {
      return (
        <div>
          <Loader type="ball-scale-multiple" />
        </div>
      );
    } 
    return (
      <div className="container">
        <PostHeader category={this.props.showPostType} />
        <div className="collection">
          {this.state.posts
            .filter(elem => {
              if (this.props.showPostType === 'all')
                return elem;
              return (elem.category === this.props.showPostType);
            })
 //           .sort(sortBy(-this.state.sortType))
            .map(item => (
              <li key={item.id} to="/" className="collection-item postItem">
                <p>
                  Post Title: {item.title} <br />
                  Post By: {item.author} <br />
                  Rated: {item.voteScore} <br />
                </p>
                <PostControls post={item} />
              </li>
            ))}
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state, ownProps) => ({
  isFecthingPosts: state.posts.isFetching,
  allPosts: state.posts.items,
  showPostType: ownProps.showPostType
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchPosts())
});

export default connect(mapStatetoProps, mapDispatchToProps)(Posts);
