<template>
  <div class="fancybox">
    <div class="image-wrapper">
      <div class="header">
        <div class="play" @click.stop="play">
          <icon v-if="!isPlay" :type="'play'" :color="'#ccc'"></icon>
          <icon v-else :type="'pause'" :color="'#ccc'"></icon>
        </div>

        <div class="close" @click.stop="close" v-show="showclosebutton">
          <icon :type="'close'" :color="'#ccc'"></icon>
        </div>
      </div>
      <div class="album">{{images[index].album}}</div>
        <img ref="images" class="image animated lazyload" v-for="(item, i) in images"
        :data-src="mapAlbum(item.filepath+item.normal)"
        :data-srcset="mapAlbum(item.srcset)"
        :data-sizes="getDataSizes(item)"
        v-show="item.index===index+1" @click.stop="addIndex" :key="item.pid">
        <!-- <img ref="images" class="image animated lazyload" v-for="(item, i) in images"  :data-src="item.fullUrl" v-show="item.index===index+1" @click.stop="addIndex" :key="item.pid"> -->
      <div class="footer">
        <span class="caption" @click.stop="" v-show="showcaption" v-html="images[index].photographer"></span>
        <span class="count" @click.stop="" v-show="showimagecount">{{ index+1 }} {{imagecountseparator}} {{ images[index].total }}</span>
      </div>
    </div>
    <div v-if="index > 0" class="arrow left" @click.stop="decIndex">
      <icon :type="'arrowLeft'" :color="'#ccc'"></icon>
    </div>
    <div v-if="index < images[index].total-1" class="arrow right" @click.stop="addIndex">
      <icon :type="'arrowRight'" :color="'#ccc'"></icon>
    </div>
  </div>
</template>

<script>
import GalleryMixin from '~/components/GalleryMixin';
// import 'lazysizes/lazysizes.min.js';
import icon from './common/icon';
// const inBrowser = typeof window !== 'undefined';
// const isFullScreen = inBrowser
//   ? document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
//   : false;
// const isFullScreen = false;
export default {
  props: {
    index: Number,
    images: Array,
    reset: Boolean,
    showclosebutton: Boolean,
    showcaption: Boolean,
    imagecountseparator: String,
    showimagecount: Boolean
  },
  mixins: [GalleryMixin],
  data() {
    return {
      next: true,
      isPlay: false
    };
  },

  methods: {
    getDataSizes(pic) {
      if (Number.parseInt(pic.pwidth) < Number.parseInt(pic.pheight)) {
        return ` calc((100vh - 180px) * (${pic.pwidth} / ${pic.pheight}))`;
      }
      return `95vw`;
    },
    decIndex() {
      this.$emit('decIndex');
    },
    addIndex() {
      this.$emit('addIndex');
    },
    play() {
      this.next = false;
      if (!this.isPlay) {
        this.animation = true;
        this.$emit('play');
      } else {
        this.animation = false;
        this.$emit('pause');
      }
      this.isPlay = !this.isPlay;
    },
    close() {
      this.isPlay = false;
      this.$emit('pause');
      this.$emit('close');
      this.animation = false;
    }
  },
  watch: {
    index() {
      this.$nextTick(() => {
        if (!this.isPlay) {
          this.animation = false;
        }
      });
    },
    reset() {
      if (this.reset) {
        this.isPlay = false;
        this.animation = false;
      }
    }
  },
  components: {
    icon
  }
};
</script>

<style lang="scss" scoped>

.fancybox {
	position: relative;
	display: flex;
	height: calc(100% - 80px);
	text-align: center;
	align-items: center;

  .image-wrapper {
    display: inline-block;
    position: relative;
    margin: 0 auto;

    .album {
      font-size: 1rem;
      color: #ffffff;
      height: 1.5rem;
      text-align: center;
    }
    .header {
      height: 40px;
      position: relative;
      text-align: left;

      .play,
      .full,
      .close {
        display: inline-block;
        width: 20px;
        height: 20px;
        cursor: pointer;
      }

      .play,
      .full {
        margin-top: 10px;
        margin-right: 10px;
      }

      .close {
        position: absolute;
        right: 0;
        top: 10px;
      }
    }

    .image {
      display: block;
      max-height: calc(100vh - 180px);
      min-height: 200px;
      margin: 0 auto;
      cursor: pointer;
      // min-width: 95vw;
      user-select: none;
    }

    .footer {
      position: relative;
      padding: 5px;
      text-align: left;

      span {
        display: inline-block;
        font-size: 14px;
        color: #fff;

        a {
          color: #fff;
        }

        a:hover {
          color: #888;
        }
      }

      .count {
        position: absolute;
        font-size: 12px;
        right: 0;
      }
    }
  }

  @media screen and (min-width: 720px) {
    .image-wrapper .image {
      max-width: calc(100vw - 80px);
    }
  }

  @media screen and (max-width: 720px) {
    .image-wrapper .image {
      max-width: calc(98vw);
    }
  }

  .arrow {
    display: inline-block;
    position: absolute;
    cursor: pointer;

    &.left {
      left: 0;
    }

    &.right {
      right: 0;
    }
  }

  @media screen and (min-width: 720px) {
    .arrow {
      height: 40px;
      width: 40px;
      top: calc(50% - 8px);
    }
  }

  @media screen and (max-width: 720px) {
    .arrow {
      height: 20px;
      width: 20px;
      top: calc(50% + 12px);
    }
  }

}
</style>
