const constants = {
  COMMON: {
    ELEMENTUI: {
      TABS: {
        POSITION: {
          LEFT: 'left',
          TOP: 'top',
        },
      },
    },
  },
  DEVICES: {
    TABLET: {
      MIN_WIDTH: 768,
    },
    DESKTOP: {
      MIN_WIDTH: 992,
    },
  },
  LAYOUT: {
    MAIN: {
      ID: 'main',
      QUERY_SELECTOR: '#main',
    },
  },
  LOADING: {
    QUERY_SELECTOR: 'body',
  },
  VIEWS: {
    CHARACTERS: {
      GUTTER: {
        DEFAULT: 50,
        MOBILE: 20,
      },
    },
    ACTORS: {
      GUTTER: {
        DEFAULT: 50,
        MOBILE: 20,
      },
    },
    SEASONS: {
      GUTTER: {
        DEFAULT: 50,
        MOBILE: 20,
      },
      DETAIL: {
        CHAPTERS: {
          DETAIL: {
            SCENES: {
              EVENTS: {
                TYPE: {
                  DIALOG: 'DIALOG',
                },
              },
            },
          },
        },
      },
    },
  },
};

export default constants;
