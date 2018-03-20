import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';

class App extends Component {
  state = {
    data: [],
    lading: true,
   };

  static propTypes = {
      name: PropTypes.string.isRequired,
   };

   loadQuotesFromServer = () => {
     axios.get('http://localhost:3001/api/quotes')
     .then(res => {
       this.setState({ data: res.data, loading: false });
     })
   }

   componentDidMount() {
     this.loadQuotesFromServer();
   }

  render() {

    const { name } = this.props;
    const { data } = this.state;

    return (
      <div className={css(styles.app)}>
        <header className={css(styles.appHeader)}>
          <h1 className={css(styles.appTitle)}>Welcome to {name}</h1>
        </header>
        <ul className={css(styles.list)}>
          {
            data.map((quote, key) =>
              <li key={key} className={css(styles.listItem)}>{quote.name} : {quote.quote}</li>
            )
          }
        </ul>

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
    list: {
      textAlign: 'left',
      width: 840,
      margin: '25px auto',
    },
    listItem: {
      listStyle: 'none',
    },
});

export default App;
