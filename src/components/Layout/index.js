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
            <a className={css(styles.smallHeaderLink)} href="https://github.com/ValentinKajdan/ReactCRUD" target="_blank">
              <img className={css(styles.smallHeaderImg)} src="/img/github.png" width="20"/> ReactCRUD - Join us to build the most powerfull CRUD based on ReactJS !
            </a>
            <span>
              Valentin Kajdan - Rudy Lantoarijaona - Antoine Lucas
            </span>
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
      justifyContent: 'space-between',
      color: '#000',
      fontSize: 12,
      marginBottom: 10,
      padding: '0 20px',
      height: 35,
      width: '100%',
      backgroundColor: '#fff',
    },
    smallHeaderLink: {
      display: 'flex',
      alignItems: 'center',
      color: '#000',
      textDecoration: 'none',
      opacity: '0.7',
      ':hover': {
        opacity: '1',
      }
    },
    smallHeaderImg: {
      marginRight: 10,
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
