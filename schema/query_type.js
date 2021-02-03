const { GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');
const CompanyType = require('./company_type');
const CompanyController = require('../controllers/CompanyController');

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    companies: {
      type: new GraphQLList(CompanyType),
      resolve() {
        return CompanyController.readAll();
      },
    },
    company: {
      type: CompanyType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, { id }) {
        return CompanyController.read(id);
      },
    },
  },
});

module.exports = Query;
