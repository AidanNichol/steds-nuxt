<template>
  <div class="vue-images">
    <gallery :images="images" @changeIndex="changeImg($event)"></gallery>
    <div
      id="lightbox"
      ref="lightbox"
      class="lightbox"
      v-show="isShow"
      @click="isShow=!modalclose"
      @wheel.stop="wheelFun"
    >
      <fancybox
        ref="fancybox"
        :image="images[index]"
        :images="images"
        :index="index"
        :animate="animate"
        :reset="!isShow"
        @play="playImg"
        @pause="pauseImg"
        @close="closeImg"
        @addIndex="nextImg"
        @decIndex="prevImg"
        :showclosebutton="showclosebutton"
        :showcaption="showcaption"
        :imagecountseparator="imagecountseparator"
        :showimagecount="showimagecount"
      ></fancybox>
      <paginator
        :images="images"
        :activeIndex="index"
        @changeIndex="changeImg($event)"
        v-show="showthumbnails"
      ></paginator>
    </div>
  </div>
</template>

<script>
// import 'animate.css/animate.min.css';
// import '~/plugins/lazysizesPlg';
import gallery from "./components/gallery";
import fancybox from "./components/fancybox";
import paginator from "./components/paginator";
if (process.BROWSER_BUILD) {
  console.log("lightbox", process.BROWSER_BUILD, process);
  // require('lazysizes.min.js');
}

export default {
  name: "Lightbox",
  props: {
    imgs: Array,
    modalclose: Boolean,
    keyinput: Boolean,
    mousescroll: Boolean,
    showclosebutton: Boolean,
    showcaption: Boolean,
    imagecountseparator: String,
    showimagecount: Boolean,
    showthumbnails: Boolean
  },
  beforeMount() {
    // require('lazysizes.min.js');
  },
  computed: {
    images() {
      let retArr = [];
      let idx = 0;

      // Filter to remove undefined items
      this.imgs.forEach(item => {
        if (item) {
          item["index"] = ++idx;
          item["isActive"] = false;
          item["caption"] = item.caption ? item.caption : "";
          retArr.push(item);
        }
      });

      for (let i = 0, len = retArr.length; i < len; i++) {
        retArr[i]["total"] = len;
      }

      return retArr;
    }
  },
  data() {
    return {
      isShow: false,
      index: 0,
      animate: "none",
      playTimer: null,
      touchPoint: {
        prev: 0,
        now: 0
      }
    };
  },
  created() {
    if (this.isShow) {
      window.addEventListener("keydown", this.keyFun);
      // window.addEventListener('mousewheel', this.wheelFun);
      this.$refs.lightbox.addEventListener("touchstart", this.touchFun);
    }
  },
  // mounted() {
  //   this.isShow = true;
  // },
  methods: {
    openImg() {
      this.isShow = true;
      this.animate = "none";
    },
    playImg() {
      var that = this;
      this.playTimer = window.setInterval(that.nextRotateImg, 2000);
    },
    pauseImg() {
      window.clearInterval(this.playTimer);
    },
    closeImg() {
      this.isShow = false;
    },
    nextRotateImg() {
      this.index = (this.index + 1) % this.images.length;
    },

    nextImg() {
      if (this.index < this.images.length - 1) this.index = this.index + 1;
    },
    prevImg() {
      if (this.index > 0) this.index = this.index - 1;
    },
    changeImg(event) {
      this.isShow = true;
      this.index = event;
    },

    keyFun(event) {
      event.preventDefault();
      if (this.keyinput) {
        var that = this;
        switch (event.keyCode) {
          case 27:
            this.closeImg();
            break;
          case 37:
            that.prevImg();
            break;
          case 39:
            that.nextImg();
            break;
        }
      }
    },
    wheelFun(event) {
      if (this.mousescroll) {
        event.stopPropagation();
        if (event.deltaY > 0) {
          this.nextImg();
        } else {
          this.prevImg();
        }
      }
    },
    touchFun(event) {
      event.stopPropagation();
      this.touchPoint.prev = event.touches[0].clientX;
    },
    endFun(event) {
      event.stopPropagation();
      this.touchPoint.now = event.changedTouches[0].clientX;
      var that = this;
      if (this.touchPoint.prev > this.touchPoint.now + 50) {
        if (this.index < this.images[this.index].total - 1) {
          that.nextImg();
        }
      } else if (this.touchPoint.now > this.touchPoint.prev + 50) {
        if (this.index > 0) {
          that.prevImg();
        }
      }
    }
  },
  watch: {
    index() {
      console.log("lightbox index", this.index);
    },
    isShow() {
      if (this.isShow) {
        document.body.style.position = "fixed";
        window.addEventListener("keydown", this.keyFun);
        // this.$refs.lightbox.addEventListener('mousewheel', this.wheelFun);
        this.$refs.lightbox.addEventListener("touchstart", this.touchFun);
        this.$refs.lightbox.addEventListener("touchend", this.endFun);
      } else {
        this.pauseImg();
        document.body.style.position = "static";
        window.removeEventListener("keydown", this.keyFun);
        // this.$refs.lightbox.removeEventListener('mousewheel', this.wheelFun);
        this.$refs.lightbox.removeEventListener("touchstart", this.touchFun);
        this.$refs.lightbox.removeEventListener("touchend", this.endFun);
      }
    }
  },
  components: {
    gallery,
    fancybox,
    paginator
  }
};
</script>

<style lang="scss" scoped>
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  padding: 2px;
  background: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  font-size: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
