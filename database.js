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

  return {
    insertUser,
    getUser,
  };
};
