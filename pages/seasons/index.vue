<template>
  <div id="season">
    <div class="banner">
      <h1>{{ title }}</h1>
    </div>
    <div class="wrapper">
      <el-row
        id="chapters-list"
        :gutter="gutter"
      >
        <el-col
          v-for="chapter in chapters"
          :key="chapter.id"
          class="chapter-col"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
        >
          <ChapterCard :chapter="chapter" />
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
import ChapterCard from '../../components/chapters/ChapterCard.vue';
import SocialShare from '../../components/SocialShare.vue';

import utils from '../../utils';

export default {
  name: 'Season',
  components: {
    ChapterCard,
    SocialShare,
  },
  nuxtI18n: {
    paths: {
      es: '/temporadas/:season_number',
    },
  },
  async fetch() {
    if (process.browser) {
      this.loadingInstance = Loading.service({
        target: utils.LOADING.QUERY_SELECTOR,
        background: 'rgba(0, 0, 0, 0.8)',
      });
    }

    this.$store.commit('configs/setCurrentTitle', this.$t('VIEWS.SEASONS.DETAIL.TITLE', { number: this.$route.params.season_number }));

    return Promise.all([
      this.$store.dispatch('seo-configs/getSeoConfigBySlug', {
        slug: `season-${this.$route.params.season_number}-chapters`,
      }),
      this.$store.dispatch('chapters/getAll', {
        season: this.$route.params.season_number,
      }),
    ])
      .finally(() => {
        if (this.loadingInstance) this.loadingInstance.close();
      });
  },
  data() {
    return {
      gutter: utils.VIEWS.SEASONS.GUTTER.DEFAULT,
      detailButtonText: this.$t('VIEWS.SEASONS.SEE_DETAIL.TEXT'),
      shareText: this.$t('COMMON.SOCIAL_SHARING.SHARE'),
    };
  },
  computed: {
    ...mapState('chapters', {
      chapters: 'all',
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
    this.$store.dispatch('chapters/destroyAll');
  },
  methods: {
    handleResize() {
      if (utils.isMobile()) {
        this.gutter = utils.VIEWS.SEASONS.GUTTER.MOBILE;
      } else {
        this.gutter = utils.VIEWS.SEASONS.GUTTER.DEFAULT;
      }
    },
  },
  head() {
    return utils.getCommonMetas(this.seoConfig);
  },
};
</script>

<style lang="scss" scoped>
#season {
  #chapters-list{
    .chapter-col{
      padding: 6px;

      .image-container{
        .image{
          width: 100%;
          height: 100%;
          display: block;
        }
      }

      .chapter-card-info{
        .el-row{
          .chapter-name{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: block;
          }

          &:not(:last-child){
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}
</style>
