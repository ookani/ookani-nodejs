const express = require('express');
const keys = require('./config/keys');

const mongoose = require('mongoose');
require('./models');

const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log(err));

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Express server is running...');
});
