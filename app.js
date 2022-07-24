const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes/index');
require('dotenv').config();

const { handleError } = require('./middlewares/errors');
const limiter = require('./middlewares/rateLimit');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3030 } = process.env;

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors);
app.use(requestLogger);
app.use(limiter);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

mongoose.connect('mongodb://localhost:27017/moviesdb');
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
