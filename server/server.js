const express = require('express');
const dotenv = require('dotenv');
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require('./schema/schema');
dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();

app.use(
  '/graphql',
  createHandler({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(PORT, () => {
  console.log(`Server running on PORT : ${PORT}`);
});
