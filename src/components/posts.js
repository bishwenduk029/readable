import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
import { Loader } from 'react-loaders'
import sortBy from 'sort-by';

class Posts extends Component {

  componentDidMount() {
    this.props.fetchPosts();
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
        <div className="collection">
          {this.props.allPosts
            .filter(elem => {
              if (this.props.showPostType === 'all')
                return elem;
              return (elem.category === this.props.showPostType);
            })
            .sort(sortBy('-voteScore'))
            .map(item => (
              <Link key={item.id} to="/" className="collection-item postItem">
                <p>
                  Post Title: {item.title} <br />
                  Post By: {item.author} <br />
                  Rated: {item.voteScore}
                </p>
              </Link>
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
