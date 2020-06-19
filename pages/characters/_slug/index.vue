<template>
  <div id="character-detail">
    <div class="banner">
      <h1>{{ title }}</h1>
    </div>
    <div class="wrapper">
      <div
        id="character-info"
      >
        <el-card>
          <div slot="header" class="clearfix">
            <div id="title">
              {{ characterInfoTitle }}
            </div>
          </div>
          <el-row>
            <el-col id="avatar" :xs="24" :sm="24" :md="6">
              <el-avatar :src="character.image_url" :size="avatarSize" :alt="character.image_alt" />
            </el-col>
            <el-col :xs="24" :sm="24" :md="{ span: 14, offset: 2 }">
              <el-row class="character-info-row">
                <el-col :xs="24" :sm="12" :md="8">
                  <p>
                    {{ nameLabel }}
                  </p>
                  <p v-if="character.name" class="bold">
                    {{ character.name }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>
                    {{ surnameLabel }}
                  </p>
                  <p v-if="character.surname" class="bold">
                    {{ character.surname }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>
                    {{ secondSurnameLabel }}
                  </p>
                  <p v-if="character.second_surname" class="bold">
                    {{ character.second_surname }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>
                    {{ shortnameLabel }}
                  </p>
                  <p v-if="character.shortname" class="bold">
                    {{ character.shortname }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>
                    {{ nicknameLabel }}
                  </p>
                  <p v-if="character.nickname" class="bold">
                    {{ character.nickname }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
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
import SocialShare from '../../../components/SocialShare.vue';

import utils from '../../../utils';

export default {
  name: 'CharacterDetail',
  components: {
    SocialShare,
  },
  nuxtI18n: {
    paths: {
      es: '/personajes/:slug',
    },
  },
  async fetch() {
    if (process.browser) {
      this.loadingInstance = Loading.service({
        target: utils.LOADING.QUERY_SELECTOR,
        background: 'rgba(0, 0, 0, 0.8)',
      });
    }

    this.$store.commit('configs/setCurrentTitle', this.$t('VIEWS.CHARACTERS.DETAIL.TITLE', { character: '' }));

    return Promise.all([
      this.$store.dispatch('seo-configs/getSeoConfigBySlug', {
        slug: `character-${this.$route.params.slug}`,
      }),
      this.$store.dispatch('characters/getBySlug', {
        slug: this.$route.params.slug,
      }),
    ])
      .then(() => {
        this.$store.commit('configs/setCurrentTitle', this.$t('VIEWS.CHARACTERS.DETAIL.TITLE', { character: this.character.shortname }));
      })
      .finally(() => {
        if (this.loadingInstance) this.loadingInstance.close();
      });
  },
  data() {
    return {
      avatarSize: 250,
      characterInfoTitle: this.$t('VIEWS.CHARACTERS.DETAIL.INFO.TITLE'),
      nameLabel: this.$t('VIEWS.CHARACTERS.DETAIL.INFO.NAME'),
      surnameLabel: this.$t('VIEWS.CHARACTERS.DETAIL.INFO.SURNAME'),
      secondSurnameLabel: this.$t('VIEWS.CHARACTERS.DETAIL.INFO.SECOND_SURNAME'),
      shortnameLabel: this.$t('VIEWS.CHARACTERS.DETAIL.INFO.SHORTNAME'),
      nicknameLabel: this.$t('VIEWS.CHARACTERS.DETAIL.INFO.NICKNAME'),
      shareText: this.$t('COMMON.SOCIAL_SHARING.SHARE'),
    };
  },
  computed: {
    ...mapState('characters', {
      character: 'current',
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
    this.$store.dispatch('characters/destroyCurrent');
  },
  methods: {
    handleResize() {
      if (utils.isMobile()) {
        this.avatarSize = 100;
      } else {
        this.avatarSize = 250;
      }
    },
  },
  head() {
    return utils.getCommonMetas(this.seoConfig);
  },
};
</script>

<style lang="scss" scoped>

#character-detail {
  #character-info{
    #avatar {
      text-align: center;
    }

    #title{
      color: $color-text-blue;
      font-size: 20px;
    }

    .character-info-row{
      .bold {
        font-weight: bold;
      }
    }
  }
}
</style>
