
import Vue from 'vue';
import { state, actions, mutations } from '../../../store/actors';

describe('store/actors.js', () => {
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
      it('it should call getActors method and setAll mutation', (done) => {
        const expectedActors = [
          {
            name: 'John Doe',
          },
        ];

        const commit = jest.fn();

        Vue.anhqvClient.getActors = jest.fn().mockResolvedValue({
          data: expectedActors,
        });

        actions.getAll({ commit })
          .then(() => {
            expect(Vue.anhqvClient.getActors).toHaveBeenCalled();

            expect(commit).toHaveBeenCalledWith('setAll', expectedActors);
            done();
          });
      });
    });

    describe('getBySlug', () => {
      it('it should call getActorBySlug method and setCurrent mutation', (done) => {
        const expectedActor = {
          name: 'John Doe',
        };

        const slug = 'john-doe';

        const commit = jest.fn();

        Vue.anhqvClient.getActorBySlug = jest.fn().mockResolvedValue(expectedActor);

        actions.getBySlug({ commit }, { slug })
          .then(() => {
            expect(Vue.anhqvClient.getActorBySlug).toHaveBeenCalledWith(slug);

            expect(commit).toHaveBeenCalledWith('setCurrent', expectedActor);
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
        const actors = [
          {
            name: 'John Doe',
          },
        ];

        mutations.setAll(state, actors);

        expect(state.all).toEqual(actors);
      });
    });

    describe('setCurrent', () => {
      it('it should modify current state property', () => {
        const actor = {
          name: 'John Doe',
        };

        mutations.setCurrent(state, actor);

        expect(state.current).toEqual(actor);
      });
    });
  });
});
