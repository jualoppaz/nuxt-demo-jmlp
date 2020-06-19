import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueMeta from 'vue-meta';
import ElementUI from 'element-ui';
import Season from '../../../pages/seasons/index.vue';

jest.mock('../../../utils');
// eslint-disable-next-line import/first
import utils from '../../../utils';

describe('Season.vue', () => {
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

    seoConfigState = {
      currentSeoConfig: {
        title: 'Chapters title',
        description: 'Chapters description',
        canonical_url: 'http://chapters.com',
        og_title: 'Chapters og:title',
        og_type: 'Chapters og:type',
        og_image: 'Chapters og:image',
        og_url: 'Chapters og:url',
        og_description: 'Chapters og:description',
        twitter_site: 'Chapters twitter:site',
        twitter_card: 'Chapters twitter:card',
      },
    };

    seoConfigActions = {
      getSeoConfigBySlug: jest.fn(),
    };

    localVue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        chapters: {
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

      const wrapper = shallowMount(Season, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              season_number: () => '0',
            },
          },
        },
        stubs: ['el-row'],
        methods,
      });

      expect(wrapper.vm.gutter).toEqual(50);
    });

    it('it should execute created hook in browser', () => {
      process.browser = true;

      const methods = {
        handleResize: jest.fn(),
      };

      // eslint-disable-next-line no-unused-vars
      const wrapper = shallowMount(Season, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              season_number: () => '0',
            },
          },
        },
        stubs: ['el-row'],
        methods,
      });

      expect(methods.handleResize).toHaveBeenCalled();
    });

    it('has correct <head> content', () => {
      const mockedMetas = {
        link: [
          {
            href: 'http://season.com',
            rel: 'canonical',
          },
        ],
        meta: [
          {
            content: 'Season description',
            hid: 'description',
            name: 'description',
          }, {
            content: 'Season, keywords',
            hid: 'keywords',
            name: 'keywords',
          }, {
            content: 'Season og:title',
            hid: 'og:title',
            property: 'og:title',
          }, {
            content: 'Season og:type',
            hid: 'og:type',
            property: 'og:type',
          }, {
            content: 'Season og:image',
            hid: 'og:image',
            property: 'og:image',
          }, {
            content: 'Season og:url',
            hid: 'og:url',
            property: 'og:url',
          }, {
            content: 'Season og:description',
            hid: 'og:description',
            property: 'og:description',
          }, {
            content: 'Season og:site_name',
            hid: 'og:site_name',
            property: 'og:site_name',
          }, {
            content: 'Season twitter:site',
            hid: 'twitter:site',
            name: 'twitter:site',
          }, {
            content: 'Season twitter:card',
            hid: 'twitter:card',
            name: 'twitter:card',
          }, {
            content: 'Season twitter:image',
            hid: 'twitter:image',
            name: 'twitter:image',
          }, {
            content: 'Season twitter:title',
            hid: 'twitter:title',
            name: 'twitter:title',
          }, {
            content: 'Season twitter:description',
            hid: 'twitter:description',
            name: 'twitter:description',
          },
        ],
        title: 'Season title',
      };

      utils.getCommonMetas.mockReturnValue(mockedMetas);

      const wrapper = shallowMount(Season, {
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

      expect(title).toEqual('Season title');
      expect(descriptionMeta.content).toEqual('Season description');
      expect(keywordsMeta.content).toEqual('Season, keywords');
      expect(canonicalUrlLink.href).toEqual('http://season.com');
      expect(ogTitleMeta.content).toEqual('Season og:title');
      expect(ogTypeMeta.content).toEqual('Season og:type');
      expect(ogImageMeta.content).toEqual('Season og:image');
      expect(ogUrlMeta.content).toEqual('Season og:url');
      expect(ogSiteNameMeta.content).toEqual('Season og:site_name');
      expect(ogDescriptionMeta.content).toEqual('Season og:description');
      expect(twitterSiteMeta.content).toEqual('Season twitter:site');
      expect(twitterCardMeta.content).toEqual('Season twitter:card');
      expect(twitterImageMeta.content).toEqual('Season twitter:image');
      expect(twitterTitleMeta.content).toEqual('Season twitter:title');
      expect(twitterDescriptionMeta.content).toEqual('Season twitter:description');
    });
  });

  describe('handleResize', () => {
    it('gutter for mobile', () => {
      utils.isMobile.mockReturnValue(true);

      const wrapper = shallowMount(Season, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              season_number: () => '0',
            },
          },
        },
        stubs: ['el-row'],
      });

      wrapper.vm.handleResize();
      expect(wrapper.vm.gutter).toEqual(20);
    });

    it('gutter for desktop', () => {
      utils.isMobile.mockReturnValue(false);

      const wrapper = shallowMount(Season, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              season_number: () => '0',
            },
          },
        },
        stubs: ['el-row'],
      });

      wrapper.vm.handleResize();
      expect(wrapper.vm.gutter).toEqual(50);
    });
  });

  it('check beforeDestroy function is called', () => {
    const wrapper = shallowMount(Season, {
      localVue,
      store,
      mocks: {
        $t: () => {},
        $route: {
          params: {
            season_number: () => '0',
          },
        },
      },
      stubs: ['el-row'],
    });

    window.removeEventListener = jest.fn();

    wrapper.destroy();

    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
