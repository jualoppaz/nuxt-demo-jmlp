<template>
  <div id="chapter-scenes-list">
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane
        v-for="scene in chapter.scenes"
        :key="scene.id"
        :label="getTabLabel(scene)"
      >
        <ChapterSceneEvents :order="scene.order" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ChapterSceneEvents from './ChapterSceneEvents.vue';
import utils from '../../utils';

export default {
  name: 'ChapterScenesList',
  components: {
    ChapterSceneEvents,
  },
  data() {
    let tabPosition = utils.COMMON.ELEMENTUI.TABS.POSITION.LEFT;

    if (process.client && utils.isMobile()) tabPosition = utils.COMMON.ELEMENTUI.TABS.POSITION.TOP;

    return {
      tabPosition,
    };
  },
  computed: {
    ...mapState('chapters', {
      chapter: 'current',
    }),
  },
  mounted() {
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  methods: {
    getTabLabel(scene) {
      return String(scene.id);
    },
    handleResize() {
      if (utils.isMobile()) {
        this.tabPosition = utils.COMMON.ELEMENTUI.TABS.POSITION.TOP;
      } else {
        this.tabPosition = utils.COMMON.ELEMENTUI.TABS.POSITION.LEFT;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#chapter-scenes-list{
  .el-tabs {
    ::v-deep .el-tabs__header {
      overflow: hidden;
      padding: 0 5px;

      @media screen and (min-width: $tablet-min-width) {
        height: 450px;
        padding: 0;
      }
    }
  }
}
</style>
