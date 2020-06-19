import { createLocalVue, shallowMount } from '@vue/test-utils';
import ElementUI from 'element-ui';
import SocialShare from '../../../components/SocialShare.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('Menu.vue', () => {
  beforeEach(() => {
    process.browser = false;
  });

  describe('check initial data', () => {
    it('it should load given data', () => {
      const wrapper = shallowMount(SocialShare, {
        localVue,
        mocks: {
          $t: () => {},
          $i18n: {
            locale: 'es',
          },
        },
        stubs: ['nuxt-link', 'router-view', 'el-submenu', 'el-menu', 'el-menu-item', 'el-aside', 'social-sharing', 'font-awesome-icon', 'network'],
        propsData: {
          title: 'Title',
          seoConfig: {
            url: 'http://url.com',
          },
        },
      });

      expect(wrapper.props().title).toEqual('Title');
      expect(wrapper.props().seoConfig.url).toEqual('http://url.com');
    });

    it('it should load default data', () => {
      const wrapper = shallowMount(SocialShare, {
        localVue,
        mocks: {
          $t: () => {},
          $i18n: {
            locale: 'es',
          },
        },
        stubs: ['nuxt-link', 'router-view', 'el-submenu', 'el-menu', 'el-menu-item', 'el-aside', 'social-sharing', 'font-awesome-icon', 'network'],
        propsData: {},
      });

      expect(wrapper.props().title).toEqual('');
      expect(wrapper.props().seoConfig).toEqual({});
    });
  });
});
