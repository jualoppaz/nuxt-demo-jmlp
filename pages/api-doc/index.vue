<template>
  <div id="api-doc">
    <div class="banner">
      <h1>{{ title }}</h1>
    </div>
    <div class="wrapper">
      <div id="api-doc-text" v-html="apiDocText" />
      <div id="swagger-ui" />
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

import utils from '../../utils';
import SocialShare from '../../components/SocialShare.vue';

export default {
  name: 'ApiDoc',
  components: {
    SocialShare,
  },
  async fetch() {
    this.$store.commit('configs/setCurrentTitle', this.$t('VIEWS.API_DOC.TITLE'));

    return this.$store.dispatch('seo-configs/getSeoConfigBySlug', {
      slug: 'api-doc',
    });
  },
  data() {
    return {
      apiDocText: this.$t('VIEWS.API_DOC.TEXT'),
      shareText: this.$t('COMMON.SOCIAL_SHARING.SHARE'),
    };
  },
  computed: {
    ...mapState('configs', {
      title: 'currentTitle',
    }),
    ...mapState('seo-configs', {
      seoConfig: 'currentSeoConfig',
    }),
  },
  mounted() {
    // eslint-disable-next-line global-require
    const SwaggerUIBundle = require('swagger-ui');

    SwaggerUIBundle({
      url: 'http://api.anhqv-stats.es/docs/api-docs.json',
      dom_id: '#swagger-ui',
      deepLinking: false,
      presets: [
        SwaggerUIBundle.presets.apis,
      ],
      plugins: [
        SwaggerUIBundle.plugins.DownloadUrl,
      ],
    });
  },
  head() {
    return utils.getCommonMetas(this.seoConfig);
  },
};
</script>

<style lang="scss" scoped>

#api-doc{
  .wrapper{
    ::v-deep #swagger-ui{
      div{
        &.information-container.wrapper{
          padding: 0 !important;
        }
      }

      .scheme-container{
        box-shadow: none;
        -webkit-box-shadow: none;

        section{
          &.schemes.wrapper{
            padding: 0 !important;
          }
        }
      }

      div {
        & > .wrapper{
          padding: 0 !important;
        }
      }
    }
  }
}

</style>
