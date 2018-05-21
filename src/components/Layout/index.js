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
          <div className={css(styles.smallHeader)}>
            <span><a href="https://github.com/ValentinKajdan/ReactCRUD" target="_blank">Github</a></span>
          </div>
          <h1 className={css(styles.appTitle)}>Welcome to ReactCRUD</h1>
          <nav className={css(styles.nav)}>
            <Link className={css(styles.navLink)} to="/">Home</Link>
            <Link className={css(styles.navLink)} to="/quote">Create quote</Link>
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
    smallHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 10,
      padding: '0 20px',
      height: 40,
      width: '100%',
      backgroundColor: '#000',
    },
    appHeader: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#222',
      paddingBottom: 20,
      color: 'white',
    },
    appTitle: {
      fontSize: '1.5em',
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-around',
      width: 500,
    },
    navLink: {
      color: '#fff',
      textDecoration: 'none',
      ':hover': {
        opacity: '0.8'
      }
    },
});

export default Layout;
