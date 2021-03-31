import axios from 'axios';
const url = 'http://69.172.146.7';

export async function signUp(uid) {
  try {
    await axios.post(`${url}/api/users`, uid);
  } catch (err) {
    console.log(err);
  }
}

export async function getUser(data) {
  try {
  } catch (err) {}
}
