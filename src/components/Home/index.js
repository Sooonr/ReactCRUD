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

     delete(id){
      console.log(id);
      axios.delete('http://localhost:3001/api/quotes/?_id='+id)
        .then((result) => {
          this.props.history.push("/")
        });
    }

  render() {
    return (
          <ul className={css(styles.list)}>
        {
          this.state.data.map((quote, key) =>
            <li key={key} className={css(styles.listItem)}><Link to={`/delete/${quote._id}`}>{quote.name} : {quote.quote}</Link></li>
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
