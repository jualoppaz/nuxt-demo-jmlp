import Vue from 'vue';

export const state = () => ({
  currentTitle: '',
});

export const getters = {};

export const mutations = {
  setCurrentTitle(state, title) {
    Vue.set(state, 'currentTitle', title);
  },
};
