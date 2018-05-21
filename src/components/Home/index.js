import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
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
      <table className={css(styles.table)}>
        <tbody>
          <tr className={css(styles.row)}>
            <th className={css(styles.cell)}>Author</th>
            <th className={css(styles.cell)}>Quote</th>
            <th className={css(styles.cell)}>Actions</th>
          </tr>
          {
            this.state.data.map((quote, key) =>
              <tr key={key} className={css(styles.row)}>
                <td className={css(styles.cell)}>{quote.name}</td>
                <td className={css(styles.cell, styles.quoteCell)}>{quote.quote}</td>
                <td className={css(styles.cell)}><Link className={css(styles.quote)} to={`/quote/${quote._id}`}>edit</Link></td>
              </tr>
            )
          }
        </tbody>
      </table>
    );
  }
}

const styles = StyleSheet.create({
    table: {
      textAlign: 'center',
      maxWidth: 840,
      width: '100%',
      margin: '25px auto',
      border: '1px solid #000',
      borderCollapse: 'collapse',
    },
    row: {
      border: '1px solid #000',
      width: '50%',
    },
    cell: {
      border: '1px solid #000',
      padding: 10,
    },
    quoteCell: {
      color: '#000',
    },
    quote: {
      color: '#000',
      textDecoration: 'none',
      opacity: '0.7',
      ':hover': {
        opacity: '1'
      }
    }
});

export default Home;
