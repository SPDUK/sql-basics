const path = require('path');
const express = require('express');
const helmet = require('helmet');

require('dotenv').config();

const app = express();
const router = express.Router();
app.use(helmet());

const users = require('./routes/api/users');

app.use(express.static(path.resolve(__dirname, './client/build')));

app.use('/api/users', users);
app.use(express.static(path.join('./client/build', 'index.html')));

app.listen(process.env.PORT || 8888, () => console.log('App started!'));
