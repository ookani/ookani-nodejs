const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const CompanyType = new GraphQLObjectType({
  name: 'CompanyType',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

module.exports = CompanyType;
