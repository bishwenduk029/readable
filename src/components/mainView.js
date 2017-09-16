import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Add from 'react-icons/lib/md/add';

import Posts from './posts/posts';

class MainView extends Component {
  
  render() {

    return (
      <div>
        <Posts showPostType={this.props.match.params.category ? this.props.match.params.category : 'all'} />
        <Link className="newPost btn-floating btn-large waves-effect waves-light blue" to='/addPost'><Add size={30} /></Link>
      </div>
    );
  }
}

export default MainView;