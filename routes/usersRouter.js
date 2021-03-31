const express = require('express');

module.exports = function ({ database }) {
  const router = express.Router();

  // CREATE
  //========= REGISTER USER ========== //
  router.post('/', async (req, res) => {
    const uid = req.body;

    try {
      const user = await database.insertUser(uid);
      res.send({ user });
    } catch (err) {
      console.log(err);
      res.status(401).send({ Error: err.message });
    }
  });

  // READ
  //========= LOGIN USER ========== //
  // /api/users
  router.get('/', async (req, res) => {
    const { uid } = req.params;
    console.log();

    try {
      const user = await database.getUser(userDetails.uid);
      res.send({ user });
    } catch {
      console.log(err);
      res.status(401).send({ Error: err.message });
    }
  });

  // UPDATE
  //========= MARKET BUY ========== //
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

  //========= MARKET SELL ========== //
  // /api/users/sell

  router.put('/sell', async (req, res) => {});

  // DESTROY

  return router;
};
