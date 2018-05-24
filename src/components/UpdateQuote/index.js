import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class UpdateQuote extends Component {

  state = {
    data: {},
    loading: true,
    redirect: false,
    idQuote: '',
   };

  componentDidMount = () => {
    this.loadQuoteFromServer();
  }

   loadQuoteFromServer = () => {
     const idQuote = this.props.location.pathname.split('/')[3]
     axios.get('http://localhost:3001/api/quote/' + idQuote)
     .then(res => {
       this.setState({ data: res.data, idQuote: res.data._id, loading: false });
     })
   }

   updateContent = ({ target: {value, name} }) => {
   	   const { data } = this.state;
       if (name === 'name') {
         this.setState({
           data: { name: value, quote: data.quote }
         });
       } else if (name === 'quote') {
         this.setState({
           data: { name: data.name, quote: value }
         });
       }
    }

    updateQuoteOnServer = (e) => {
     e.preventDefault();
     const {data, idQuote} = this.state;
     axios.post('http://localhost:3001/api/quote/update/' + idQuote, {
       name: data.name,
       quote: data.quote,
     })
     .then(res => {
       if (res.data.error) {
         this.setState({ data: res.data })
       } else {
         this.setState({
           data: res.data,
           loading: false,
           redirect: true,
         });
       }
     })
   }

  render() {

    const { data, redirect, idQuote } = this.state;

    if (redirect) return <Redirect to={`/quote/${idQuote}`} />;

    if (idQuote) {
      return (
        <div className={css(styles.container)}>
          <form className={css(styles.form)} onSubmit={this.updateQuoteOnServer} >
            <input className={css(styles.input)} value={data.name} type="text" name="name" onChange={this.updateContent}></input>
            <input className={css(styles.input)} value={data.quote} type="text" name="quote" onChange={this.updateContent}></input>
            <button className={css(styles.button)} type="submit">Send</button>
            {data.message &&
              <div>{data.message}</div>
            }
          </form>
        </div>
      );
    } else {
      return (
        <div className={css(styles.noQuote)}>
          <div>No quote found</div>
          <Link className={css(styles.link)} to='/'>Back to home</Link>
        </div>
      )
    }
  }
}

const styles = StyleSheet.create({
    container: {
      marginTop: 25,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: 500,
    },
    input: {
      margin: 10,
      padding: 5
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
    },
    noQuote: {
      marginTop: 20,
    }
});
export default UpdateQuote;
