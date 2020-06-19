import { createLocalVue, shallowMount } from '@vue/test-utils';
import ElementUI from 'element-ui';
import CharacterCard from '../../../../components/characters/CharacterCard.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('CharacterCard.vue', () => {
  it('check initial data', () => {
    const wrapper = shallowMount(CharacterCard, {
      localVue,
      mocks: {
        $t: () => {},
        $i18n: {
          locale: 'es',
        },
      },
      propsData: {
        character: {
          shortname: 'John',
          image_url: 'http://path/to/image',
        },
      },
      stubs: ['el-card', 'el-row', 'el-button', 'nuxt-link'],
    });
    expect(wrapper.props().character.shortname).toBe('John');
    expect(wrapper.props().character.image_url).toBe('http://path/to/image');
  });

  it('check initial data', () => {
    const wrapper = shallowMount(CharacterCard, {
      localVue,
      mocks: {
        $t: () => {},
        $i18n: {
          locale: 'es',
        },
      },
      propsData: {
        character: {
          shortname: 'John',
          image_url: 'http://path/to/image',
          name: 'John',
          surname: 'Smith',
        },
      },
      stubs: ['el-card', 'el-row', 'el-button', 'nuxt-link'],
    });
    expect(wrapper.props().character.shortname).toBe('John');
    expect(wrapper.props().character.image_url).toBe('http://path/to/image');
    expect(wrapper.vm.characterName).toEqual('John Smith');
  });
});
