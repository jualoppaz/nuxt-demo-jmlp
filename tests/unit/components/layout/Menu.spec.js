import { createLocalVue, shallowMount } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Menu from '../../../../components/layout/Menu.vue';

jest.mock('../../../../utils');
// eslint-disable-next-line import/first
import utils from '../../../../utils';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('Menu.vue', () => {
  beforeEach(() => {
    process.browser = false;
  });

  describe('check initial data', () => {
    it('it should load default data', () => {
      const wrapper = shallowMount(Menu, {
        localVue,
        mocks: {
          $t: () => {},
          $i18n: {
            locale: 'es',
          },
        },
        stubs: ['nuxt-link', 'router-view', 'el-submenu', 'el-menu', 'el-menu-item', 'el-aside'],
      });
      expect(JSON.stringify(wrapper.vm.defaultOpeneds)).toBe(JSON.stringify(['4']));
      expect(wrapper.vm.isCollapsed).toBeFalsy();
    });

    it('it should execute created hook in browser', () => {
      process.browser = true;

      const methods = {
        handleResize: jest.fn(),
      };

      // eslint-disable-next-line no-unused-vars
      const wrapper = shallowMount(Menu, {
        localVue,
        mocks: {
          $t: () => {},
          $i18n: {
            locale: 'es',
          },
        },
        stubs: ['nuxt-link', 'router-view', 'el-submenu', 'el-menu', 'el-menu-item', 'el-aside'],
        methods,
      });

      expect(methods.handleResize).toHaveBeenCalled();
    });
  });

  describe('handleResize', () => {
    it('isCollapsed must be true', () => {
      utils.isMobile.mockReturnValue(true);

      const wrapper = shallowMount(Menu, {
        localVue,
        mocks: {
          $t: () => {},
          $i18n: {
            locale: 'es',
          },
        },
        stubs: ['nuxt-link', 'router-view', 'el-submenu', 'el-menu', 'el-menu-item', 'el-aside'],
      });

      wrapper.vm.handleResize();
      expect(wrapper.vm.isCollapsed).toBeTruthy();
    });

    it('isCollapsed must be false', () => {
      utils.isMobile.mockReturnValue(false);

      const wrapper = shallowMount(Menu, {
        localVue,
        mocks: {
          $t: () => {},
          $i18n: {
            locale: 'es',
          },
        },
        stubs: ['nuxt-link', 'router-view', 'el-submenu', 'el-menu', 'el-menu-item', 'el-aside'],
      });

      wrapper.vm.handleResize();
      expect(wrapper.vm.isCollapsed).toBeFalsy();
    });
  });

  it('check beforeDestroy function is called', () => {
    const wrapper = shallowMount(Menu, {
      localVue,
      mocks: {
        $t: () => {},
        $i18n: {
          locale: 'es',
        },
      },
      stubs: ['nuxt-link', 'router-view', 'el-submenu', 'el-menu', 'el-menu-item', 'el-aside'],
    });

    window.removeEventListener = jest.fn();

    wrapper.destroy();

    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
