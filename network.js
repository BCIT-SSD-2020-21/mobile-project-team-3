import axios from 'axios';
//const url = 'http://69.172.146.7'; //SK's IP
const url = 'http://localhost:3000';

export async function signUp(uid) {
  try {
    console.log('reached network.js!');
    const res = await axios.post(`${url}/api/users`, {
      uid: uid,
    });
    console.log('new user received back on frontend!', res.data.user);
    return res.data.user;
  } catch (err) {
    console.log(err);
  }
}

export async function getUser(uid) {
  try {
    const res = await axios.get(`${url}/api/users/${uid}`);
    return res.data.user;
  } catch (err) {
    console.log(err);
  }
}

export async function marketBuy(symbol, quotePrice, numShares, uid) {
  try {
    await axios.post(`${url}/api/${uid}/buy`, {
      symbol: symbol,
      quotePrice: quotePrice,
      numShares: numShares,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function marketSell(symbol, quotePrice, numShares, uid) {
  try {
    await axios.post(`${url}/api/${uid}/sell`, {
      symbol: symbol,
      quotePrice: quotePrice,
      numShares: numShares,
    });
  } catch (err) {
    console.log(err);
  }
}
