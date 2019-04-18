const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/maame-dashboard', {
  useNewUrlParser: true,
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const users = require('./users.js');
app.use('/api/users', users.routes);

const patients = require('./patients.js');
app.use('/api/patients', patients.routes);

const comments = require('./comments.js');
app.use('/api/comments', comments.routes);

const organizations = require('./organizations.js');
app.use('/api/organizations', organizations.routes);

// TODO ensure this is the same port as in vue.config.js
const port = 3000;
app.listen(port, () => console.log('Server listening on port ' + port + '!'));
