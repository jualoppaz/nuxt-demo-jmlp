<template>
  <div id="actor-detail">
    <div class="banner">
      <h1>{{ title }}</h1>
    </div>
    <div class="wrapper">
      <div
        id="actor-info"
      >
        <el-card>
          <div slot="header" class="clearfix">
            <div id="title">
              {{ actorInfoTitle }}
            </div>
          </div>
          <el-row>
            <el-col id="avatar" :xs="24" :sm="24" :md="6">
              <el-avatar :src="actor.image_url" :size="avatarSize" :alt="actor.image_alt" />
            </el-col>
            <el-col :xs="24" :sm="24" :md="{ span: 14, offset: 2 }">
              <el-row class="actor-info-row">
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{ nameLabel }}</p>
                  <p v-if="actor.name" class="bold">
                    {{ actor.name }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{ surnameLabel }}</p>
                  <p v-if="actor.surname" class="bold">
                    {{ actor.surname }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{ secondSurnameLabel }}</p>
                  <p v-if="actor.second_surname" class="bold">
                    {{ actor.second_surname }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{ shortnameLabel }}</p>
                  <p v-if="actor.shortname" class="bold">
                    {{ actor.shortname }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{ birthdateLabel }}</p>
                  <p v-if="actor.parsed_birthdate" class="bold">
                    {{ actor.parsed_birthdate }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
                <el-col v-if="actor.parsed_deathdate" :xs="24" :sm="12" :md="8">
                  <p>{{ deathdateLabel }}</p>
                  <p class="bold">
                    {{ actor.parsed_deathdate }}
                  </p>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </div>
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
import SocialShare from '../../../components/SocialShare.vue';

import utils from '../../../utils';

export default {
  name: 'ActorDetail',
  components: {
    SocialShare,
  },
  nuxtI18n: {
    paths: {
      es: '/actores/:slug',
    },
  },
  async fetch() {
    if (process.browser) {
      this.loadingInstance = Loading.service({
        target: utils.LOADING.QUERY_SELECTOR,
        background: 'rgba(0, 0, 0, 0.8)',
      });
    }

    this.$store.commit('configs/setCurrentTitle', this.$t('VIEWS.ACTORS.DETAIL.TITLE', { actor: '' }));

    return Promise.all([
      this.$store.dispatch('seo-configs/getSeoConfigBySlug', {
        slug: `actor-${this.$route.params.slug}`,
      }),
      this.$store.dispatch('actors/getBySlug', {
        slug: this.$route.params.slug,
      }),
    ])
      .then(() => {
        this.$store.commit('configs/setCurrentTitle', this.$t('VIEWS.ACTORS.DETAIL.TITLE', { actor: this.actor.shortname }));
      })
      .finally(() => {
        if (this.loadingInstance) this.loadingInstance.close();
      });
  },
  data() {
    return {
      avatarSize: 250,
      actorInfoTitle: this.$t('VIEWS.ACTORS.DETAIL.INFO.TITLE'),
      nameLabel: this.$t('VIEWS.ACTORS.DETAIL.INFO.NAME'),
      surnameLabel: this.$t('VIEWS.ACTORS.DETAIL.INFO.SURNAME'),
      secondSurnameLabel: this.$t('VIEWS.ACTORS.DETAIL.INFO.SECOND_SURNAME'),
      shortnameLabel: this.$t('VIEWS.ACTORS.DETAIL.INFO.SHORTNAME'),
      birthdateLabel: this.$t('VIEWS.ACTORS.DETAIL.INFO.BIRTHDATE'),
      deathdateLabel: this.$t('VIEWS.ACTORS.DETAIL.INFO.DEATHDATE'),
      shareText: this.$t('COMMON.SOCIAL_SHARING.SHARE'),
    };
  },
  computed: {
    ...mapState('actors', {
      actor: 'current',
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
    this.$store.dispatch('actors/destroyCurrent');
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

#actor-detail {
  #actor-info{
    #avatar {
      text-align: center;
    }

    #title{
      color: $color-text-blue;
      font-size: 20px;
    }

    .actor-info-row{
      .bold {
        font-weight: bold;
      }
    }
  }
}
</style>
