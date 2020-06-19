import { createLocalVue, shallowMount } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import ChapterSceneEvents from '../../../../components/chapters/ChapterSceneEvents.vue';

describe('ChapterSceneEvents.vue', () => {
  let localVue;
  let store;
  let actions;
  let state;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(ElementUI);

    state = {
      current: {
        scenes: [
          {
            events: [
              {
                type: 'DIALOG',
              },
              {
                type: 'ACTION',
              },
            ],
          },
        ],
      },
    };

    actions = {

    };

    localVue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        chapters: {
          namespaced: true,
          state,
          actions,
        },
      },
    });
  });


  describe('check initial data', () => {
    it('it should render default view as there are events', () => {
      const wrapper = shallowMount(ChapterSceneEvents, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $i18n: {
            locale: 'es',
          },
        },
        stubs: ['el-card', 'el-row', 'el-button', 'nuxt-link'],
      });

      expect(wrapper.vm.characterAvatarSize).toEqual('small');
    });

    it('it should render empty screen as there is no event', () => {
      const emptyState = {
        ...state,
        current: {
          scenes: [
            {
              title: 'Chapter title',
            },
          ],
        },
      };

      const emtpyStore = new Vuex.Store({
        modules: {
          chapters: {
            namespaced: true,
            state: emptyState,
            actions,
          },
        },
      });

      const wrapper = shallowMount(ChapterSceneEvents, {
        localVue,
        store: emtpyStore,
        mocks: {
          $t: () => {},
          $i18n: {
            locale: 'es',
          },
        },
        stubs: ['el-card', 'el-row', 'el-button', 'nuxt-link'],
      });

      expect(wrapper.find('#empty-block').exists()).toBeTruthy();
    });
  });
});
