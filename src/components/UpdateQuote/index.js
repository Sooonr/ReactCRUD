import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class UpdateQuote extends Component {

  state = {
    data: {},
    loading: true,
    redirect: false
   };

  componentDidMount = () => {
    this.loadQuotesFromServer();
  }

   loadQuotesFromServer = () => {
     const idQuote = this.props.location.pathname.split('/')[3]
     axios.get('http://localhost:3001/api/quote/' + idQuote)
     .then(res => {
       this.setState({ data: res.data, loading: false });
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
     const idQuote = this.props.location.pathname.split('/')[3]
     const {data} = this.state;
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
           quoteName: '',
           quoteContent: '',
           loading: false,
           redirect: true,
         });
       }
     })
   }

  render() {

    const { data, redirect } = this.state;

    if (redirect) return <Redirect to='/'/>;

    return (
      <div className={css(styles.container)}>
        <form className={css(styles.form)} onSubmit={this.updateQuoteOnServer} >
          <input value={data.name} type="text" name="name" onChange={this.updateContent}></input>
          <input value={data.quote} type="text" name="quote" onChange={this.updateContent}></input>
          <button type="submit">Valider</button>
          {data.message &&
            <div>{data.message}</div>
          }
        </form>
      </div>
    );
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
});
export default UpdateQuote;
