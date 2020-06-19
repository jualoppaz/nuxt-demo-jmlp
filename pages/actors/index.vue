<template>
  <div id="actors">
    <div class="banner">
      <h1>{{ title }}</h1>
    </div>
    <div class="wrapper">
      <p>
        Aquí puedes ver el detalle de todos y cada uno de los actores que aparecen en la serie.
      </p>
      <el-row
        id="actors-list"
        :gutter="gutter"
      >
        <el-col
          v-for="actor in actors"
          :key="actor.id"
          class="actor-col"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
        >
          <ActorCard :actor="actor" />
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
import ActorCard from '../../components/actors/ActorCard.vue';
import SocialShare from '../../components/SocialShare.vue';

import utils from '../../utils';

export default {
  name: 'Actors',
  components: {
    ActorCard,
    SocialShare,
  },
  nuxtI18n: {
    paths: {
      es: '/actores',
    },
  },
  async fetch() {
    if (process.browser) {
      this.loadingInstance = Loading.service({
        target: utils.LOADING.QUERY_SELECTOR,
        background: 'rgba(0, 0, 0, 0.8)',
      });
    }

    this.$store.commit('configs/setCurrentTitle', this.$t('VIEWS.ACTORS.TITLE'));

    return Promise.all([
      this.$store.dispatch('seo-configs/getSeoConfigBySlug', {
        slug: 'actors',
      }),
      this.$store.dispatch('actors/getAll'),
    ])
      .finally(() => {
        if (this.loadingInstance) this.loadingInstance.close();
      });
  },
  data() {
    return {
      gutter: utils.VIEWS.ACTORS.GUTTER.DEFAULT,
      shareText: this.$t('COMMON.SOCIAL_SHARING.SHARE'),
    };
  },
  computed: {
    ...mapState('actors', {
      actors: 'all',
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
    this.$store.dispatch('actors/destroyAll');
  },
  methods: {
    handleResize() {
      if (utils.isMobile()) {
        this.gutter = utils.VIEWS.ACTORS.GUTTER.MOBILE;
      } else {
        this.gutter = utils.VIEWS.ACTORS.GUTTER.DEFAULT;
      }
    },
  },
  head() {
    return utils.getCommonMetas(this.seoConfig);
  },
};
</script>

<style lang="scss">

#actors {
  #actors-list{
    .actor-col{
      padding: 6px;
    }
  }
}
</style>
