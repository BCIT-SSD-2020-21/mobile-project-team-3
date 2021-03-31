import axios from 'axios';
const url = 'http://YOUR IP ADDRESS GOES HERE:3000';

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
    await axios.get(`${url}/api/${userId}`);
  } catch (err) {
    console.log(err)
  }
}

export async function marketBuy({symbol, quotePrice, numShares, datePurchased, uid}) {
  try {
    await axios.post(`${url}/api/${uid}/buy`, {
      symbol: symbol, 
        quotePrice: quotePrice, 
        numShares: numShares, 
        datePurchased: datePurchased
    });
  } catch (err) {
    console.log(err)
  }
}

export async function marketSell({symbol, quotePrice, numShares, dateSold, uid}) {
  try {
    await axios.post(`${url}/api/${uid}/sell`, {
      symbol: symbol, 
        quotePrice: quotePrice, 
        numShares: numShares, 
        dateSold: dateSold
    });
  } catch (err) {
    console.log(err)
  }
}