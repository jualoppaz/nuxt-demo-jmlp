<template>
  <div id="characters">
    <div class="banner">
      <h1>{{ title }}</h1>
    </div>
    <div class="wrapper">
      <div id="characters-text" v-html="charactersText" />
      <el-row
        id="characters-list"
        :gutter="gutter"
      >
        <el-col
          v-for="character in characters"
          :key="character.id"
          class="character-col"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
        >
          <CharacterCard :character="character" />
        </el-col>
      </el-row>
      <el-row
        class="social-networks"
      >
        <social-share
          :title="shareText"
          :seo-config="seoConfig"
        />
      </el-row>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import { Loading } from 'element-ui';
import CharacterCard from '../../components/characters/CharacterCard.vue';
import SocialShare from '../../components/SocialShare.vue';

import utils from '../../utils';

export default {
  name: 'Characters',
  components: {
    CharacterCard,
    SocialShare,
  },
  nuxtI18n: {
    paths: {
      es: '/personajes',
    },
  },
  async fetch() {
    if (process.browser) {
      this.loadingInstance = Loading.service({
        target: utils.LOADING.QUERY_SELECTOR,
        background: 'rgba(0, 0, 0, 0.8)',
      });
    }

    this.$store.commit('configs/setCurrentTitle', this.$t('VIEWS.CHARACTERS.TITLE'));

    return Promise.all([
      this.$store.dispatch('seo-configs/getSeoConfigBySlug', {
        slug: 'characters',
      }),
      this.$store.dispatch('characters/getAll'),
    ])
      .finally(() => {
        if (this.loadingInstance) this.loadingInstance.close();
      });
  },
  data() {
    return {
      gutter: utils.VIEWS.CHARACTERS.GUTTER.DEFAULT,
      charactersText: this.$t('VIEWS.CHARACTERS.TEXT'),
      shareText: this.$t('COMMON.SOCIAL_SHARING.SHARE'),
    };
  },
  computed: {
    ...mapState('characters', {
      characters: 'all',
    }),
    ...mapState('configs', {
      title: 'currentTitle',
    }),
    ...mapState('seo-configs', {
      seoConfig: 'currentSeoConfig',
    }),
  },
  mounted() {
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    if (this.loadingInstance) this.loadingInstance.close();
    window.removeEventListener('resize', this.handleResize);
    this.$store.dispatch('characters/destroyAll');
  },
  methods: {
    handleResize() {
      if (utils.isMobile()) {
        this.gutter = utils.VIEWS.CHARACTERS.GUTTER.MOBILE;
      } else {
        this.gutter = utils.VIEWS.CHARACTERS.GUTTER.DEFAULT;
      }
    },
  },
  head() {
    return utils.getCommonMetas(this.seoConfig);
  },
};
</script>

<style lang="scss">

#characters {
  #characters-text{
    text-align: justify;
  }

  #characters-list{
    .character-col{
      padding: 6px;
    }
  }
}
</style>
