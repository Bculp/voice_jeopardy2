'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const {resolve} = require('path')
const db = require('../db/index')

const app = express()

app.use(require('volleyball'))

module.exports = app

  // Body parsing middleware
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  
  // Serve static files from ../public
  .use(express.static(resolve(__dirname, '..', 'public')))

  // Serve our api
  .use('/api', require('./api'))

  // Send index.html for anything else.
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
    console.log('Listening to port 3000');
});
