<template>
  <div id="chapter-scene-events">
    <div class="block">
      <div id="scene-title">
        <el-tag type="primary">
          {{ chapter.scenes[index].title }}
        </el-tag>
      </div>
      <el-timeline
        v-if="hasEvents()"
        id="events-list"
      >
        <el-timeline-item
          v-for="event in chapter.scenes[index].events"
          :key="event.id"
          :timestamp="getNodeTimestamp(event)"
          placement="top"
          :icon="getNodeIcon(event)"
          :type="getNodeType(event)"
          :color="getNodeColor(event)"
          :size="getNodeSize()"
        >
          <el-card>
            <h4 class="event-characters">
              <el-avatar
                v-for="character in event.characters"
                :key="character.id"
                :size="characterAvatarSize"
                :src="character.image_url"
                :alt="character.image_alt"
                :title="character.shortname"
              />
            </h4>
            <div class="event-text">
              <i>{{ event.text }}</i>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <div v-else id="empty-block">
        <el-alert
          :title="emptyEventsText"
          type="warning"
          :closable="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import utils from '../../utils';

export default {
  name: 'ChapterSceneEvents',
  props: {
    order: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      characterAvatarSize: 'small',
      eventTypeDialog: utils.VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.SCENES.EVENTS.TYPE.DIALOG,
      emptyEventsText: this.$t('VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.SCENES.DETAIL.EVENTS.EMPTY'),
    };
  },
  computed: {
    ...mapState('chapters', {
      chapter: 'current',
    }),
    index() {
      return this.order - 1;
    },
  },
  methods: {
    getNodeTimestamp(event) {
      return String(event.order);
    },
    getNodeIcon(event) {
      if (event.type === this.eventTypeDialog) return 'el-icon-more';
      return '';
    },
    getNodeType(event) {
      if (event.type === this.eventTypeDialog) return 'primary';
      return 'info';
    },
    getNodeColor(event) {
      if (event.type === this.eventTypeDialog) return '';
      return '';
    },
    getNodeSize() {
      return 'large';
    },
    hasEvents() {
      return this.chapter.scenes[this.index]
        && this.chapter.scenes[this.index].events
        && this.chapter.scenes[this.index].events.length;
    },
  },
};
</script>

<style lang="scss" scoped>

#chapter-scene-events{
  #scene-title{
    text-align: center;

    .el-tag{
      height: auto;
      white-space: normal;
    }
  }

  #events-list{
    margin-top: 10px;
    padding-left: 3px;

    @media screen and (min-width: $tablet-min-width) {
      padding-left: 5px;
    }

    .event-characters{
      margin-top: 0;
    }

    .event-text {
      text-align: justify;
    }
  }
}
</style>
