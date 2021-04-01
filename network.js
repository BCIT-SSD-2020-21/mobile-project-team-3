import axios from 'axios';

const url = 'http://192.168.0.188:3000';
// const url = 'http://YOUR IP ADDRESS GOES HERE:3000';

export async function signUp(uid) {
  try {
    await axios.post(`${url}/api/users`, {
      uid: uid
    });
  } catch (err) {
    console.log(err)
  }
}

export async function getUser(uid) {
  try {
    const result = await axios.get(`${url}/api/${uid}`);
    return result
  } catch (err) {
    console.log(err)
  }
}

export async function marketBuy(symbol, quotePrice, numShares, uid) {
  try {
    await axios.post(`${url}/api/${uid}/buy`, {
      symbol: symbol, 
        quotePrice: quotePrice, 
        numShares: numShares
    });
  } catch (err) {
    console.log(err)
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
    console.log(err)
  }
}