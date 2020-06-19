import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const client = require('../../../../plugins/anhqvClient/client');

describe('anhqvClient', () => {
  let anhqvClient;
  let mockClient;
  let AnhqvClient;

  const baseURL = 'http://path/to/api';

  beforeEach(() => {
    const axiosInstance = axios.create();

    mockClient = new MockAdapter(axiosInstance);
    AnhqvClient = client({
      restClient: axiosInstance,
    });

    anhqvClient = new AnhqvClient();
    anhqvClient.setBaseURL(baseURL);
  });

  afterEach(() => {
    mockClient.resetHistory();
  });

  describe('setBaseURL', () => {
    it('it should modify baseURL', () => {
      anhqvClient.setBaseURL('/path/to/endpoint');

      expect(anhqvClient.restClient.defaults.baseURL).toBe('/path/to/endpoint');
    });
  });

  describe('characters', () => {
    describe('getCharacters', () => {
      it('check url is well formed', (done) => {
        const expectedUrl = '/characters';

        mockClient.onGet().reply(200, {});

        anhqvClient.getCharacters()
          .finally(() => {
            expect(mockClient.history.get.length).toBe(1);
            expect(mockClient.history.get[0].url).toBe(expectedUrl);
            done();
          });
      });
    });

    describe('getCharacterBySlug', () => {
      it('check url is well formed', (done) => {
        const slug = 'john-doe';
        const expectedUrl = `/characters/${slug}`;

        mockClient.onGet().reply(200, {});

        anhqvClient.getCharacterBySlug(slug)
          .finally(() => {
            expect(mockClient.history.get.length).toBe(1);
            expect(mockClient.history.get[0].url).toBe(expectedUrl);
            done();
          });
      });
    });
  });

  describe('actors', () => {
    describe('getActors', () => {
      it('check url is well formed', (done) => {
        const expectedUrl = '/actors';

        mockClient.onGet().reply(200, {});

        anhqvClient.getActors()
          .finally(() => {
            expect(mockClient.history.get.length).toBe(1);
            expect(mockClient.history.get[0].url).toBe(expectedUrl);
            done();
          });
      });
    });

    describe('getActorBySlug', () => {
      it('check url is well formed', (done) => {
        const slug = 'john-doe';
        const expectedUrl = `/actors/${slug}`;

        mockClient.onGet().reply(200, {});

        anhqvClient.getActorBySlug(slug)
          .finally(() => {
            expect(mockClient.history.get.length).toBe(1);
            expect(mockClient.history.get[0].url).toBe(expectedUrl);
            done();
          });
      });
    });
  });

  describe('chapters', () => {
    describe('getChapters', () => {
      it('check url is well formed', (done) => {
        const expectedUrl = '/chapters';
        const expectedParams = {
          season: '0',
        };

        mockClient.onGet().reply(200, {});

        anhqvClient.getChapters(expectedParams)
          .finally(() => {
            expect(mockClient.history.get.length).toBe(1);
            expect(mockClient.history.get[0].url).toBe(expectedUrl);
            expect(mockClient.history.get[0].params).toEqual(expectedParams);
            done();
          });
      });
    });

    describe('getChapterBySlug', () => {
      it('check url is well formed', (done) => {
        const slug = '0x01';
        const expectedUrl = `/chapters/${slug}`;

        mockClient.onGet().reply(200, {});

        anhqvClient.getChapterBySlug(slug)
          .finally(() => {
            expect(mockClient.history.get.length).toBe(1);
            expect(mockClient.history.get[0].url).toBe(expectedUrl);
            done();
          });
      });
    });
  });

  describe('seo-configs', () => {
    describe('getSeoConfigBySlug', () => {
      it('check url is well formed', (done) => {
        const slug = 'home';
        const expectedUrl = `/seo-configs/${slug}`;

        mockClient.onGet().reply(200, {});

        anhqvClient.getSeoConfigBySlug(slug)
          .finally(() => {
            expect(mockClient.history.get.length).toBe(1);
            expect(mockClient.history.get[0].url).toBe(expectedUrl);
            done();
          });
      });
    });
  });
});
