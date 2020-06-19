
import Vue from 'vue';
import { state, actions, mutations } from '../../../store/characters';

describe('store/characters.js', () => {
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
      it('it should call getCharacters method and setAll mutation', (done) => {
        const expectedCharacters = [
          {
            name: 'John Doe',
          },
        ];

        const commit = jest.fn();

        Vue.anhqvClient.getCharacters = jest.fn().mockResolvedValue({
          data: expectedCharacters,
        });

        actions.getAll({ commit })
          .then(() => {
            expect(Vue.anhqvClient.getCharacters).toHaveBeenCalled();

            expect(commit).toHaveBeenCalledWith('setAll', expectedCharacters);
            done();
          });
      });
    });

    describe('getBySlug', () => {
      it('it should call getCharacterBySlug method and setCurrent mutation', (done) => {
        const expectedCharacter = {
          name: 'John Doe',
        };

        const slug = 'john-doe';

        const commit = jest.fn();

        Vue.anhqvClient.getCharacterBySlug = jest.fn().mockResolvedValue(expectedCharacter);

        actions.getBySlug({ commit }, { slug })
          .then(() => {
            expect(Vue.anhqvClient.getCharacterBySlug).toHaveBeenCalledWith(slug);

            expect(commit).toHaveBeenCalledWith('setCurrent', expectedCharacter);
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
        const characters = [
          {
            name: 'John Doe',
          },
        ];

        mutations.setAll(state, characters);

        expect(state.all).toEqual(characters);
      });
    });

    describe('setCurrent', () => {
      it('it should modify current state property', () => {
        const character = {
          name: 'John Doe',
        };

        mutations.setCurrent(state, character);

        expect(state.current).toEqual(character);
      });
    });
  });
});
