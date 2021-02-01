const { GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');
const UserType = require('./user_type');
const CompanyType = require('./company_type');
const UserController = require('../controllers/UserController');
const CompanyController = require('../controllers/CompanyController');

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return UserController.readAll();
      },
    },
    companies: {
      type: new GraphQLList(CompanyType),
      resolve() {
        return CompanyController.readAll();
      },
    },
    company: {
      type: CompanyType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, { id }) {
        return CompanyController.read(id);
      },
    },
  },
});

module.exports = Query;
