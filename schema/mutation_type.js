const { GraphQLObjectType } = require('graphql');
const auth_payload_mutations = require('./mutations/auth_payload_mutations');
const company_mutations = require('./mutations/company_mutations');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...auth_payload_mutations,
    ...company_mutations,
  },
});

module.exports = Mutation;
