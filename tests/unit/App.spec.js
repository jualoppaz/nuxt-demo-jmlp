import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import App from '../../layouts/default.vue';

jest.mock('vue-adblock-detect', () => ({
  methods: {
    detectAdBlock: jest.fn().mockResolvedValue(true),
  },
}));

describe('App.vue', () => {
  let localVue;
  let state;
  let mutations;
  let store;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(ElementUI);

    state = {
      currentTitle: '',
    };

    mutations = {
      setCurrentTitle: jest.fn(),
    };

    localVue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        configs: {
          namespaced: true,
          state,
          mutations,
        },
      },
    });
  });

  it('check header border-bottom', () => {
    // eslint-disable-next-line no-unused-vars
    const wrapper = shallowMount(App, {
      localVue,
      store,
      mocks: {
        $t: () => {},
        $i18n: {},
      },
      stubs: ['nuxt-link', 'router-view', 'nuxt', 'el-container', 'el-header', 'el-main', 'el-footer', 'Menu'],
    });
  });
});
