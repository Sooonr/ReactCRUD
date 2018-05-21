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

   delete(id){
    console.log(id);
    axios.delete('http://localhost:3001/api/quotes/?_id='+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }


  render() {

    const { data } = this.state;

    return (
      <div className={css(styles.container)}>
        <div>{data.name} : {data.quote}</div>
        <button className={css(styles.button)} onClick={this.delete.bind(this, data._id)}>Delete</button>
        <Link className={css(styles.link)} to={`/quote/update/${data._id}`}>Edit</Link>
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
    button: {
      margin: '10px auto',
      width: 150,
      cursor: 'pointer'
    },
    link: {
      color: '#000',
      textDecoration: 'none',
      opacity: '0.7',
      ':hover': {
        opacity: 1,
      }
    }
});

export default ShowQuote;
