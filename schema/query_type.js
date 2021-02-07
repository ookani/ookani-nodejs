const { GraphQLObjectType } = require('graphql');
const company_queries = require('./queries/company_queries');

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...company_queries,
  },
});

module.exports = Query;
