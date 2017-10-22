<template>
  <div>
    <div class="gallery">
      <div class="wrapper" v-for="(item, index) in images" :key="item.pid">
        <!-- <img :data-src="item.imageUrl" class="lazyload" @click="setActive(index)"> -->
        <img :data-src="item.imageUrl" :data-srcset="mapAlbum(item.srcset)" data-sizes="auto" class="lazyload" @click="setActive(index)">
      </div>
    </div>
    <div>Click on any image to see a large version.</div>

  </div>
</template>

<script>
import GalleryMixin from '~/components/GalleryMixin';
export default {
  mixins: [GalleryMixin],
  props: {
    images: Array
  },
  methods: {
    setActive(idx) {
      this.$emit('changeIndex', idx);
    }
  }
};
</script>

<style lang="scss" scoped>
.gallery {
	display: flex;
	flex-wrap: wrap;
}

.gallery .wrapper {
	box-sizing: border-box;
  flex: 1;
	padding: 2px 1px;
}

.gallery .wrapper img {
	display: block;
	height: 100px;
	width: auto;
	border: 0px;
	border-radius: 2px;
	cursor: pointer;
	overflow: hidden;
}
</style>
