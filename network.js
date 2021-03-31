import axios from 'axios';

export async function signUp(data) {
  try {
    const response = await axios.get('/api/users', data);
  } catch (err) {
    console.log('Error from network.js:', err)
  }
}