require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const { isAuthorized } = require('./middlewares/auth');
const { urlRegExp } = require('./utils/utils');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFound = require('./errors/NotFound');

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());

const allowedCors = [
  'http://p1d3c.mesto.nomoredomains.xyz',
  'https://p1d3c.mesto.nomoredomains.xyz',
  'http://localhost:3001',
  'https://localhost:3001',
  'http://localhost:3000',
  'https://localhost:3000',
];

app.use(express.json());

app.use(
  cors({
    origin: allowedCors,
  }),
);

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegExp),
  }),
}), createUser);

app.use(isAuthorized);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFound('Путь не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

async function handleDbConnect() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  // eslint-disable-next-line no-console
  console.log('Соединение с БД установлено');
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Слушаю ${PORT} порт`);
  });
}

handleDbConnect();
