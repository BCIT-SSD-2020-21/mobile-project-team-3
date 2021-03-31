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
      res.status(401).send({ Error: err.message });
    }
  });

  // READ
  router.get('/', async (req, res) => {
    const userDetails = req.body;

    try {
      const user = await database.getUser(userDetails.uid);
      res.send({ user });
    } catch {
      console.log(err);
      res.status(401).send({ Error: err.message });
    }
  });

  // UPDATE
  // /api/users/buy
  router.put('/buy', async (req, res) => {
    const data = req.body;
    try {
      // const user = await database.getUser();
      // res.send({ user });
    } catch {
      console.log(err);
      res.status(401).send({ Error: err.message });
    }
  });

  // /api/users/sell
  router.put('/sell', async (req, res) => {});

  // DESTROY

  return router;
};
