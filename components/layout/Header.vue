<template>
  <div id="header">
    <span>ANHQV STATS</span>
  </div>
</template>

<script>

export default {
  name: 'Header',
};
</script>

<style lang="scss" scoped>
#header{
  height: 100%;

  span {
    margin: 0;
    line-height: 60px;
    padding: 0 20px;
    font-weight: bold;
    font-size: 1.17em;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
