const { GraphQLObjectType, GraphQLString } = require('graphql');
const UserType = require('./user_type');
const mongoose = require('mongoose');
const User = mongoose.model('user');

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
        const user = new User({ email, password });
        return user.save();
      },
    },
  },
});

module.exports = Mutation;
