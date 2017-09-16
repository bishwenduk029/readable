import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

import Categories from '../categories';

const titleStyle = {
  textAlign: 'center'
}


class AppHeader extends Component {

  render() {
    Categories.muiName = 'IconMenu';
    return (
      <AppBar
        title="Readable"
        showMenuIconButton={false}
        titleStyle={titleStyle}
        iconElementRight={<Categories />}
      />
    );
  }
}

export default AppHeader;
