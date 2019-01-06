
<template>
  <div id="showbox">
    <Loading
      class="slideshow"
      style="font-size:2rem; text-align:center;"
      v-if="!pictures.length"
      typ="1"
    />
    <transition-group name="slide" tag="div" class="img-slider">
      <div class="slideshow" :class="{portrait:pic.pheight-pic.pwidth>0}" :key="pic.pid">
        <div class="album">
          <img
            v-if="timer"
            @click="stopRotation"
            class="fa-icon"
            src="~/assets/image/fa-solid/pause.svg"
          >
          <img
            v-else
            @click="startRotation"
            class="fa-icon"
            src="~/assets/image/fa-solid/play-circle.svg"
          >
          <a title="click to see this album">{{pic.album}}</a>
          <span>&nbsp;</span>
        </div>
        <div class="pic">
          <nuxt-link to="/gallery/latestPictures">
            <no-ssr>
              <div class="img">
                <img
                  class="lazyload"
                  :data-src="imageName(pic)"
                  :data-srcset="mapAlbum(pic.srcset)"
                  data-sizes="auto"
                >
              </div>
            </no-ssr>
          </nuxt-link>
        </div>
        <div class="labelling">
          <img
            v-if="timer"
            @click="stopRotation"
            class="fa-icon"
            src="~/assets/image/fa-solid/pause.svg"
          >
          <img
            v-else
            @click="startRotation"
            class="fa-icon"
            src="~/assets/image/fa-solid/play-circle.svg"
          >
          <div>
            <div class="photographer" @click="startRotation">{{pic.photographer}}</div>
            <div class="title">{{pic.title}}</div>
            <div class="caption">{{pic.caption}}</div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import NoSsr from 'vue-no-ssr';
import Loading from '~/components/Loading';

export default {
  name: 'ShowSlides',
  components: { 'no-ssr': NoSsr, Loading },
  // props: ['pictures'],
  mounted() {
    this.timer || this.startRotation();

    if (typeof document.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      this.hidden = 'hidden';
      this.visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      this.hidden = 'msHidden';
      this.visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      this.hidden = 'webkitHidden';
      this.visibilityChange = 'webkitvisibilitychange';
    }
  },
  beforeDestroy() {
    this.timer && this.stopRotation();
  },
  data() {
    return {
      timer: null,
      loading: require('~/components/Loading.vue'),
      hidden: null,
      visibilityChange: null,
    };
  },
  computed: {
    ...mapState(['pictures', 'curPic']),
    pic() {
      return this.pictures[this.curPic];
    },
    ctrlChar() {
      return this.test ? '&#10074;&#10074;' : '&#9658;';
    },
    lpictures() {
      // for testing - only show landscape pictures
      return this.picture.filter(pic => pic.pheight - pic.pwidth > 0);
    },
  },
  methods: {
    ...mapActions(['nextPic']),
    imageName(pic) {
      return pic
        ? `http://www.stedwardsfellwalkers.co.uk/gallery/${pic.filepath}${
            pic.thumb
          }`
        : ``;
    },
    mapAlbum(src) {
      // process.env.NODE_ENV !== 'production'
      const loc = `http://www.stedwardsfellwalkers.co.uk/gallery/albums`;
      return src.replace(/albums/g, loc);
    },
    shiftit() {
      console.log('shiftit', this.curPic);
      this.nextPic();
    },
    orientation(pic) {
      return pic.pheight > pic.pwidth ? 'portrait' : 'landscape';
    },
    toggleRotation() {
      this.timer ? this.stopRotation() : this.startRotation();
    },
    startRotation() {
      console.log('starting rotation');
      const nextPicIfNotHidden = () => {
        console.log('nextPicIfNotHidden', document, document[this.hidden]);
        if (!document[this.hidden]) this.nextPic();
      };
      this.timer = setInterval(nextPicIfNotHidden, 5000);
      console.log('starting rotation');
    },
    stopRotation() {
      clearTimeout(this.timer);
      this.timer = null;
    },
  },
};
</script>

<style>
img.fa-icon {
  width: 1em;
  height: 1em;
  padding: 0.1em;
}
</style>

<style lang="scss" scoped>
.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}

.img-slider {
  overflow: hidden;
  position: relative;
  height: 300px;
  width: 332px;
}

.img-slider .slideshow {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

#showbox {
  position: relative;
  transition: transform 0.5s linear;
  transform: none;
  border-style: solid;
  border-color: #cc9999;
  box-sizing: border-box;
  margin: -2px 1px 2px 1px;

  border-width: 0 3px 3px 3px;
  min-height: 250px;

  > div {
    display: flex;
    justify-content: center;
  }
}
.slideshow {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 10pt;
  height: 300px;
  width: 100%;
  margin: 0;
  & .album,
  & .labelling {
    display: flex;
    justify-content: space-between;
    & img {
      width: 1em;
      height: 1em;
    }
  }
  &:not(.portrait) {
    & .labelling img {
      opacity: 0;
    }
  }
  &.portrait {
    flex-direction: row-reverse;

    & .album {
      writing-mode: vertical-rl;
      padding-right: 0.5em;
      & img,
      & span {
        opacity: 0;
      }
    }
    & .labelling {
      writing-mode: vertical-rl;
      padding-bottom: 1em;
      padding-left: 0.2em;
    }
    & .pic img {
      height: 300px;
      width: 280px;
    }
  }
}

.slideshow a {
  text-decoration: none;
  font-size: 10pt;
  height: auto;
}
.slideshow .photographer {
  font-size: 80%;
  font-style: italic;
  text-align: right;
}
.slideshow .title {
  font-weight: bold;
  text-align: center;
}
.slideshow .album {
  font-weight: bold;
  text-align: center;
}
.slideshow .pic {
  flex: 1 1 auto;
  /*display:table-cell;*/
  width: 100%;
  text-align: center;
  vertical-align: top;
}
.slideshow .img {
  width: 100%;
  /*display:table-cell;*/
  /*text-align:center;*/
}
.slideshow .caption {
  font-weight: 90%;
}
.slideshow img {
  border-style: none;
  width: 332px;
  height: 252px;
  object-fit: contain;
}
.slideshow .labelling {
  height: auto;
  padding-right: 0.5em;
}
</style>
