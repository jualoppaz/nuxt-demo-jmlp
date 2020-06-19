
import Vue from 'vue';
import { state, actions, mutations } from '../../../store/seo-configs';

describe('store/seo-configs.js', () => {
  beforeEach(() => {
    Vue.anhqvClient = {};
  });

  describe('state', () => {
    expect(state()).toEqual({
      currentSeoConfig: {},
    });
  });

  describe('actions', () => {
    describe('getBySlug', () => {
      it('it should call getSeoConfigBySlug method and setCurrentSeoConfig mutation', (done) => {
        const expectedSeoConfig = {
          title: 'Page title',
          description: 'Page description',
        };

        const slug = 'page-slug';

        const commit = jest.fn();

        Vue.anhqvClient.getSeoConfigBySlug = jest.fn().mockResolvedValue(expectedSeoConfig);

        actions.getSeoConfigBySlug({ commit }, { slug })
          .then(() => {
            expect(Vue.anhqvClient.getSeoConfigBySlug).toHaveBeenCalledWith(slug);

            expect(commit).toHaveBeenCalledWith('setCurrentSeoConfig', expectedSeoConfig);
            done();
          });
      });
    });
  });

  describe('mutations', () => {
    describe('setCurrentSeoConfig', () => {
      it('it should modify currentSeoConfig state property', () => {
        const seoConfig = {
          title: 'Page title',
          description: 'Page description',
        };

        mutations.setCurrentSeoConfig(state, seoConfig);

        expect(state.currentSeoConfig).toEqual(seoConfig);
      });
    });
  });
});
