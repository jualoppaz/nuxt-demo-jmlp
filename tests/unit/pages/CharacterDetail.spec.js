import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueMeta from 'vue-meta';
import ElementUI from 'element-ui';
import CharacterDetail from '../../../pages/characters/_slug/index.vue';

jest.mock('../../../utils');
// eslint-disable-next-line import/first
import utils from '../../../utils';

describe('CharacterDetail.vue', () => {
  let localVue;
  let store;
  let actions;
  let state;

  let configsState;
  let configsMutations;

  let seoConfigState;
  let seoConfigActions;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(ElementUI);
    localVue.use(VueMeta, { keyName: 'head' });

    state = {
      current: {
        name: 'John Doe',
      },
    };

    actions = {
      getBySlug: jest.fn(),
      destroyCurrent: jest.fn(),
    };

    configsState = {
      currentTitle: '',
    };

    configsMutations = {
      setCurrentTitle: jest.fn(),
    };

    seoConfigState = {
      currentSeoConfig: {
        title: 'Character title',
        description: 'Character description',
        canonical_url: 'http://character.com',
        og_title: 'Character og:title',
        og_type: 'Character og:type',
        og_image: 'Character og:image',
        og_url: 'Character og:url',
        og_description: 'Character og:description',
        twitter_site: 'Character twitter:site',
        twitter_card: 'Character twitter:card',
      },
    };

    seoConfigActions = {
      getSeoConfigBySlug: jest.fn(),
    };

    localVue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        characters: {
          namespaced: true,
          state,
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

      const wrapper = shallowMount(CharacterDetail, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              slug: 'john-doe',
            },
          },
        },
        stubs: ['el-card', 'el-col', 'el-row', 'el-avatar'],
        methods,
      });

      expect(wrapper.vm.avatarSize).toEqual(250);
    });

    it('it should execute created hook in browser', () => {
      process.browser = true;

      const methods = {
        handleResize: jest.fn(),
      };

      // eslint-disable-next-line no-unused-vars
      const wrapper = shallowMount(CharacterDetail, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              slug: 'john-doe',
            },
          },
        },
        stubs: ['el-card', 'el-col', 'el-row', 'el-avatar'],
        methods,
      });

      expect(methods.handleResize).toHaveBeenCalled();
    });

    it('has correct <head> content', () => {
      const mockedMetas = {
        link: [
          {
            href: 'http://character.com',
            rel: 'canonical',
          },
        ],
        meta: [
          {
            content: 'Character description',
            hid: 'description',
            name: 'description',
          }, {
            content: 'Character, keywords',
            hid: 'keywords',
            name: 'keywords',
          }, {
            content: 'Character og:title',
            hid: 'og:title',
            property: 'og:title',
          }, {
            content: 'Character og:type',
            hid: 'og:type',
            property: 'og:type',
          }, {
            content: 'Character og:image',
            hid: 'og:image',
            property: 'og:image',
          }, {
            content: 'Character og:url',
            hid: 'og:url',
            property: 'og:url',
          }, {
            content: 'Character og:description',
            hid: 'og:description',
            property: 'og:description',
          }, {
            content: 'Character og:site_name',
            hid: 'og:site_name',
            property: 'og:site_name',
          }, {
            content: 'Character twitter:site',
            hid: 'twitter:site',
            name: 'twitter:site',
          }, {
            content: 'Character twitter:card',
            hid: 'twitter:card',
            name: 'twitter:card',
          }, {
            content: 'Character twitter:image',
            hid: 'twitter:image',
            name: 'twitter:image',
          }, {
            content: 'Character twitter:title',
            hid: 'twitter:title',
            name: 'twitter:title',
          }, {
            content: 'Character twitter:description',
            hid: 'twitter:description',
            name: 'twitter:description',
          },
        ],
        title: 'Character title',
      };

      utils.getCommonMetas.mockReturnValue(mockedMetas);

      const wrapper = shallowMount(CharacterDetail, {
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

      expect(title).toEqual('Character title');
      expect(descriptionMeta.content).toEqual('Character description');
      expect(keywordsMeta.content).toEqual('Character, keywords');
      expect(canonicalUrlLink.href).toEqual('http://character.com');
      expect(ogTitleMeta.content).toEqual('Character og:title');
      expect(ogTypeMeta.content).toEqual('Character og:type');
      expect(ogImageMeta.content).toEqual('Character og:image');
      expect(ogUrlMeta.content).toEqual('Character og:url');
      expect(ogSiteNameMeta.content).toEqual('Character og:site_name');
      expect(ogDescriptionMeta.content).toEqual('Character og:description');
      expect(twitterSiteMeta.content).toEqual('Character twitter:site');
      expect(twitterCardMeta.content).toEqual('Character twitter:card');
      expect(twitterImageMeta.content).toEqual('Character twitter:image');
      expect(twitterTitleMeta.content).toEqual('Character twitter:title');
      expect(twitterDescriptionMeta.content).toEqual('Character twitter:description');
    });
  });

  describe('handleResize', () => {
    it('avatarSize for mobile', () => {
      utils.isMobile.mockReturnValue(true);

      const wrapper = shallowMount(CharacterDetail, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              slug: 'john-doe',
            },
          },
        },
        stubs: ['el-card', 'el-col', 'el-row', 'el-avatar'],
      });

      wrapper.vm.handleResize();
      expect(wrapper.vm.avatarSize).toEqual(100);
    });

    it('avatarSize for desktop', () => {
      utils.isMobile.mockReturnValue(false);

      const wrapper = shallowMount(CharacterDetail, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              slug: 'john-doe',
            },
          },
        },
        stubs: ['el-card', 'el-col', 'el-row', 'el-avatar'],
      });

      wrapper.vm.handleResize();
      expect(wrapper.vm.avatarSize).toEqual(250);
    });
  });

  it('check beforeDestroy function is called', () => {
    const wrapper = shallowMount(CharacterDetail, {
      localVue,
      store,
      mocks: {
        $t: () => {},
        $route: {
          params: {
            slug: 'john-doe',
          },
        },
      },
      stubs: ['el-card', 'el-col', 'el-row', 'el-avatar'],
    });

    window.removeEventListener = jest.fn();

    wrapper.destroy();

    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
