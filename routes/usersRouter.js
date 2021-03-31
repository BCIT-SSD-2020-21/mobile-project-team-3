const express = require('express');

module.exports = function ({ database }) {
  const router = express.Router();

  // CREATE
  router.post('/', async (req, res) => {
    const userDetails = req.body;

    try {
      const user = await database.insertUser(userDetails);
      res.send({ user });
    } catch (err) {
      console.log(err);
      res.status(401).send({ error: err.message });
    }
  });
  // READ

  // UPDATE

  // DESTROY

  return router;
};
