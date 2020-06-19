import Vue from 'vue';

export const state = () => ({
  all: [],
  current: {},
});

export const getters = {};

export const actions = {
  getAll({ commit }) {
    return Vue.anhqvClient.getActors()
      .then((actors) => commit('setAll', actors.data));
  },
  getBySlug({ commit }, { slug }) {
    return Vue.anhqvClient.getActorBySlug(slug)
      .then((actor) => commit('setCurrent', actor));
  },
  destroyCurrent({ commit }) {
    return commit('setCurrent', {});
  },
  destroyAll({ commit }) {
    return commit('setAll', []);
  },
};

export const mutations = {
  setAll(state, actors) {
    Vue.set(state, 'all', actors);
  },
  setCurrent(state, actor) {
    Vue.set(state, 'current', actor);
  },
};
