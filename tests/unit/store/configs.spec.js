
import Vue from 'vue';
import { state, mutations } from '../../../store/configs';

describe('store/configs.js', () => {
  beforeEach(() => {
    Vue.anhqvClient = {};
  });

  describe('state', () => {
    expect(state()).toEqual({
      currentTitle: '',
    });
  });

  describe('mutations', () => {
    describe('setCurrentTitle', () => {
      it('it should modify currentTitle state property', () => {
        const title = 'new title';

        mutations.setCurrentTitle(state, title);

        expect(state.currentTitle).toEqual(title);
      });
    });
  });
});
