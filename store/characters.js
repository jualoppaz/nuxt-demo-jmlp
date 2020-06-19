
import Vue from 'vue';

export const state = () => ({
  all: [],
  current: {},
});

export const getters = {};

export const actions = {
  getAll({ commit }) {
    return Vue.anhqvClient.getCharacters()
      .then((characters) => commit('setAll', characters.data));
  },
  getBySlug({ commit }, { slug }) {
    return Vue.anhqvClient.getCharacterBySlug(slug)
      .then((character) => commit('setCurrent', character));
  },
  destroyCurrent({ commit }) {
    return commit('setCurrent', {});
  },
  destroyAll({ commit }) {
    return commit('setAll', []);
  },
};

export const mutations = {
  setAll(state, characters) {
    Vue.set(state, 'all', characters);
  },
  setCurrent(state, character) {
    Vue.set(state, 'current', character);
  },
};
