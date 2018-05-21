import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ShowQuote extends Component {

  state = {
    data: {},
    loading: true,
   };

  componentDidMount = () => {
    this.loadQuotesFromServer();
  }

   loadQuotesFromServer = () => {
     const idQuote = this.props.location.pathname.split('/')[2]
     axios.get('http://localhost:3001/api/quote/' + idQuote)
     .then(res => {
       this.setState({ data: res.data, loading: false });
     })
   }

  render() {

    const { data } = this.state;

    return (
      <div className={css(styles.container)}>
        <div>{data.name} : {data.quote}</div>
        <Link to="/">Supprimer</Link>
        <Link to={`/quote/update/${data._id}`}>Modifier</Link>
      </div>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      marginTop: 25,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
});

export default ShowQuote;
