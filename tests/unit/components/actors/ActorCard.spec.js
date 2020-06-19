import { createLocalVue, shallowMount } from '@vue/test-utils';
import ElementUI from 'element-ui';
import ActorCard from '../../../../components/actors/ActorCard.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('ActorCard.vue', () => {
  it('check initial data', () => {
    const wrapper = shallowMount(ActorCard, {
      localVue,
      mocks: {
        $t: () => {},
        $i18n: {
          locale: 'es',
        },
      },
      propsData: {
        actor: {
          shortname: 'John',
          image_url: 'http://path/to/image',
        },
      },
      stubs: ['el-card', 'el-row', 'el-button', 'nuxt-link', 'font-awesome-icon'],
    });
    expect(wrapper.props().actor.shortname).toBe('John');
    expect(wrapper.props().actor.image_url).toBe('http://path/to/image');
  });

  it('it should load ribbon icon', () => {
    const wrapper = shallowMount(ActorCard, {
      localVue,
      mocks: {
        $t: () => {},
        $i18n: {
          locale: 'es',
        },
      },
      propsData: {
        actor: {
          shortname: 'John',
          image_url: 'http://path/to/image',
          deathdate: '01/01/2020',
        },
      },
      stubs: ['el-card', 'el-row', 'el-button', 'nuxt-link', 'font-awesome-icon'],
    });
    expect(wrapper.props().actor.shortname).toBe('John');
    expect(wrapper.props().actor.image_url).toBe('http://path/to/image');
    expect(wrapper.props().actor.deathdate).toBe('01/01/2020');
  });
});
