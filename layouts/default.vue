<template>
  <div class="page myPage" :class="largeScreenMenu">
    <div class="head">
      <banner/>
    </div>
    <div class="mToggle screenonly" @click="toggleMenu">
      <img v-if="menuHidden" src="~/assets/image/menu.svg" alt>
      <img v-else src="~/assets/image/icon-Cancel.svg" alt>
    </div>
    <div class="body">
      <div class="main">
        <div>
          <PageHeader></PageHeader>
          <nuxt/>
        </div>
      </div>
      <div class="menu screenonly" :class="{hidden: menuHidden}">
        <navBar/>
      </div>
      <!-- <div class="clear"></div> -->
    </div>
    <div class="foot myFooter width-1of1">
      <p>Send mail to
        <a href="mailto:webmaster@stedwardsfellwalkers.co.uk">Webmaster</a> with questions or comments about this site.
      </p>
    </div>
  </div>
</template>
<script>
// import axios from 'axios';
import navBar from '~/components/navBarStEds';
import banner from '~/components/bannerStEds';
import PageHeader from '~/components/PageHeader';

export default {
  components: { navBar, banner, PageHeader },
  beforeMount() {
    this.$store.dispatch('hydrateStore');
  },

  data() {
    return { menuHidden: true };
  },
  computed: {
    largeScreenMenu() {
      let sp = this.$route.path.split('/');
      // console.log({ sp });
      if (['gallery', 'library', 'hk'].includes(sp[1])) return 'hideableMenu';
      if (['walkDetails', 'library'].includes(sp[2])) return 'hideableMenu';
      if (['showOnOSMap', 'OSMap'].includes(sp[2])) {
        return 'hideableMenu fullWidth';
      }
      return 'fixedMenu';
    },
    // group() {
    //   let group = this.bits[1];
    //   if (group === 'Home') group = undefined;
    //   return group;
    // },
    // name() {
    //   let name = this.bits[2];
    //   if (this.bits[3]) name = `${name} ${this.bits[3]}`;
    //   return name;
    // }
  },
  methods: {
    toggleMenu() {
      this.menuHidden = !this.menuHidden;
      // console.log('menuHidden', this.menuHidden);
    },
  },
  // async fetch({ store, params }) {
  //   let res = await axios.get(`${stedsServer}/walks/GetYears`);
  //   store.commit('setYears', res.data);
  // },
  // async asyncData({ route }) {
  //   return { route: route };
  // }
};
</script>
<style lang="scss">
:root {
  --badge: {
    position: absolute;
    top: -8px;
    right: -8px;
    font-size: 0.7em;
    color: white;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    border-radius: 50%;
    box-shadow: 0 0 1px #333;
  }
}
body {
  background-color: #b2d6ff; /* Blue */
  background: #ddd url('~assets/image/offwhitestripes.gif') top left repeat;
  color: #333;
  margin: 0;
  padding: 0;
  border: 0;
  border-top: 5px solid #bbb;
  text-align: center;
  padding-bottom: 25px;
  box-sizing: border-box;
}
a,
a:visited {
  color: #cc3300;
  text-decoration: none;
}
a:hover {
  color: white;
  background-color: #cc3300;
}
hr {
  border: 5px solid #e2e2e2;
  border-width: 0 0 5px 0;
  margin: 20px 10px 10px 10px;
  border-style: inset;
}

hr {
  display: block;
  margin-before: 0.5em;
  margin-after: 0.5em;
  margin-start: auto;
  margin-end: auto;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}
.mToggle {
  width: 100%;
  text-align: right;
  cursor: pointer;
  
  img {
    display: inline-block;
    width: 1.2em;
    border: 1px solid black;
    border-radius: 0.1em;
    margin: 2px;
    padding: 2px;
  }
}
.myPage {
  width: 100%;
  background: #ffffff;
  .body {
    text-align: left;
    display: table-row;
    display: flex;
    flex-direction: row;

    .main {
      flex: 1 1 auto;
      overflow-x: hidden;

      p {
        padding-bottom: 0.5em;
      }

      > div {
        padding: 0 0.3em 0 0.3em;
        min-width: 100vw;
        width: 100vw;
        max-width: 800px;
      }
    }

    .menu {
      flex: 0 0 145px;
      display: table-cell;
      width: 145px;
      overflow-x: hidden;
      transition: all 0.5s linear;
      &.hidden {
        flex: 0 0 0px;
      }
    } /* Mobile Styles */
  }
}

/* Desktop Styles */
@media only screen and (min-width: 801px) {
  body {
    .myPage {
      margin-left: auto;
      margin-right: auto;
      width: 800px;
      max-width: 800px;
      &.fullWidth {
        width: 100vw;
        max-width: 100vw;
      }
      // background: #FFFFFF;
      // display: block;
      &.fixedMenu {
        .mToggle {
          display: none;
        }

        .body {
          .main > div {
            padding: 0 1em 0 1em;
            min-width: 0;
            width: 655px;
          }
          .menu {
            width: 145px;
            flex: 0 0 145px;
            &.hidden {
              flex: 0 0 145px;
            }
          }
        }
      }
      &.hideableMenu {
        &.fullWidth .body .main > div {
          min-width: 100vw;
          width: 100vw;
        }
        .body .main > div {
          min-width: 800px;
          width: 800px;
        }
      }
    }
  }
}
/* copied from kohsteds */



.myFooter {
  border: 0;
  border-top: 1px solid #ccc;
  color: #666;
  background: #eee;
  padding: 0;
  text-align: left;
  clear: both;
  font-size: x-small;
}

/* ====== Lists ======*/
/* numbered list */
.main ol > li {
  list-style-type: decimal;
  margin-left: 40px;
  list-style-image: none;
}
/* standard list */
.main ul > li {
  list-style-type: disc;
  list-style-image: url(~assets/image/listblack.gif);
  list-style-position: outside;
  margin-left: 25px;
  line-height: 1.5em;
  // font-size:    small;
  margin-bottom: 3px;
}
.main ul ul > li {
  list-style-image: url(~assets/image/innerlistblack.gif);
}

.eventsPage {
  padding: 10px 5px;
}

.box {
  border: medium double #999999;
  margin: 2px auto;
  padding: 6px;
  display: inline-block;
  clear: right;
  min-width: 200px;
  max-width: 320px;
}
.eventsPage .box {
  min-width: 400px;
  max-width: 600px;
}
.right {
  float: right;
  clear: right;
}

.box h3.title {
  color: Green;
  font-weight: bold;
}
.box .title {
  padding: 5px 10px;
  border-bottom: thin solid #999999;
  background-color: #ccccff;
}
.profile {
  float: right;
  display: block;
}

@media screen {
  .printonly {
    display: none;
  }
}
@media print {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;

    .screenonly{display:none;}
  }
  .screenonly,
  .col-right,
  .col-left,
  .menu,
  .foot {
    display: none;
  }
  .myPage {
    max-width: 100vw;
    width: 100vw;
    background: #ffffff;
  }
  .head .banner {
    font-size: xx-small;
    text-align: left;
    width: 100%;
  }
  body {
    background: white none;
    border: 0;
    width: 100%;
  }
}
</style>
