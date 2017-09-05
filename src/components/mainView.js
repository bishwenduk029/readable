import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Add from 'react-icons/lib/md/add';
import { connect } from 'react-redux';

import Posts from './posts';
import { fetchCategories } from '../actions/categoryActions';

class MainView extends Component {

  componentDidMount() {
    this.props.fetchCategories();
  }
  
  render() {

    return (
        <div>
          <div className='row teal'>
            <nav>
              <div className="nav-wrapper  teal lighten-2">
                <Link to="/" className="brand-logo center">Readables</Link>
                <ul className="right hide-on-med-and-down">
                  {this.props.categories.map(elem => (
                    <li key={elem.name}><Link to={`/${elem.path}`}>{elem.name.charAt(0).toUpperCase() + elem.name.slice(1)}</Link></li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
          <Posts showPostType={this.props.match.params.category ? this.props.match.params.category : 'all'} />
          <Link className="newPost btn-floating btn-large waves-effect waves-light teal" to='/addPost'><Add /></Link>
        </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: state.categories.items
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainView);