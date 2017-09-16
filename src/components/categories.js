import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { fetchCategories } from '../actions/categoryActions';
import { iconStyle } from '../component.styles';

class Categories extends React.Component {

  state = {
    categories: []
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      categories: nextProps.categories
    });
  }
  

  render() {
    return (
      <div>
        <IconMenu
          iconStyle={iconStyle}
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          {this.props.categories.map(elem => (
            <Link key={elem.name} to={`/category/${elem.path}`}>
              <MenuItem primaryText={elem.name.charAt(0).toUpperCase() + elem.name.slice(1)} />
            </Link>
          ))}
        </IconMenu>
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


export default connect(mapStateToProps, mapDispatchToProps)(Categories);