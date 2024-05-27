const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const { createHandler } = require('graphql-http/lib/use/express');
const { ruruHTML } = require('ruru/server');
const schema = require('./schema/schema');
dotenv.config();
const PORT = process.env.PORT || 4000;
const connectDB = require('./config/db');
const app = express();

connectDB();

app.use(cors());

app.all(
  '/graphql',
  createHandler({
    schema,
  })
);

// Serve the GraphiQL IDE.
app.get('/', (req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.listen(PORT, () => {
  console.log(`Server running on PORT : ${PORT}`);
});
