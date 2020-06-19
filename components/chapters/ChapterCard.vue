<template>
  <el-card
    class="chapter-card"
    shadow="hover"
    :body-style="{ padding: '0px' }"
  >
    <div class="image-container">
      <img :src="chapter.image_url" class="image" :alt="chapter.image_alt">
    </div>
    <div
      class="chapter-card-info"
      style="padding: 14px;"
    >
      <el-row>
        <span class="chapter-name"><b>{{ chapter.natural_id }} - {{ chapter.name }}</b></span>
      </el-row>
      <el-row>
        <nuxt-link
          :to="{
            name: `seasons-season_number-chapters-slug___${$i18n.locale}`,
            params: {
              slug: chapter.slug,
            },
          }"
        >
          <el-button
            type="primary"
            plain
          >
            {{ detailButtonText }}
          </el-button>
        </nuxt-link>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ChapterCard',
  props: {
    chapter: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      detailButtonText: this.$t('VIEWS.SEASONS.SEE_DETAIL.TEXT'),
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.chapter-card{
  text-align: center;

  .image-container{
    .image{
      width: 100%;
      display: block;
    }
  }

  .chapter-card-info{
    text-align: left;

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
</style>
