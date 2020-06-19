<template>
  <div id="home">
    <div class="banner">
      <h1>{{ title }}</h1>
    </div>
    <div class="wrapper">
      <div id="welcome">
        <div id="welcome-text" v-html="welcomeText" />
        <div id="welcome-image">
          <img
            src="/images/home.jpg"
            :alt="welcomeImageAlt"
          >
        </div>
      </div>

      <el-row
        :gutter="20"
      >
        <el-col
          :xs="24"
        >
          <div id="adsense">
            <adsbygoogle
              data-ad-slot="4044329554"
              data-ad-format="fluid"
              data-full-width-responsive="true"
            />
          </div>
        </el-col>
        <el-col
          :xs="24"
          :sm="8"
        >
          <div id="characters">
            <h2 id="characters-title">
              {{ charactersTitle }}
            </h2>
            <div id="characters-text" v-html="charactersText" />
          </div>
        </el-col>
        <el-col
          :xs="24"
          :sm="8"
        >
          <div id="donate">
            <h2 id="donate-title">
              {{ donateTitle }}
            </h2>
            <div id="donate-text" v-html="donateText" />
            <div id="donate-form">
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick">
                <input type="hidden" name="hosted_button_id" value="WHKBEMGHF6Z6E">
                <input
                  type="image"
                  src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donateCC_LG.gif"
                  border="0"
                  name="submit"
                  title="Donar mediante PayPal"
                  alt="Botón para donar mediante PayPal"
                >
              </form>
            </div>
          </div>
        </el-col>
        <el-col
          :xs="24"
          :sm="8"
        >
          <div id="chapters">
            <h2 id="chapters-title">
              {{ chaptersTitle }}
            </h2>
            <div id="chapters-text" v-html="chaptersText" />
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col
          :xs="24"
        >
          <div id="references">
            <h2 id="references-title">
              {{ referencesTitle }}
            </h2>
            <div id="references-text" v-html="referencesText" />
          </div>
        </el-col>
      </el-row>
      <el-row
        id="references-list"
        :gutter="20"
      >
        <el-col
          class="reference-item"
          :xs="24"
          :lg="12"
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>ANHQV.ES</span>
              <div class="links">
                <a
                  href="https://anhqv.es"
                  target="_blank"
                  rel="nofollow"
                  :title="anhqvLinkWebTitle"
                >
                  <font-awesome-icon icon="link" />
                </a>
                <a
                  href="https://www.youtube.com/user/juancuestanhqv2014"
                  target="_blank"
                  rel="nofollow"
                  :title="anhqvLinkYoutubeTitle"
                >
                  <font-awesome-icon :icon="['fab', 'youtube']" />
                </a>
              </div>
            </div>
            <div>
              <p>
                {{ anhqvText }}
              </p>
            </div>
          </el-card>
        </el-col>
        <el-col
          class="reference-item"
          :xs="24"
          :lg="12"
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>EscenasANHQV</span>
              <div class="links">
                <a
                  href="https://twitter.com/EscenasANHQV"
                  target="_blank"
                  rel="nofollow"
                  :title="escenasAnhqvLinkTwitterTitle"
                >
                  <font-awesome-icon :icon="['fab', 'twitter']" />
                </a>
                <a
                  href="https://www.instagram.com/escenas.anhqv/"
                  target="_blank"
                  rel="nofollow"
                  :title="escenasAnhqvLinkInstagramTitle"
                >
                  <font-awesome-icon :icon="['fab', 'instagram']" />
                </a>
              </div>
            </div>
            <div>
              <p>
                {{ escenasAnhqvText }}
              </p>
            </div>
          </el-card>
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
import utils from '../utils';

import SocialShare from '../components/SocialShare.vue';

export default {
  name: 'Home',
  components: {
    SocialShare,
  },
  async fetch() {
    this.$store.commit('configs/setCurrentTitle', this.$t('VIEWS.HOME.TITLE'));

    return this.$store.dispatch('seo-configs/getSeoConfigBySlug', {
      slug: 'home',
    });
  },
  data() {
    return {
      welcomeText: this.$t('VIEWS.HOME.WELCOME.TEXT'),
      charactersTitle: this.$t('VIEWS.HOME.CHARACTERS.TITLE'),
      charactersText: this.$t('VIEWS.HOME.CHARACTERS.TEXT'),
      donateTitle: this.$t('VIEWS.HOME.DONATE.TITLE'),
      donateText: this.$t('VIEWS.HOME.DONATE.TEXT'),
      chaptersTitle: this.$t('VIEWS.HOME.CHAPTERS.TITLE'),
      chaptersText: this.$t('VIEWS.HOME.CHAPTERS.TEXT'),
      referencesTitle: this.$t('VIEWS.HOME.REFERENCES.TITLE'),
      referencesText: this.$t('VIEWS.HOME.REFERENCES.TEXT'),
      anhqvText: this.$t('VIEWS.HOME.REFERENCES.LIST.ANHQV.TEXT'),
      escenasAnhqvText: this.$t('VIEWS.HOME.REFERENCES.LIST.ESCENASANHQV.TEXT'),
      shareText: this.$t('COMMON.SOCIAL_SHARING.SHARE'),
      welcomeImageAlt: this.$t('VIEWS.HOME.WELCOME.IMAGE.ALT'),
      anhqvLinkWebTitle: this.$t('VIEWS.HOME.REFERENCES.LIST.ANHQV.LINK.WEB.TITLE'),
      anhqvLinkYoutubeTitle: this.$t('VIEWS.HOME.REFERENCES.LIST.ANHQV.LINK.YOUTUBE.TITLE'),
      escenasAnhqvLinkTwitterTitle: this.$t('VIEWS.HOME.REFERENCES.LIST.ESCENASANHQV.LINK.TWITTER.TITLE'),
      escenasAnhqvLinkInstagramTitle: this.$t('VIEWS.HOME.REFERENCES.LIST.ESCENASANHQV.LINK.INSTAGRAM.TITLE'),
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
  head() {
    return utils.getCommonMetas(this.seoConfig);
  },
};
</script>

<style lang="scss" scoped>

#home {
  #welcome{
    #welcome-text{
      text-align: justify;
    }

    #welcome-image{
      img {
        margin: auto;
        display: block;
        max-width: 100%;
      }
    }
  }

  #adsense{
    margin: 10px 0 10px;
  }

  #characters{
    #characters-title{
      color: $color-text-blue;
    }

    #characters-text{
      text-align: justify;
    }
  }

  #donate{
    #donate-title {
      color: $color-brand-paypal;
    }

    #donate-text{
      text-align: justify;
    }

    #donate-form {
      text-align: center;
    }
  }

  #chapters{
    #chapters-title{
      color: $color-text-blue;
    }

    #chapters-text{
      text-align: justify;
    }
  }

  #references{
    #references-title{
      color: $color-text-green;
    }
  }

  #references-list{
    .reference-item{
      &:not(:first-child){
        margin-top: 15px;

        @media screen and (min-width: $lg-desktop-min-width) {
          margin-top: 0;
        }
      }

      .links{
        float: right;

        a{
          &:not(:first-child){
            margin-left: 7px;
          }
        }
      }
    }
  }
}
</style>
