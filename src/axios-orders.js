import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-64e45.firebaseio.com/'
});

export default instance;