import React, { Component } from 'react';
import { connect } from 'react-redux';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { updateSortByParam } from '../actions/postsAction';

class PostHeader extends Component {

  state = {
    sortBy: 'voteScore'
  };

  handleChange = (event, index, value) => {
    this.setState({
      sortBy: value
    });
    this.props.updateSortBy(value);
  }

  render() {
    return (
     <div>
       <h3>{this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Posts</h3>
       <SelectField
          floatingLabelText="Choose Sort Order"
          value={this.state.sortBy}
          onChange={this.handleChange}
        >
          <MenuItem value={'voteScore'} primaryText="Vote Score" />
          <MenuItem value={'timestamp'} primaryText="TimeStamp" />
        </SelectField>
     </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateSortBy: (value) => dispatch(updateSortByParam(value))
});

export default connect(null, mapDispatchToProps)(PostHeader);
