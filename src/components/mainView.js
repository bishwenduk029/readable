import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Add from 'react-icons/lib/md/add';

import Posts from './posts';

class MainView extends Component {

  state = {
    reactActive: false,
    reduxActive: false,
    udacityActive: true
  };

  render() {
    return (
        <div>
          <div className='row teal'>
            <nav>
              <div className="nav-wrapper  teal lighten-2">
                <Link to="/" className="brand-logo center">Readables</Link>
                <ul className="right hide-on-med-and-down">
                  <li><Link to='/react'>React</Link></li>
                  <li><Link to='/redux'>Redux</Link></li>
                  <li><Link to='/udacity'>Udacity</Link></li>
                </ul>
              </div>
            </nav>
          </div>
          <Posts showPostType={this.props.match.params.id ? this.props.match.params.id : 'all'} />
          <Link className="newPost btn-floating btn-large waves-effect waves-light teal" to='/'><Add /></Link>
        </div>
    );
  }
}

export default MainView;