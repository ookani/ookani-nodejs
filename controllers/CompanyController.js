const mongoose = require('mongoose');
const Company = mongoose.model('company');

class CompanyController {
  static async create({ name }) {
    const company = new Company({ name });
    return await company.save();
  }

  static async readAll() {
    return await Company.find({});
  }

  static async read(id) {
    return await Company.findById(id).exec();
  }

  static async update(id, { name }) {
    return await Company.findByIdAndUpdate(id, { name });
  }

  static async delete(id) {
    return await Company.findByIdAndDelete(id);
  }
}

module.exports = CompanyController;
