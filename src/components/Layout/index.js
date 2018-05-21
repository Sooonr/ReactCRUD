import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Route, Link } from 'react-router-dom';

import Home from '../Home';
import Quote from '../Quote';
import ShowQuote from '../ShowQuote';
import UpdateQuote from '../UpdateQuote';

class Layout extends Component {

  render() {

    return (
      <div className={css(styles.app)}>
        <header className={css(styles.appHeader)}>
          <h1 className={css(styles.appTitle)}>Welcome</h1>
          <nav className={css(styles.nav)}>
            <Link to="/">Home</Link>
            <Link to="/quote">Create quote</Link>
          </nav>
        </header>
        <main>
          <Route path="/" exact component={Home} />
          <Route path="/quote" exact component={Quote} />
          <Route path="/quote/:id" exact component={ShowQuote} />
          <Route path="/quote/update/:id" exact component={UpdateQuote} />
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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#222',
      padding: 20,
      color: 'white',
    },
    appTitle: {
      fontSize: '1.5em',
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-around',
      width: 500,
    }
});

export default Layout;
