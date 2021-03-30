const express = require('express');
const app = express();
const mongoDatabase = require('./database');
const makeUsersRouter = require('./routes/usersRouter');

app.use(express.json());

mongoDatabase().then((database) => {
  const usersRouter = makeUsersRouter({
    database,
  });
  app.use('/api/users', usersRouter);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});
