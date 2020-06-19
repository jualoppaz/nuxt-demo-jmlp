import { createLocalVue, shallowMount } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Footer from '../../../../components/layout/Footer.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('Footer.vue', () => {
  it('check initial data', () => {
    const wrapper = shallowMount(Footer, {
      localVue,
      mocks: {
        $t: () => {},
      },
    });

    expect(wrapper.find('#copyright').exists()).toBeTruthy();
    expect(wrapper.find('#author').exists()).toBeTruthy();
    expect(wrapper.find('#copyright').text()).toBe('Copyright ©2020');
    expect(wrapper.find('#author').text()).toBe('👨‍💻 Juan Manuel López Pazos');
  });
});
