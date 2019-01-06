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
      <div class="album">{{ image.album }}</div>
      <img
        ref="images"
        class="image animated lazyload"
        :src="mapAlbum(image.filepath + image.normal)"
        :srcset="mapAlbum(image.srcset)"
        :sizes="getDataSizes(image)"
        @click.stop="addIndex"
      >
      <!-- <img ref="images" class="image animated lazyload" v-for="(item, i) in images"  :data-src="item.fullUrl" v-show="item.index===index+1" @click.stop="addIndex" :key="item.pid"> -->
      <div class="footer">
        <span class="caption" @click.stop v-show="showcaption" v-html="image.photographer"></span>
        <span
          class="count"
          @click.stop
          v-show="showimagecount"
        >{{ index + 1 }} {{ imagecountseparator }} {{ image.total }}</span>
      </div>
      <div class="arrows" :style="getDataDim(image)">
        <div @click.stop="decIndex" class="left">
          <icon v-if="index > 0" :type="'arrowLeft'" :color="'#ccc'"></icon>
        </div>
        <div @click.stop="addIndex" class="right">
          <icon v-if="index < images[index].total - 1" :type="'arrowRight'" :color="'#ccc'"></icon>
        </div>
      </div>
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
    image: Object,
    reset: Boolean,
    showclosebutton: Boolean,
    showcaption: Boolean,
    imagecountseparator: String,
    showimagecount: Boolean,
  },
  mixins: [GalleryMixin],
  data() {
    return {
      next: true,
      isPlay: false,
    };
  },

  methods: {
    getDataSizes(pic) {
      const ratio = Number.parseInt(pic.pwidth) / Number.parseInt(pic.pheight);
      console.log('getDataSize', window.innerHeight, ratio, pic);
      return (
        Math.min((window.innerHeight - 180) * ratio, window.innerWidth * 0.95) +
        `px`
      );
    },
    getDataDim(pic) {
      const ratio = Number.parseInt(pic.pwidth) / Number.parseInt(pic.pheight);
      const w = Math.min(
        (window.innerHeight - 180) * ratio,
        window.innerWidth * 0.95
      );
      const extra = window.innerWidth >= 720 ? 80 : 0;
      return { width: w + extra + 'px', height: w / ratio + 'px' };
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
    },
  },
  watch: {
    index() {
      console.log('fancybox index', this.index);
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
    },
  },
  components: { icon },
};
</script>

<style  scoped>
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
      /* min-height: 200px; */
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
  .arrows {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));

    align-content: space-around;
    justify-content: space-between;
    align-content: stretch;
    position: absolute;
    top: 64px;

    cursor: pointer;

    & > div {
      display: flex;
      flex-direction: row;
      align-items: center;

      &.left {
        justify-content: flex-start;
      }
      &.right {
        justify-content: flex-end;
      }
    }
  }
  @media screen and (min-width: 720px) {
    .arrows {
      left: -40px;
      & > div > div {
        height: 40px;
        width: 40px;
      }
    }
  }

  @media screen and (max-width: 720px) {
    .arrows {
      left: 0;
      & > div > div {
        height: 20px;
        width: 20px;
      }
    }
  }
}
</style>
