const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} = require('graphql');
const AuthPayloadType = require('./auth_payload_type');
const CompanyType = require('./company_type');
const AuthPayloadController = require('../controllers/AuthPayloadController');
const CompanyController = require('../controllers/CompanyController');
const { requireAuth } = require('../utils');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: AuthPayloadType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { email, password }) {
        return AuthPayloadController.signUp({ email, password });
      },
    },
    login: {
      type: AuthPayloadType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { email, password }) {
        return AuthPayloadController.logIn({ email, password });
      },
    },
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
  },
});

module.exports = Mutation;
