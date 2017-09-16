import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postsAction';
import { Loader } from 'react-loaders'
import EachPost from './eachPost';
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
        <PostHeader category={this.props.showPostType} sortType={sortOn} />
        <div className="collection">
          {this.props.allPosts
            .filter(elem => {
              if (this.props.showPostType === 'all')
                return elem;
              return (elem.category === this.props.showPostType);
            })
            .sort((elem1, elem2) => (elem2[sortOn] > elem1[sortOn]))
            .map(item => (
              <EachPost 
                key={item.id}
                post={item}  
                comments={item.comments ? item.comments : null} 
              />
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
