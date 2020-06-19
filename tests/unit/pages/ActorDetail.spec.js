import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueMeta from 'vue-meta';
import ElementUI from 'element-ui';
import ActorDetail from '../../../pages/actors/_slug/index.vue';

jest.mock('../../../utils');
// eslint-disable-next-line import/first
import utils from '../../../utils';

describe('ActorDetail.vue', () => {
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
        title: 'Actor title',
        description: 'Actor description',
        canonical_url: 'http://actor.com',
        og_title: 'Actor og:title',
        og_type: 'Actor og:type',
        og_image: 'Actor og:image',
        og_url: 'Actor og:url',
        og_description: 'Actor og:description',
        twitter_site: 'Actor twitter:site',
        twitter_card: 'Actor twitter:card',
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

      const wrapper = shallowMount(ActorDetail, {
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
        stubs: ['el-card', 'el-row', 'el-col', 'el-avatar'],
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
      const wrapper = shallowMount(ActorDetail, {
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
        stubs: ['el-card', 'el-row', 'el-col', 'el-avatar'],
        methods,
      });

      expect(methods.handleResize).toHaveBeenCalled();
    });

    it('has correct <head> content', () => {
      const mockedMetas = {
        link: [
          {
            href: 'http://actor.com',
            rel: 'canonical',
          },
        ],
        meta: [
          {
            content: 'Actor description',
            hid: 'description',
            name: 'description',
          }, {
            content: 'Actor, keywords',
            hid: 'keywords',
            name: 'keywords',
          }, {
            content: 'Actor og:title',
            hid: 'og:title',
            property: 'og:title',
          }, {
            content: 'Actor og:type',
            hid: 'og:type',
            property: 'og:type',
          }, {
            content: 'Actor og:image',
            hid: 'og:image',
            property: 'og:image',
          }, {
            content: 'Actor og:url',
            hid: 'og:url',
            property: 'og:url',
          }, {
            content: 'Actor og:description',
            hid: 'og:description',
            property: 'og:description',
          }, {
            content: 'Actor og:site_name',
            hid: 'og:site_name',
            property: 'og:site_name',
          }, {
            content: 'Actor twitter:site',
            hid: 'twitter:site',
            name: 'twitter:site',
          }, {
            content: 'Actor twitter:card',
            hid: 'twitter:card',
            name: 'twitter:card',
          }, {
            content: 'Actor twitter:image',
            hid: 'twitter:image',
            name: 'twitter:image',
          }, {
            content: 'Actor twitter:title',
            hid: 'twitter:title',
            name: 'twitter:title',
          }, {
            content: 'Actor twitter:description',
            hid: 'twitter:description',
            name: 'twitter:description',
          },
        ],
        title: 'Actor title',
      };

      utils.getCommonMetas.mockReturnValue(mockedMetas);

      const wrapper = shallowMount(ActorDetail, {
        localVue,
        store,
        stubs: ['nuxt-link', 'router-view', 'font-awesome-icon', 'Adsense', 'el-row', 'el-col', 'el-card', 'adsbygoogle'],
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

      expect(title).toEqual('Actor title');
      expect(descriptionMeta.content).toEqual('Actor description');
      expect(keywordsMeta.content).toEqual('Actor, keywords');
      expect(canonicalUrlLink.href).toEqual('http://actor.com');
      expect(ogTitleMeta.content).toEqual('Actor og:title');
      expect(ogTypeMeta.content).toEqual('Actor og:type');
      expect(ogImageMeta.content).toEqual('Actor og:image');
      expect(ogUrlMeta.content).toEqual('Actor og:url');
      expect(ogSiteNameMeta.content).toEqual('Actor og:site_name');
      expect(ogDescriptionMeta.content).toEqual('Actor og:description');
      expect(twitterSiteMeta.content).toEqual('Actor twitter:site');
      expect(twitterCardMeta.content).toEqual('Actor twitter:card');
      expect(twitterImageMeta.content).toEqual('Actor twitter:image');
      expect(twitterTitleMeta.content).toEqual('Actor twitter:title');
      expect(twitterDescriptionMeta.content).toEqual('Actor twitter:description');
    });
  });

  describe('handleResize', () => {
    it('avatarSize for mobile', () => {
      utils.isMobile.mockReturnValue(true);

      const wrapper = shallowMount(ActorDetail, {
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
        stubs: ['el-card', 'el-row', 'el-col', 'el-avatar'],
      });

      wrapper.vm.handleResize();
      expect(wrapper.vm.avatarSize).toEqual(100);
    });

    it('avatarSize for desktop', () => {
      utils.isMobile.mockReturnValue(false);

      const wrapper = shallowMount(ActorDetail, {
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
        stubs: ['el-card', 'el-row', 'el-col', 'el-avatar'],
      });

      wrapper.vm.handleResize();
      expect(wrapper.vm.avatarSize).toEqual(250);
    });
  });

  it('check beforeDestroy function is called', () => {
    const wrapper = shallowMount(ActorDetail, {
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
      stubs: ['el-card', 'el-row', 'el-col', 'el-avatar'],
    });

    window.removeEventListener = jest.fn();

    wrapper.destroy();

    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
