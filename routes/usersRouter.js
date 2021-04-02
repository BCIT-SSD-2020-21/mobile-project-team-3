const express = require('express');

module.exports = function ({ database }) {
  const router = express.Router();

  //========= REGISTER USER ========== //
  router.post('/', async (req, res) => {
    const { uid } = req.body;
    console.log('reached router with uid>>', uid);

    try {
      const user = await database.insertUser(uid);
      res.send({ user });
    } catch (err) {
      console.log(err);
      res.status(401).send({ Error: err.message });
    }
  });

  //========= LOGIN USER ========== //
  // /api/users
  router.get('/', async (req, res) => {
    const { uid } = req.body;

    try {
      const user = await database.getUser(uid);
      res.send({ user });
    } catch {
      console.log(err);
      res.status(401).send({ Error: err.message });
    }
  });

  //========= MARKET BUY ========== //
  // /api/users/:uid/buy

  router.put('/:uid/buy', async (req, res) => {
    const { uid } = req.params;
    const data = req.body;
    try {
      const transaction = await database.makeMarketBuy({ uid, data });
      res.send({ transaction });
    } catch {
      console.log(err);
      res.status(401).send({ Error: err.message });
    }
  });

  //========= MARKET SELL ========== //
  // /api/users/:uid/sell

  router.put('/:uid/sell', async (req, res) => {
    const { uid } = req.params;
    const data = req.body;
    try {
      const transaction = await database.makeMarketSell({ uid, data });
      res.send({ transaction });
    } catch {
      console.log(err);
      res.status(401).send({ Error: err.message });
    }
  });

  // DESTROY

  return router;
};
