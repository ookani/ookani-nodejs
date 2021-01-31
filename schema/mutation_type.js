const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');
const UserType = require('./user_type');
const CompanyType = require('./company_type');
const UserController = require('../controllers/UserController');
const CompanyController = require('../controllers/CompanyController');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }) {
        const user = new UserController();
        return user.create({ email, password });
      },
    },
    addCompany: {
      type: CompanyType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parentValue, { name }) {
        return CompanyController.create({ name });
      },
    },
    modifyCompany: {
      type: CompanyType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
      },
      resolve(parentValue, { id, name }) {
        return CompanyController.update(id, { name });
      },
    },
    eliminateCompany: {
      type: CompanyType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, { id }) {
        return CompanyController.delete(id);
      },
    },
  },
});

module.exports = Mutation;
