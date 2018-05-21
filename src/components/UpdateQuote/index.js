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

    updateQuoteOnServer = (e) => {
     e.preventDefault();
     const idQuote = this.props.location.pathname.split('/')[3]
     const {quoteName, quoteContent} = this.state;
     axios.post('http://localhost:3001/api/quote/update/' + idQuote, {
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

    const { data, redirect } = this.state;

    if (redirect) return <Redirect to='/'/>;

    return (
      <div className={css(styles.container)}>
        <form className={css(styles.form)} onSubmit={this.updateQuoteOnServer} >
          <input placeholder={data.name} type="text" name="name" onChange={this.updateContent}></input>
          <input placeholder={data.quote} type="text" name="quote" onChange={this.updateContent}></input>
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
