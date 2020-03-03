const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const post = require('./postVeh');
const get = require('./postQuote');
const mongoose = require('mongoose');

mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true }, () => {
        console.log('connected to db');
});

app.use(bodyParser.json());

app.use('/quote', post);

app.use('/find', get);

app.listen(port, () => console.log('listening on'))