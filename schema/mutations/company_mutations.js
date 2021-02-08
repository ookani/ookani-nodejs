const { GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql');

const CompanyType = require('../types/company_type');
const CompanyController = require('../../controllers/CompanyController');

const { requireAuth } = require('../../utils');

module.exports = {
  addCompany: {
    type: CompanyType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parentValue, { name }, context) {
      requireAuth(context);
      return CompanyController.create({ name });
    },
  },
  modifyCompany: {
    type: CompanyType,
    args: {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
    },
    resolve(parentValue, { id, name }, context) {
      requireAuth(context);
      return CompanyController.update(id, { name });
    },
  },
  eliminateCompany: {
    type: CompanyType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parentValue, { id }, context) {
      requireAuth(context);
      return CompanyController.delete(id);
    },
  },
};
