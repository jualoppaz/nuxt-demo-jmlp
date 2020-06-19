import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueMeta from 'vue-meta';
import ElementUI from 'element-ui';
// eslint-disable-next-line no-unused-vars
import SwaggerUIBundle from 'swagger-ui';
import ApiDoc from '../../../pages/api-doc/index.vue';
// eslint-disable-next-line import/first
import utils from '../../../utils';
// eslint-disable-next-line import/first

jest.mock('../../../utils');
jest.mock('swagger-ui');

describe('ApiDoc.vue', () => {
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
        title: 'API Doc title',
        description: 'API Doc description',
        canonical_url: 'http://api-doc.com',
        og_title: 'API Doc og:title',
        og_type: 'API Doc og:type',
        og_image: 'API Doc og:image',
        og_url: 'API Doc og:url',
        og_description: 'API Doc og:description',
        twitter_site: 'API Doc twitter:site',
        twitter_card: 'API Doc twitter:card',
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
    const wrapper = shallowMount(ApiDoc, {
      localVue,
      store,
      stubs: ['nuxt-link', 'router-view', 'font-awesome-icon', 'Adsense', 'el-row', 'el-col', 'el-card', 'adsbygoogle', 'social-sharing', 'network'],
      mocks: {
        $t: () => {},
      },
    });

    expect(wrapper.find('#api-doc-text').exists()).toBeTruthy();
  });

  it('has correct <head> content', () => {
    const mockedMetas = {
      link: [
        {
          href: 'http://api-doc.com',
          rel: 'canonical',
        },
      ],
      meta: [
        {
          content: 'API Doc description',
          hid: 'description',
          name: 'description',
        }, {
          content: 'API Doc, keywords',
          hid: 'keywords',
          name: 'keywords',
        }, {
          content: 'API Doc og:title',
          hid: 'og:title',
          property: 'og:title',
        }, {
          content: 'API Doc og:type',
          hid: 'og:type',
          property: 'og:type',
        }, {
          content: 'API Doc og:image',
          hid: 'og:image',
          property: 'og:image',
        }, {
          content: 'API Doc og:url',
          hid: 'og:url',
          property: 'og:url',
        }, {
          content: 'API Doc og:description',
          hid: 'og:description',
          property: 'og:description',
        }, {
          content: 'API Doc og:site_name',
          hid: 'og:site_name',
          property: 'og:site_name',
        }, {
          content: 'API Doc twitter:site',
          hid: 'twitter:site',
          name: 'twitter:site',
        }, {
          content: 'API Doc twitter:card',
          hid: 'twitter:card',
          name: 'twitter:card',
        }, {
          content: 'API Doc twitter:image',
          hid: 'twitter:image',
          name: 'twitter:image',
        }, {
          content: 'API Doc twitter:title',
          hid: 'twitter:title',
          name: 'twitter:title',
        }, {
          content: 'API Doc twitter:description',
          hid: 'twitter:description',
          name: 'twitter:description',
        },
      ],
      title: 'API Doc title',
    };

    utils.getCommonMetas.mockReturnValue(mockedMetas);

    const wrapper = shallowMount(ApiDoc, {
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

    expect(title).toEqual('API Doc title');
    expect(descriptionMeta.content).toEqual('API Doc description');
    expect(keywordsMeta.content).toEqual('API Doc, keywords');
    expect(canonicalUrlLink.href).toEqual('http://api-doc.com');
    expect(ogTitleMeta.content).toEqual('API Doc og:title');
    expect(ogTypeMeta.content).toEqual('API Doc og:type');
    expect(ogImageMeta.content).toEqual('API Doc og:image');
    expect(ogUrlMeta.content).toEqual('API Doc og:url');
    expect(ogSiteNameMeta.content).toEqual('API Doc og:site_name');
    expect(ogDescriptionMeta.content).toEqual('API Doc og:description');
    expect(twitterSiteMeta.content).toEqual('API Doc twitter:site');
    expect(twitterCardMeta.content).toEqual('API Doc twitter:card');
    expect(twitterImageMeta.content).toEqual('API Doc twitter:image');
    expect(twitterTitleMeta.content).toEqual('API Doc twitter:title');
    expect(twitterDescriptionMeta.content).toEqual('API Doc twitter:description');
  });
});
