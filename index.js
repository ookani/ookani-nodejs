const express = require('express');
const cors = require('cors');
const keys = require('./config/keys');
const { getUserId } = require('./utils');

const mongoose = require('mongoose');
mongoose.set('returnOriginal', false);
require('./models');

const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log(err));

const app = express();

app.use(cors);
app.use(
  '/graphql',
  graphqlHTTP((request, response, graphQLParams) => ({
    schema,
    graphiql: !process.env.NODE_ENV ? true : false,
    context: {
      ...request,
      userId:
        request && request.headers.authorization ? getUserId(request) : null,
    },
  }))
);

app.get('/', (req, res) => res.send('Testing Node JS API'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Express server is running...');
});
