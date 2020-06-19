<template>
  <el-card
    class="character-card"
    shadow="hover"
    :body-style="{ padding: '0px' }"
  >
    <div class="image-container">
      <img :src="character.image_url" :alt="character.image_alt" class="image">
    </div>
    <div
      class="character-card-info"
      style="padding: 14px;"
    >
      <el-row>
        <span class="character-name"><b>{{ characterName }}</b></span>
      </el-row>
      <el-row>
        <nuxt-link
          :to="{
            name: `characters-slug___${$i18n.locale}`,
            params: {
              slug: character.slug,
            },
          }"
          :title="characterName"
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
  name: 'CharacterCard',
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      detailButtonText: this.$t('VIEWS.CHARACTERS.SEE_DETAIL.TEXT'),
    };
  },
  computed: {
    characterName() {
      let res = this.character.name;
      if (this.character.surname) res += ` ${this.character.surname}`;
      return res;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.character-card{
  text-align: center;

  .image-container{
    .image{
      width: 100%;
      display: block;
    }
  }

  .character-card-info{
    text-align: left;

    .el-row{
      .character-name{
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
