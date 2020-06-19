import { createLocalVue, shallowMount } from '@vue/test-utils';
import ElementUI from 'element-ui';
import ChapterCard from '../../../../components/chapters/ChapterCard.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('ChapterCard.vue', () => {
  it('check initial data', () => {
    const wrapper = shallowMount(ChapterCard, {
      localVue,
      mocks: {
        $t: () => {},
        $i18n: {
          locale: 'es',
        },
      },
      propsData: {
        chapter: {
          name: 'Érase un X',
          image_url: 'http://path/to/image',
        },
      },
      stubs: ['el-card', 'el-row', 'el-button', 'nuxt-link'],
    });
    expect(wrapper.props().chapter.name).toBe('Érase un X');
    expect(wrapper.props().chapter.image_url).toBe('http://path/to/image');
  });
});
