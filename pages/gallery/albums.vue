<template>
    <div class="gallery">
      <NoSSR>
        <ul class="years" v-show="yearList">
          <li
            class="item"
            v-for="year in yearList"
            :key="year.year"
            @click="getAlbums(year.year)"
            :class="{current: year.year===curYear}"
            :data-count="year.count"
          >{{year.year}}</li>
        </ul>
        <ul v-if="curYear && albumList" class="albums" :class="{canHover: userCanHover}">
          <li
            class="item"
            v-for="album in albumList"
            :key="album.aid"
            @click="getAlbum(album.aid)"
            :class="[{current: album.aid===curAlbum}, hoverClass(album.title)]"
            :data-count="album.count"
            data-len="album.title.length"
          >
            <div>{{album.title}}</div>
          </li>
        </ul>
        <div class="pictures">
          <Lightbox
            :imgs="pictures"
            :modalclose="modalclose"
            :keyinput="keyinput"
            :mousescroll="mousescroll"
            :showclosebutton="showclosebutton"
            :showcaption="showcaption"
            :imagecountseparator="imagecountseparator"
            :showimagecount="showimagecount"
            :showthumbnails="showthumbnails"
            v-if="pictures.length"
          />
          <nuxt-link class="addMore" to="/gallery/upload">Add
            <br>Photos
          </nuxt-link>
        </div>
      </NoSSR>
    </div>
</template>
<script>
import galleryMixin, { getGalleryData } from '~/components/GalleryMixin';
import Lightbox from '~/components/vue-images/lightbox';
import { mapActions, mapState } from 'vuex';
import NoSSR from 'vue-no-ssr';
// var Lightbox;
export default {
  props: ['walkId'],
  mixins: [galleryMixin],
  beforeCreate() {
    // get current authentication status
  },
  async beforeMount() {
    await getGalleryData('getYears');
    await this.$store.dispatch('gallery/getYears');
    let res = await getGalleryData('AlbumList');
    let albums = res.data;
    this.albums = albums;
  },
  mounted() {
  },
  components: { Lightbox, NoSSR },
  // layout: 'full',
  data() {
    return {
      modalclose: true,
      keyinput: true,
      mousescroll: true,
      showclosebutton: true,
      showcaption: true,
      imagecountseparator: 'of',
      showimagecount: true,
      showthumbnails: true,
      userCanHover: false,
      albums: null,
    };
  },
  computed: {
    ...mapState('gallery', [
      'curYear',
      'yearList',
      'curAlbum',
      'albumList',
      'pictures',
    ]),
  },
  methods: {
    ...mapActions('gallery', ['getAlbums', 'getAlbum']),
    hoverClass(title) {
      let len = title.length;
      let j1 = len * 0.46;
      j1 = Math.round(j1);
      let j2 = Math.max(j1 - 10, 0);
      let j3 = Math.ceil(j2);
      let j = j3;
      // let j = Math.ceil(Math.max(len * 0.46 + 1 - 14, 0) / 5);
      // return `W${j}`;
      const clss = `W${j}`;
      console.log('hoverClass', title, len, j1, j2, j3, clss);
      return {
        [clss]: true,
      };
    },
    styleTitle(title) {
      let len = title.length;

      let j = Math.round(len * 0.46);
      j = Math.max(j, 11);
      // return `W${j}`;
      const obj = {
        maxWidth: `${j}em`,
        minWidth: `${j}em`,
      };
      console.log('styleTitle', title, len, j, obj);
      return {
        maxWidth: `${j}em`,
        minWidth: `${j}em`,
      };
    },
  },
};
</script>

<style scoped>
@custom-media --small-viewport (width < 500px);
:root {
  --fontSize: 1em;
  --albumWidth: 12.5em;
  --liWidth: 11em;
}

@media (--small-viewport) {
  :root {
    --fontSize: 0.7em;
    --albumWidth: 9em;
    --liWidth: 8.5em;
  }
}

.gallery {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;

  & ul {
    list-style: none;
    padding-left: 0;
    padding-right: 0.5em;
    position: relative;
    max-width: 12.5em;
    max-width: var(--albumWidth);
    font-size: var(--fontSize);

    &.albums {
      & li {
        list-style: none;
        list-style-image: none;
        overflow: visible;
        transition: all 0.2s ease-in-out;
        & div {
          max-width: var(--liWidth);
          min-width: var(--liWidth);
          /*max-height: 1em;*/
          padding-right: 1em;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        &:hover {
          background-color: rgba(244, 237, 220, 0.98);
          z-index: 200;
          &.W1 {
            min-width: 13.5em;
          }
          &.W2 {
            min-width: 14.7em;
          }
          &.W3 {
            min-width: 15.9em;
          }
          &.W4 {
            min-width: 17.1em;
          }
          &.W5 {
            min-width: 18.3em;
          }
          &.W6 {
            min-width: 19.5em;
          }
          &.W7 {
            min-width: 20.7em;
          }
          &.W8 {
            min-width: 21.9em;
          }
          /*width: auto;*/
          & div {
            max-width: none;
            overflow: visible;
          }
        }
      }
    }

    & li {
      box-sizing: border-box;
      position: relative;
      border-style: solid;
      border-width: 3px;
      border-radius: 0.56em;
      border-color: #ccc;
      padding: 0.2em 1.2em 0.2em 0.7em;
      margin: 0.2em 0 0 0;
      z-index: 50;
      &:hover {
        background-color: rgba(244, 237, 220, 0.98);
      }
      &.current {
        background-color: rgba(241, 222, 174, 0.98);
        border-style: double;
        border-color: #444;
        &[data-count]:after {
          background-color: rgba(136, 91, 43, 0.94);
          color: #fff;
        }
      }
      &[data-count]:after {
        /*--badge: {*/
        position: absolute;
        top: -3px;
        right: -3px;
        font-size: 0.7em;
        color: white;
        width: 1.6em;
        height: 1.6em;
        text-align: center;
        text-indent: 0;
        line-height: 1.6em;
        border-radius: 50%;
        z-index: 100;
        overflow: visible;
        box-shadow: 0 0 1px #333;
        color: #888;
        background-color: rgba(241, 222, 174, 0.98);
        content: attr(data-count);
      }
    }
  }
  & .pictures {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & .addMore {
      width: 5em;
      text-align: center;
      border-width: 3px;
      border-radius: 0.56em;
      background-color: rgba(241, 222, 174, 0.98);
      border-style: double;
      border-color: #444;
      color: #444;
      text-decoration: none;
    }
  }
}
</style>
