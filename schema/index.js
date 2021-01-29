const { GraphQLSchema } = require('graphql');
const query = require('./query_type');
const mutation = require('./mutation_type');

module.exports = new GraphQLSchema({
  query,
  mutation,
});
