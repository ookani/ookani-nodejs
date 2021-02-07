const { GraphQLNonNull, GraphQLString } = require('graphql');

const AuthPayloadType = require('../types/auth_payload_type');
const AuthPayloadController = require('../../controllers/AuthPayloadController');

module.exports = {
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
};
