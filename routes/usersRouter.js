const express = require('express');

module.exports = function ({ database }) {
  const router = express.Router();

  // CREATE
  router.post('/', async (req, res) => {
    console.log('REQUEST BODY:', req.body)
  })
  // READ

  // UPDATE

  // DESTROY
  
  return router;
}