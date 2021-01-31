const mongoose = require('mongoose');
const {Schema} = mongoose;

const CompanySchema = new Schema({
    name: {type: String, required: true}
});

const Company = mongoose.model('company', CompanySchema);

module.exports = Company;