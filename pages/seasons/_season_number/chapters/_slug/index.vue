<template>
  <div id="chapter-detail">
    <div class="banner">
      <h1>{{ title }}</h1>
    </div>
    <div class="wrapper">
      <div
        id="chapter-info"
      >
        <el-card>
          <div slot="header" class="clearfix">
            <div id="title">
              {{ chapterInfoTitle }}
            </div>
          </div>
          <el-row>
            <el-col
              id="avatar"
              :xs="24"
              :sm="24"
              :md="12"
              :lg="6"
            >
              <el-avatar
                :src="chapter.image_url"
                :size="avatarSize"
                shape="square"
                :alt="chapter.image_alt"
              />
            </el-col>
            <el-col
              :xs="24"
              :sm="24"
              :md="12"
              :lg="{ span: 14, offset: 2 }"
            >
              <el-row class="chapter-info-row">
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{ nameLabel }}</p>
                  <p v-if="chapter.name" class="bold">
                    {{ chapter.name }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{ seasonLabel }}</p>
                  <p v-if="chapter.season" class="bold">
                    {{ chapter.season }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{ durationLabel }}</p>
                  <p v-if="chapter.parsed_duration" class="bold">
                    {{ chapter.parsed_duration }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{ releaseDateLabel }}</p>
                  <p
                    v-if="chapter.parsed_release_date"
                    class="bold"
                  >
                    {{ chapter.parsed_release_date }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="chapter.summary">
            <el-col>
              <p>{{ summaryLabel }}</p>
              <div v-if="chapter.summary" id="summary" v-html="chapter.summary" />
              <p v-else>
                <i class="el-icon-minus" />
              </p>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <div
        id="chapter-video"
      >
        <el-card>
          <div slot="header" class="clearfix">
            <div id="title">
              {{ videoTitle }}
            </div>
          </div>
          <p v-if="loading()">
            {{ loadingText }}
          </p>
          <el-row v-else-if="chapter.video_url">
            <el-col
              id="avatar"
              :xs="24"
              :sm="24"
              :md="{
                span: 12,
                offset: 6
              }"
              :lg="{
                span: 12,
                offset: 6
              }"
            >
              <div
                class="embed-container"
              >
                <iframe
                  :src="chapter.video_url"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                />
              </div>
            </el-col>
          </el-row>
          <p v-else>
            {{ unavailableText }}
          </p>
        </el-card>
      </div>
      <div id="scenes">
        <el-card>
          <div slot="header" class="clearfix">
            <div id="title">
              {{ scenesTitle }}
            </div>
          </div>
          <p v-if="loading()">
            {{ loadingText }}
          </p>
          <div v-else-if="chapter.scenes && chapter.scenes.length">
            <ChapterScenesList />
          </div>
          <div v-else>
            <el-alert
              :title="emptyScenesText"
              type="warning"
              :closable="false"
            />
          </div>
        </el-card>
      </div>
      <div id="social-networks">
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
  </div>
</template>

<script>

import { mapState } from 'vuex';
import { Loading } from 'element-ui';
import SocialShare from '../../../../../components/SocialShare.vue';
import ChapterScenesList from '../../../../../components/chapters/ChapterScenesList.vue';

import utils from '../../../../../utils';

export default {
  name: 'ChapterDetail',
  components: {
    SocialShare,
    ChapterScenesList,
  },
  nuxtI18n: {
    paths: {
      es: '/temporadas/:season_number/capitulos/:slug',
    },
  },
  async fetch() {
    if (process.browser) {
      this.loadingInstance = Loading.service({
        target: utils.LOADING.QUERY_SELECTOR,
        background: 'rgba(0, 0, 0, 0.8)',
      });
    }

    this.$store.commit('configs/setCurrentTitle', this.$t('VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.TITLE', { slug: '' }));

    return Promise.all([
      this.$store.dispatch('seo-configs/getSeoConfigBySlug', {
        slug: this.$route.params.slug,
      }),
      this.$store.dispatch('chapters/getBySlug', {
        slug: this.$route.params.slug,
      }),
    ])
      .then(() => {
        this.$store.commit('configs/setCurrentTitle', this.$t('VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.TITLE', {
          slug: this.chapter.natural_id,
          name: this.chapter.name,
        }));
      })
      .finally(() => {
        if (this.loadingInstance) this.loadingInstance.close();
      });
  },
  data() {
    return {
      avatarSize: 250,
      chapterInfoTitle: this.$t('VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.INFO.TITLE'),
      nameLabel: this.$t('VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.INFO.NAME'),
      seasonLabel: this.$t('VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.INFO.SEASON'),
      durationLabel: this.$t('VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.INFO.DURATION'),
      releaseDateLabel: this.$t('VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.INFO.RELEASE_DATE'),
      summaryLabel: this.$t('VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.INFO.SUMMARY'),
      videoTitle: this.$t('VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.VIDEO.TITLE'),
      scenesTitle: this.$t('VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.SCENES.TITLE'),
      loadingText: this.$t('COMMON.LOADING'),
      unavailableText: this.$t('COMMON.UNAVAILABLE'),
      emptyScenesText: this.$t('VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.SCENES.EMPTY'),
      shareText: this.$t('COMMON.SOCIAL_SHARING.SHARE'),
    };
  },
  computed: {
    ...mapState('chapters', {
      chapter: 'current',
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
    this.$store.dispatch('chapters/destroyCurrent');
  },
  methods: {
    handleResize() {
      if (utils.isMobile()) {
        this.avatarSize = 100;
      } else {
        this.avatarSize = 250;
      }
    },
    loading() {
      return this.loadingInstance && this.loadingInstance.visible;
    },
  },
  head() {
    return utils.getCommonMetas(this.seoConfig);
  },
};
</script>

<style lang="scss" scoped>

#chapter-detail {
  #chapter-info{
    #avatar {
      text-align: center;
    }

    #title{
      color: $color-text-blue;
      font-size: 20px;
    }

    .chapter-info-row{
      .bold {
        font-weight: bold;
      }
    }

    #summary{
      ::v-deep p {
        text-align: justify;
      }
    }
  }

  #chapter-video {
    margin-top: 15px;

    #title{
      color: $color-text-red;
      font-size: 20px;
    }

    .embed-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
    }
    .embed-container iframe {
      position: absolute;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  #scenes{
    margin-top: 15px;

    .el-card {
      .el-card__header{
        #title{
          color: $color-text-green;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
