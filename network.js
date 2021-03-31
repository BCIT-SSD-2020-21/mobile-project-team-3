import axios from 'axios';
const url = 'http://YOUR IP ADDRESS GOES HERE:3000';

export async function signUp(data) {
  try {
    await axios.post(`${url}/api/users`, data);
  } catch (err) {
    console.log(err)
  }
}

export async function login(data) {
  try {

  } catch (err) {

  }
}