const { GraphQLObjectType, GraphQLList } = require('graphql');
const UserType = require('./user_type');
const UserController = require('../controllers/UserController');

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return UserController.readAll();
      },
    },
  },
});

module.exports = Query;
