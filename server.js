'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Quote = require('./model/quote');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

mongoose.connect('mongodb://localhost:27017/sooonr');
// mongoose.connect('mongodb://vald:xeule2@ds125288.mlab.com:25288/esgi_test');

router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});

app.use('/api', router);

app.listen(port, function() {
 console.log(`api running on port ${port}`);
});

router.route('/quotes')
 //retrieve all quotes from the database
 .get(function(req, res) {
 //looks at our Quote Schema
 Quote.find(function(err, quotes) {
 if (err)
   res.send(err);
   //responds with a json object of our database quotes.
   res.json(quotes)
   });
 })
 //post new quote to the database
 .post(function(req, res) {
 var quote = new Quote();
 //body parser lets us use the req.body
 quote.name = req.body.name;
 quote.quote = req.body.quote;
 if (quote.name && quote.quote) {
    quote.save(function(err) {
       if (err)
         res.send(err);
         res.json({ message: 'Quote successfully added!' });
    });
 } else {
   res.json({ error: true, message: 'Missing parameters' });
 }
 });
