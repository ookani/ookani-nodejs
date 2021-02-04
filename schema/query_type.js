const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
} = require('graphql');
const CompanyType = require('./company_type');
const CompanyController = require('../controllers/CompanyController');
const { requireAuth } = require('../utils');

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    companies: {
      type: new GraphQLList(CompanyType),
      resolve(parentValue, args, context) {
        requireAuth(context);
        return CompanyController.readAll();
      },
    },
    company: {
      type: CompanyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { id }, context) {
        requireAuth(context);
        return CompanyController.read(id);
      },
    },
  },
});

module.exports = Query;
