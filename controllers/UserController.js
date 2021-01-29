const mongoose = require('mongoose');
const User = mongoose.model('user');

class UserController {
  async create({ email, password }) {
    const user = new User({ email, password });
    return await user.save();
  }

  static async readAll() {
    return await User.find({});
  }
}

module.exports = UserController;
