import axios from 'axios';

export default axios.create({
  baseURL: 'http://127.0.0.1:3001/',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, DELETE, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': '*',
  },
});
