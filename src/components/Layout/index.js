import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Route, Link } from 'react-router-dom';

import Home from '../Home';
import Quote from '../Quote';
import ShowQuote from '../ShowQuote';


class Layout extends Component {

  render() {

    return (
      <div className={css(styles.app)}>
        <header className={css(styles.appHeader)}>
          <h1 className={css(styles.appTitle)}>Welcome</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/quote">quote</Link>
          </nav>
        </header>
        <main>
          <Route path="/" exact component={Home} />
          <Route path="/quote" exact component={Quote} />
          <Route path="/quote/:id" exact component={ShowQuote} />
        </main>
      </div>
    );
  }
}



const styles = StyleSheet.create({
    app: {
      textAlign: 'center',
    },
    appHeader: {
      backgroundColor: '#222',
      // height: 150,
      padding: 20,
      color: 'white',
    },
    appTitle: {
      fontSize: '1.5em',
    },
});

export default Layout;
