import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions/postsAction';
import { Loader } from 'react-loaders'

import PostControls from './postControls';
//import sortBy from 'sort-by';

import PostHeader from './postHeader.js';

class Posts extends Component {

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const sortOn = this.props.sortType;
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
          {this.props.allPosts
            .filter(elem => {
              if (this.props.showPostType === 'all')
                return elem;
              return (elem.category === this.props.showPostType);
            })
            .sort((elem1, elem2) => elem2[sortOn] - elem1[sortOn])
            .map((item, index) => (
              <div className="collection-item postItem" key={item.id}>
                <Link to={`/${item.category}/${item.id}`}>
                  <p>
                    Post Title: {item.title} <br />
                    Post By: {item.author} <br />
                    Rated: {item.voteScore} <br />
                    TimeStamp: {item.timestamp} <br />
                  </p>
                </Link>
                <PostControls post={item} />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state, ownProps) => ({
  isFecthingPosts: state.posts.isFetching,
  allPosts: state.posts.items,
  showPostType: ownProps.showPostType,
  sortType:  state.posts.sortType
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchPosts())
});

export default connect(mapStatetoProps, mapDispatchToProps)(Posts);
