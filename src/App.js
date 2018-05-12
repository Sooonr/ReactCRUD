import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

import Layout from './components/Layout';

class App extends Component {

  static propTypes = {
      name: PropTypes.string.isRequired,
   };

  render() {

    const { name } = this.props;

    return (
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  }
}

export default App;
