import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueMeta from 'vue-meta';
import ElementUI from 'element-ui';
import Actors from '../../../pages/actors/index.vue';

jest.mock('../../../utils');
// eslint-disable-next-line import/first
import utils from '../../../utils';

describe('Actors.vue', () => {
  let localVue;
  let store;
  let actions;

  let configsState;
  let configsMutations;

  let seoConfigState;
  let seoConfigActions;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(ElementUI);
    localVue.use(VueMeta, { keyName: 'head' });

    actions = {
      getAll: jest.fn(),
      destroyAll: jest.fn(),
    };

    configsState = {
      currentTitle: '',
    };

    configsMutations = {
      setCurrentTitle: jest.fn(),
    };

    seoConfigState = {
      currentSeoConfig: {
        title: 'Actors title',
        description: 'Actors description',
        canonical_url: 'http://actors.com',
        og_title: 'Actors og:title',
        og_type: 'Actors og:type',
        og_image: 'Actors og:image',
        og_url: 'Actors og:url',
        og_description: 'Actors og:description',
        twitter_site: 'Actors twitter:site',
        twitter_card: 'Actors twitter:card',
      },
    };

    seoConfigActions = {
      getSeoConfigBySlug: jest.fn(),
    };

    localVue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        actors: {
          namespaced: true,
          actions,
        },
        configs: {
          namespaced: true,
          state: configsState,
          mutations: configsMutations,
        },
        'seo-configs': {
          namespaced: true,
          state: seoConfigState,
          actions: seoConfigActions,
        },
      },
    });
  });

  beforeEach(() => {
    process.browser = false;
  });

  describe('check initial data', () => {
    it('it should load default data', () => {
      const methods = {
        handleResize: jest.fn(),
      };

      // eslint-disable-next-line no-unused-vars
      const wrapper = shallowMount(Actors, {
        localVue,
        store,
        mocks: {
          $t: () => {},
        },
        stubs: ['nuxt-link', 'router-view', 'el-row'],
        methods,
      });
    });

    it('it should execute created hook in browser', () => {
      process.browser = true;

      const methods = {
        handleResize: jest.fn(),
      };

      // eslint-disable-next-line no-unused-vars
      const wrapper = shallowMount(Actors, {
        localVue,
        store,
        mocks: {
          $t: () => {},
        },
        stubs: ['nuxt-link', 'router-view', 'el-row'],
        methods,
      });

      expect(methods.handleResize).toHaveBeenCalled();
    });

    it('has correct <head> content', () => {
      const mockedMetas = {
        link: [
          {
            href: 'http://actors.com',
            rel: 'canonical',
          },
        ],
        meta: [
          {
            content: 'Actors description',
            hid: 'description',
            name: 'description',
          }, {
            content: 'Actors, keywords',
            hid: 'keywords',
            name: 'keywords',
          }, {
            content: 'Actors og:title',
            hid: 'og:title',
            property: 'og:title',
          }, {
            content: 'Actors og:type',
            hid: 'og:type',
            property: 'og:type',
          }, {
            content: 'Actors og:image',
            hid: 'og:image',
            property: 'og:image',
          }, {
            content: 'Actors og:url',
            hid: 'og:url',
            property: 'og:url',
          }, {
            content: 'Actors og:description',
            hid: 'og:description',
            property: 'og:description',
          }, {
            content: 'Actors og:site_name',
            hid: 'og:site_name',
            property: 'og:site_name',
          }, {
            content: 'Actors twitter:site',
            hid: 'twitter:site',
            name: 'twitter:site',
          }, {
            content: 'Actors twitter:card',
            hid: 'twitter:card',
            name: 'twitter:card',
          }, {
            content: 'Actors twitter:image',
            hid: 'twitter:image',
            name: 'twitter:image',
          }, {
            content: 'Actors twitter:title',
            hid: 'twitter:title',
            name: 'twitter:title',
          }, {
            content: 'Actors twitter:description',
            hid: 'twitter:description',
            name: 'twitter:description',
          },
        ],
        title: 'Actors title',
      };

      utils.getCommonMetas.mockReturnValue(mockedMetas);

      const wrapper = shallowMount(Actors, {
        localVue,
        store,
        stubs: ['nuxt-link', 'router-view', 'font-awesome-icon', 'Adsense', 'el-row', 'el-col', 'el-card', 'adsbygoogle', 'social-sharing', 'network'],
        mocks: {
          $t: () => {},
        },
      });

      const { title } = wrapper.vm.$metaInfo;
      const descriptionMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'description',
      );
      const keywordsMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'keywords',
      );
      const canonicalUrlLink = wrapper.vm.$metaInfo.link.find(
        (item) => item.rel === 'canonical',
      );
      const ogTitleMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'og:title',
      );
      const ogTypeMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'og:type',
      );
      const ogImageMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'og:image',
      );
      const ogUrlMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'og:url',
      );
      const ogDescriptionMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'og:description',
      );
      const ogSiteNameMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'og:site_name',
      );
      const twitterSiteMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'twitter:site',
      );
      const twitterCardMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'twitter:card',
      );
      const twitterImageMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'twitter:image',
      );
      const twitterTitleMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'twitter:title',
      );
      const twitterDescriptionMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'twitter:description',
      );

      expect(title).toEqual('Actors title');
      expect(descriptionMeta.content).toEqual('Actors description');
      expect(keywordsMeta.content).toEqual('Actors, keywords');
      expect(canonicalUrlLink.href).toEqual('http://actors.com');
      expect(ogTitleMeta.content).toEqual('Actors og:title');
      expect(ogTypeMeta.content).toEqual('Actors og:type');
      expect(ogImageMeta.content).toEqual('Actors og:image');
      expect(ogUrlMeta.content).toEqual('Actors og:url');
      expect(ogSiteNameMeta.content).toEqual('Actors og:site_name');
      expect(ogDescriptionMeta.content).toEqual('Actors og:description');
      expect(twitterSiteMeta.content).toEqual('Actors twitter:site');
      expect(twitterCardMeta.content).toEqual('Actors twitter:card');
      expect(twitterImageMeta.content).toEqual('Actors twitter:image');
      expect(twitterTitleMeta.content).toEqual('Actors twitter:title');
      expect(twitterDescriptionMeta.content).toEqual('Actors twitter:description');
    });
  });

  describe('handleResize', () => {
    it('gutter for mobile', () => {
      utils.isMobile.mockReturnValue(true);

      const wrapper = shallowMount(Actors, {
        localVue,
        store,
        mocks: {
          $t: () => {},
        },
        stubs: ['nuxt-link', 'router-view', 'el-row'],
      });

      wrapper.vm.handleResize();
      expect(wrapper.vm.gutter).toEqual(20);
    });

    it('gutter for desktop', () => {
      utils.isMobile.mockReturnValue(false);

      const wrapper = shallowMount(Actors, {
        localVue,
        store,
        mocks: {
          $t: () => {},
        },
        stubs: ['nuxt-link', 'router-view', 'el-row'],
      });

      wrapper.vm.handleResize();
      expect(wrapper.vm.gutter).toEqual(50);
    });
  });

  it('check beforeDestroy function is called', () => {
    const wrapper = shallowMount(Actors, {
      localVue,
      store,
      mocks: {
        $t: () => {},
      },
      stubs: ['nuxt-link', 'router-view', 'el-row'],
    });

    window.removeEventListener = jest.fn();

    wrapper.destroy();

    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
