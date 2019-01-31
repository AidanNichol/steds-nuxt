<template>
  <div class="page myPage hideableMenu fullWidth defaultMin">
    <div class="head mToggle" @click="toggleMenu">
      <img class="logo" src="~/assets/image/St.EdwardsLogoSimple.svg" alt>
      <MinPageHeader/>
      <img class="border screenonly" v-if="menuHidden" src="~/assets/image/menu.svg" alt>
      <img class="border screenonly" v-else src="~/assets/image/icon-Cancel.svg" alt>
      <span class="printonly">&nbsp;</span>
    </div>
    <div class="body">
      <div class="main">
        <!-- <div> -->
        <nuxt/>
        <!-- </div> -->
      </div>
      <div class="menu screenonly" :class="{hidden: menuHidden}">
        <navBar/>
      </div>
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
// import banner from '~/components/bannerStEds';
import MinPageHeader from '~/components/MinPageHeader';

export default {
  components: { navBar, MinPageHeader },
  beforeMount() {
    // this.$store.dispatch('hydrateStore');
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

<style>
/* @import "/css/bootstrap-reboot.css" */
</style>

<style scoped>
body {
  background-color: #b2d6ff;
  background: #ddd url('~assets/image/offwhitestripes.gif') top left repeat;
  color: #333;
  margin: 0;
  padding: 0;
  border: 0;
  /*border-top: 5px solid #bbb;*/
  text-align: center;
  padding-bottom: 0;
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
</style>

<style lang="scss" scoped >
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}
.mToggle {
  padding-top: 0.5em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: right;
  cursor: pointer;
  img {
    display: block;
    margin: 2px;
    padding: 2px;
    &.border {
      width: 1.3em;
      border: 1px solid black;
      border-radius: 0.1em;
      // height: 1.2em;
    }
    &.screenonly{
      @media print {
        display: none;
      }
    }
    &.printonly{
      @media screen {
        display: none;
      }
    }
    &.logo {
      width: 2em;
    }
  }
}
.myPage {
  width: 100%;
  background: #ffffff;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  & .head {
    flex: 0 0 auto;
    padding-top: 0;
    min-height: 50px;
  }
  & .foot {
    flex: 0 0 auto;
  }
  & .body {
    flex: 1 1 auto;
  }
}

.myPage {
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
@media print {
  .mToggle .screenonly{
    display:none;
  }
}
</style>
