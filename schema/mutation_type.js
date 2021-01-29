const { GraphQLObjectType, GraphQLString } = require('graphql');
const UserType = require('./user_type');
const UserController = require('../controllers/UserController');

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
  },
});

module.exports = Mutation;
