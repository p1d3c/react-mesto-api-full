const bcrypt = require('bcrypt');
const User = require('../models/user');
const { getToken } = require('../middlewares/auth');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const Unauthorized = require('../errors/Unauthorized');

const SALT_ROUNDS = 10;

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      next(new NotFound('Пользователь не найден'));
      return;
    }
    res.send({ data: user });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest('Некорректный id пользователя'));
      return;
    }
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      email, password, name, about, avatar,
    } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      next(new Conflict('Пользователь уже существует'));
      return;
    }
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    let newUser = await User.create({
      email, password: hash, name, about, avatar,
    });
    newUser = newUser.toObject();
    delete newUser.password;
    res.status(201).send({ data: newUser });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest('Переданы некоректные данные'));
      return;
    }
    next(err);
  }
};

module.exports.updateUserProfile = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, about },
      { new: true, runValidators: true },
    );
    res.send({ data: updatedUser });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      return;
    }
    if (err.name === 'CastError') {
      next(new BadRequest('Пользователь не найден'));
      return;
    }
    next(err);
  }
};

module.exports.updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { avatar },
      { new: true, runValidators: true },
    );
    res.send({ data: updatedUser });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest('Переданы некорректные данные'));
      return;
    }
    if (err.name === 'CastError') {
      next(new BadRequest('Пользователь не найден'));
      return;
    }
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      next(new Unauthorized('Неправильные логин или пароль'));
      return;
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      next(new Unauthorized('Неправильные логин или пароль'));
      return;
    }

    const token = await getToken(user._id);

    res.send({ token });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest('Неправильные логин или пароль'));
      return;
    }
    next(err);
  }
};

module.exports.getMyProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};
