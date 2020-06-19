import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueMeta from 'vue-meta';
import ElementUI from 'element-ui';
import Home from '../../../pages/index.vue';

jest.mock('../../../utils');
// eslint-disable-next-line import/first
import utils from '../../../utils';

describe('Home.vue', () => {
  let localVue;
  let store;

  let configsState;
  let configsMutations;

  let seoConfigState;
  let seoConfigActions;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(ElementUI);
    localVue.use(VueMeta, { keyName: 'head' });

    configsState = {
      currentTitle: '',
    };

    configsMutations = {
      setCurrentTitle: jest.fn(),
    };

    seoConfigState = {
      currentSeoConfig: {
        title: 'Home title',
        description: 'Home description',
        canonical_url: 'http://home.com',
        og_title: 'Home og:title',
        og_type: 'Home og:type',
        og_image: 'Home og:image',
        og_url: 'Home og:url',
        og_description: 'Home og:description',
        twitter_site: 'Home twitter:site',
        twitter_card: 'Home twitter:card',
      },
    };

    seoConfigActions = {
      getSeoConfigBySlug: jest.fn(),
    };

    localVue.use(Vuex);

    store = new Vuex.Store({
      modules: {
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

  it('check initial data', () => {
    const wrapper = shallowMount(Home, {
      localVue,
      store,
      stubs: ['nuxt-link', 'router-view', 'font-awesome-icon', 'Adsense', 'el-row', 'el-col', 'el-card', 'adsbygoogle', 'social-sharing', 'network'],
      mocks: {
        $t: () => {},
      },
    });

    expect(wrapper.find('#welcome-image').exists()).toBeTruthy();
  });

  it('has correct <head> content', () => {
    const mockedMetas = {
      link: [
        {
          href: 'http://home.com',
          rel: 'canonical',
        },
      ],
      meta: [
        {
          content: 'Home description',
          hid: 'description',
          name: 'description',
        }, {
          content: 'Home, keywords',
          hid: 'keywords',
          name: 'keywords',
        }, {
          content: 'Home og:title',
          hid: 'og:title',
          property: 'og:title',
        }, {
          content: 'Home og:type',
          hid: 'og:type',
          property: 'og:type',
        }, {
          content: 'Home og:image',
          hid: 'og:image',
          property: 'og:image',
        }, {
          content: 'Home og:url',
          hid: 'og:url',
          property: 'og:url',
        }, {
          content: 'Home og:description',
          hid: 'og:description',
          property: 'og:description',
        }, {
          content: 'Home og:site_name',
          hid: 'og:site_name',
          property: 'og:site_name',
        }, {
          content: 'Home twitter:site',
          hid: 'twitter:site',
          name: 'twitter:site',
        }, {
          content: 'Home twitter:card',
          hid: 'twitter:card',
          name: 'twitter:card',
        }, {
          content: 'Home twitter:image',
          hid: 'twitter:image',
          name: 'twitter:image',
        }, {
          content: 'Home twitter:title',
          hid: 'twitter:title',
          name: 'twitter:title',
        }, {
          content: 'Home twitter:description',
          hid: 'twitter:description',
          name: 'twitter:description',
        },
      ],
      title: 'Home title',
    };

    utils.getCommonMetas.mockReturnValue(mockedMetas);

    const wrapper = shallowMount(Home, {
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

    expect(title).toEqual('Home title');
    expect(descriptionMeta.content).toEqual('Home description');
    expect(keywordsMeta.content).toEqual('Home, keywords');
    expect(canonicalUrlLink.href).toEqual('http://home.com');
    expect(ogTitleMeta.content).toEqual('Home og:title');
    expect(ogTypeMeta.content).toEqual('Home og:type');
    expect(ogImageMeta.content).toEqual('Home og:image');
    expect(ogUrlMeta.content).toEqual('Home og:url');
    expect(ogSiteNameMeta.content).toEqual('Home og:site_name');
    expect(ogDescriptionMeta.content).toEqual('Home og:description');
    expect(twitterSiteMeta.content).toEqual('Home twitter:site');
    expect(twitterCardMeta.content).toEqual('Home twitter:card');
    expect(twitterImageMeta.content).toEqual('Home twitter:image');
    expect(twitterTitleMeta.content).toEqual('Home twitter:title');
    expect(twitterDescriptionMeta.content).toEqual('Home twitter:description');
  });
});
