<template>
  <div class="thumbnail" :style="{ backgroundImage: 'url(' + imageUrl + ')' }"></div>
</template>

<script>
export default {
  props: {
    imageUrl: String
  }
};
</script>

<style lang="scss">
.thumbnail {
  display: inline-block;
  margin: 2px;
  width: 70px;
  height: 70px;
  border-radius: 2px;
  background-position: center;
  background-size: cover;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.2);
  cursor: pointer;
  overflow: hidden;
}

.thumbnail.active {
box-shadow: inset 0 0 0 2px #fff;
}
</style>
