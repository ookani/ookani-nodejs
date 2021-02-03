const mongoose = require('mongoose');
const User = mongoose.model('user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

class AuthPayloadController {
  static async signUp({ email, password }) {
    try {
      if (!email || !password) {
        throw new Error('You need to provide email and password.');
      }

      const existingUser = await User.findOne({ email }).exec();

      if (existingUser) {
        throw new Error('Email is already registered.');
      }

      const hash = await bcrypt.hash(password, 10);

      const user = new User({ email, password: hash });
      await user.save();

      const token = jwt.sign({ userId: user.id }, keys.secret);

      return {
        token,
        user,
      };
    } catch (error) {
      return error;
    }
  }

  static async logIn({ email, password }) {
    try {
      if (!email || !password) {
        throw new Error('You need to provide email and password.');
      }

      const user = await User.findOne({ email }).exec();

      if (!user) {
        throw new Error('Email is not registered.');
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new Error('Invalid credentials.');
      }

      const token = jwt.sign({ userId: user.id }, keys.secret);

      return {
        token,
        user,
      };
    } catch (error) {
      return error;
    }
  }
}

module.exports = AuthPayloadController;
