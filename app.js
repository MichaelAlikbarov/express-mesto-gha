const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { HTTP_STATUS_NOT_FOUND } = require('./utils/constant');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}).then(() => {
  console.log('connected to db');
});

const app = express();
app.use(helmet());
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6489e25c15a7a67d0c11471f',
  };

  next();
});

app.use(routes);

app.use('*', (req, res) => {
  res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'page not found' });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
