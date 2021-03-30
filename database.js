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
  const users = db.collection('users');

  async function insertUser(userInfo) {
    const { email } = userInfo;

    const result = await users.insertOne({
      email,
      timestamp: Date.now(),
    });

    return result.ops[0];
  }

  return {
    insertUser
  };
};
