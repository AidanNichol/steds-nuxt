<template>
  <div class="paginator">
    <div :class="{hide: index <= 0}" class="arrow left" @click.stop="adjustThumbIndex(-1)">
      <icon :type="'arrowLeft'" :color="'#ccc'"></icon>
    </div>
    <div class="thumbnail-wrapper" v-for="item in activeImages" @click.stop="setActive(item.index-1)">
      <thumbnail :imageUrl="item.thumbUrl" :class="{active: item.isActive}" v-if="!isMove"></thumbnail>
    </div>
    <div :class="{hide: index >= (images.length - noThumbs)}" class="arrow right" @click.stop="adjustThumbIndex(+1)">
      <icon :type="'arrowRight'" :color="'#ccc'"></icon>
    </div>
  </div>
</template>

<script>
import icon from './common/icon';
import thumbnail from './common/thumbnail';

export default {
  props: {
    images: Array,
    activeIndex: Number
  },
  data() {
    return {
      index: 0,
      isMove: false
    };
  },
  computed: {
    noThumbs() {
      return Math.min(this.images.length, Math.round(window.innerWidth / 80));
    },
    activeImages() {
      return this.images.slice(this.index, this.index + this.noThumbs);
    }
  },
  mounted() {
    this.index = this.setIndex(this.activeIndex);
    this.setActive(this.activeIndex);
  },
  watch: {
    activeIndex() {
      this.index = this.setIndex(this.activeIndex);
      this.setActive(this.activeIndex);
      console.log('paginator mounted', window.innerWidth);
    }
  },
  methods: {
    setIndex(idx) {
      return Math.min(
        Math.max(0, idx - Math.floor(this.noThumbs / 2 - 0.5)),
        this.images.length - this.noThumbs
      );
    },
    adjustThumbIndex(direction) {
      let newIndex = this.index + direction * (this.noThumbs - 1);
      this.index = Math.max(
        0,
        Math.min(newIndex, this.images.length - this.noThumbs)
      );
    },
    setActive(idx) {
      if (idx !== this.activeIndex) {
        this.$emit('changeIndex', idx);
      }
      this.isMove = true;
      this.images.forEach(item => {
        item.isActive = false;
      });
      this.images[idx].isActive = true;
      this.isMove = false;
    }
  },
  components: {
    icon,
    thumbnail
  }
};
</script>

<style lang="scss">
.paginator {
	width: 100%;
	min-width: 300px;
	// position: absolute;
  display: flex;
  justify-content: center;
	left: 0;
	bottom: 10px;
	text-align: center;
	margin: 0 auto;
  .arrow {
    display: inline-block;
    // position: absolute;
    vertical-align: top;
    height: 20px;
    width: 20px;
    margin: 18px 10px 0 10px;
    cursor: pointer;

    &.hide {
      opacity: 0;
      cursor: none;
    }
    // &.left {
    //   left: calc(50% - 170px);
    // }
    //
    // &.right {
    //   right: calc(50% - 170px);
    // }
  }


  .thumbnail-wrapper {
    display: inline-block;
  }
}

</style>
