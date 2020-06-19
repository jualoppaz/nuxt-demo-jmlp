import Vue from 'vue';

export const state = () => ({
  currentSeoConfig: {},
});

export const actions = {
  getSeoConfigBySlug({ commit }, { slug }) {
    return Vue.anhqvClient.getSeoConfigBySlug(slug)
      .then((seoConfig) => commit('setCurrentSeoConfig', seoConfig));
  },
};

export const mutations = {
  setCurrentSeoConfig(state, seoConfig) {
    Vue.set(state, 'currentSeoConfig', seoConfig);
  },
};
