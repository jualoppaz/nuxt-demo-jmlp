
import Vue from 'vue';
import { state, actions, mutations } from '../../../store/chapters';

describe('store/chapters.js', () => {
  beforeEach(() => {
    Vue.anhqvClient = {};
  });

  describe('state', () => {
    expect(state()).toEqual({
      all: [],
      current: {},
    });
  });

  describe('actions', () => {
    describe('getAll', () => {
      it('it should call getChapters method and setAll mutation', (done) => {
        const expectedChapters = [
          {
            name: 'Érase un X',
            slug: '0x01',
          },
        ];

        const commit = jest.fn();

        Vue.anhqvClient.getChapters = jest.fn().mockResolvedValue({
          data: expectedChapters,
        });

        const params = {
          season: '0',
        };

        actions.getAll({ commit }, params)
          .then(() => {
            expect(Vue.anhqvClient.getChapters).toHaveBeenCalledWith(params);

            expect(commit).toHaveBeenCalledWith('setAll', expectedChapters);
            done();
          });
      });
    });

    describe('getBySlug', () => {
      it('it should call getChapterBySlug method and setCurrent mutation', (done) => {
        const expectedChapter = {
          name: 'Érase un X',
        };

        const slug = '0x01';

        const commit = jest.fn();

        Vue.anhqvClient.getChapterBySlug = jest.fn().mockResolvedValue(expectedChapter);

        actions.getBySlug({ commit }, { slug })
          .then(() => {
            expect(Vue.anhqvClient.getChapterBySlug).toHaveBeenCalledWith(slug);

            expect(commit).toHaveBeenCalledWith('setCurrent', expectedChapter);
            done();
          });
      });
    });

    describe('destroyCurrent', () => {
      it('it should call setCurrent mutation', () => {
        const commit = jest.fn();

        actions.destroyCurrent({ commit });

        expect(commit).toHaveBeenCalledWith('setCurrent', {});
      });
    });

    describe('destroyAll', () => {
      it('it should call setAll mutation', () => {
        const commit = jest.fn();

        actions.destroyAll({ commit });

        expect(commit).toHaveBeenCalledWith('setAll', []);
      });
    });
  });

  describe('mutations', () => {
    describe('setAll', () => {
      it('it should modify all state property', () => {
        const chapters = [
          {
            name: 'John Doe',
          },
        ];

        mutations.setAll(state, chapters);

        expect(state.all).toEqual(chapters);
      });
    });

    describe('setCurrent', () => {
      it('it should modify current state property', () => {
        const chapter = {
          name: 'Érase un X',
        };

        mutations.setCurrent(state, chapter);

        expect(state.current).toEqual(chapter);
      });
    });
  });
});
