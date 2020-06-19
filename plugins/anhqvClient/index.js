const axios = require('axios');
// const axiosAdapter = require('axios/lib/adapters/xhr');

const client = require('./client.js');

module.exports = (config) => {
  // axios.defaults.adapter = axiosAdapter;
  axios.defaults.baseURL = config.endpoint;
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  const restClient = axios.create();


  const AnhqvClient = client({
    restClient,
  });

  return new AnhqvClient();
};
