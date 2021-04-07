import axios from 'axios';
import { NETWORK_URL } from '@env';

const url = NETWORK_URL;

export async function signUp(uid) {
  try {
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
    //console.log('Get User Response:', res.data.user);
    return res.data.user;
  } catch (err) {
    console.log(err);
  }
}

export async function makeMarketBuy({ symbol, price, count, uid }) {
  try {
    const res = await axios.post(`${url}/api/users/${uid}/buy`, {
      symbol: symbol,
      quotePrice: price,
      numShares: count,
    });
    return res.data.updatedUser;
  } catch (err) {
    console.log(err);
  }
}

export async function makeMarketSell({ symbol, price, count, uid }) {
  try {
    const res = await axios.put(`${url}/api/users/${uid}/sell`, {
      symbol: symbol,
      quotePrice: price,
      numShares: count,
    });
    return res.data.updatedUser;
  } catch (err) {
    console.log(err);
  }
}

export async function getQuote(input, api) {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${input}&token=${api}`
    );
    // console.log('API RESPONSE:', response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
