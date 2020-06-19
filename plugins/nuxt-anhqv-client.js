import Vue from 'vue';
import anhqvClient from './vueAnhqvClient';

Vue.use(anhqvClient, {
  endpoint: process.env.apiUrl,
});
