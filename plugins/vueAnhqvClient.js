import anhqvClient from './anhqvClient';

export default {
  install: (Vue, options) => {
    const client = anhqvClient(options);

    Vue.anhqvClient = client;
    Vue.prototype.$anhqvClient = client;
  },
};
