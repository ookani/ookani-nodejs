const { GraphQLObjectType, GraphQLList } = require('graphql');
const UserType = require('./user_type');
const mongoose = require('mongoose');
const User = mongoose.model('user');

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      },
    },
  },
});

module.exports = Query;
