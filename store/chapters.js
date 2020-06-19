import Vue from 'vue';

export const state = () => ({
  all: [],
  current: {},
});

export const getters = {};

export const actions = {
  getAll({ commit }, params) {
    return Vue.anhqvClient.getChapters(params)
      .then((chapters) => commit('setAll', chapters.data));
  },
  getBySlug({ commit }, { slug }) {
    return Vue.anhqvClient.getChapterBySlug(slug)
      .then((chapter) => commit('setCurrent', chapter));
  },
  destroyCurrent({ commit }) {
    return commit('setCurrent', {});
  },
  destroyAll({ commit }) {
    return commit('setAll', []);
  },
};

export const mutations = {
  setAll(state, chapters) {
    Vue.set(state, 'all', chapters);
  },
  setCurrent(state, chapter) {
    Vue.set(state, 'current', chapter);
  },
};
