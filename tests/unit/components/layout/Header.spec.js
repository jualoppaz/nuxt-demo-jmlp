import { createLocalVue, shallowMount } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Header from '../../../../components/layout/Header.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('Header.vue', () => {
  it('check initial data', () => {
    const wrapper = shallowMount(Header, {
      localVue,
      mocks: {
        $t: () => {},
      },
    });

    expect(wrapper.text()).toBe('ANHQV STATS');
  });
});
