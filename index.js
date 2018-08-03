const path = require('path');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

require('dotenv').config();

const router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());

const users = require('./routes/api/users');
const email = require('./routes/api/email');

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(bodyParser.json());
app.use('/api/users', users);
app.use('/api/send', email);
app.use(express.static(path.join('./client/build', 'index.html')));

app.listen(process.env.PORT || 8888, () => console.log('App started!'));
