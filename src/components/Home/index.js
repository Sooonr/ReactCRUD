import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';

class Home extends Component {

    state = {
      data: [],
      loading: true,
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
    return (
      <ul className={css(styles.list)}>
        {
          this.state.data.map((quote, key) =>
            <li key={key} className={css(styles.listItem)}>{quote.name} : {quote.quote}</li>
          )
        }
      </ul>
    );
  }
}

const styles = StyleSheet.create({
    list: {
      textAlign: 'left',
      width: 840,
      margin: '25px auto',
    },
    listItem: {
      listStyle: 'none',
    },
});

export default Home;
