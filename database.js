const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'robDemGood';
const client = new MongoClient(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

module.exports = async function () {
  await client.connect();

  const db = client.db(dbName);
  const Users = db.collection('users');

  //========= REGISTER USER ========== //

  async function insertUser(uid) {
    const user = await Users.findOne({ uid: uid });
    if (user) {
      throw Error('User already exists. Please try again.');
    }

    const newUser = await Users.insertOne({
      uid: uid,
      dateJoined: Date.now(),
      cash: 50000,
      marketBuys: [],
      marketSells: [],
      portfolio: [],
    });
    console.log('new user in db.js', newUser.ops[0]);

    return newUser.ops[0];
  }

  //========= LOGIN USER ========== //
  async function getUser(uid) {
    const foundUser = await Users.findOne({ uid: uid });

    if (!foundUser) {
      throw Error('No user found!');
    }

    return foundUser;
  }

  //========= MARKET BUY ========== //
  async function makeMarketBuy({ uid, data }) {
    const { symbol, quotePrice, numShares } = data;
    //find user in db
    const user = await Users.findOne({ uid: uid });

    //check to see if enough funds
    const price = quotePrice * numShares;
    if (price > user.cash) {
      throw Error('Insufficient Funds');
    }

    //add record to user's marketBuys array
    const transaction = {
      symbol,
      quotePrice,
      numShares,
      datePurchased: Date.now(),
    };
    user.marketBuys.push(transaction);

    //update user's portfolio (if symbol is not in portfolio,
    //add it; else update quantity of symbol in portfolio )
    const existingStock = user.portfolio.findOne((p) => {
      p.symbol === symbol;
    });

    if (!existingStock) {
      user.portfolio.push({ symbol, numShares });
    } else {
      existingStock.numShares += numShares; //this will not work
    }

    //Update user in database
    const updatedUser = await Users.findOneAndReplace({ uid: uid }, user);

    return updatedUser;
  }

  //========= MARKET SELL ========== //
  async function makeMarketSell() {
    const { symbol, quotePrice, numShares } = data;
    //find user in db
    const user = await Users.findOne({ uid: uid });

    //check to see user owns enough stocks
    const existingShares = user.portfolio.findOne((s) => {
      s.symbol === symbol;
    });

    if (!existingShares) {
      throw Error('You do not own this stock');
    }

    if (existingShares.numShares < numShares) {
      throw Error('Insufficient shares for this transaction');
    }

    //add record to user's marketSells array
    const transaction = {
      symbol,
      quotePrice,
      numShares,
      datePurchased: Date.now(),
    };
    user.marketSells.push(transaction);

    //update user's portfolio (if numShares for a symbol === 0, remove from portfolio )

    if (existingShares.numShares === numShares) {
      //remove from portfolio
    } else {
      existingShares;
    }

    if (!existingStock) {
      user.portfolio.push({ symbol, numShares });
    } else {
      existingStock.numShares -= numShares;
    }

    //Update user in database
    const updatedUser = await Users.findOneAndReplace({ uid: uid }, user);

    return updatedUser;
  }

  return {
    insertUser,
    getUser,
    makeMarketBuy,
    makeMarketSell,
  };
};
