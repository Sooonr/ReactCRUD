import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Quote extends Component {

    state = {
      quoteName: '',
      quoteContent: '',
      loading: true,
      data: {},
      redirect: false,
     };

    updateContent = ({ target: {value, name} }) => {
       if (name === 'name') {
         this.setState({
           quoteName: value
         });
       } else if (name === 'quote') {
         this.setState({
           quoteContent: value
         });
       }
    }

   addQuoteOnServer = (e) => {
     e.preventDefault();
     const {quoteName, quoteContent} = this.state;
     axios.post('http://localhost:3001/api/quotes', {
       name: quoteName,
       quote: quoteContent,
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

    const { quoteName, quoteContent, data, redirect } = this.state;

    // To a redirection to the new quote
    if (redirect) return <Redirect to='/'/>;

    return (
      <div className={css(styles.container)}>
        <form className={css(styles.form)} onSubmit={this.addQuoteOnServer} >
          <input value={quoteName} type="text" name="name" placeholder="Nom de la quote" onChange={this.updateContent}></input>
          <input value={quoteContent} type="text" name="quote" placeholder="Contenu de la quote" onChange={this.updateContent}></input>
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

export default Quote;
