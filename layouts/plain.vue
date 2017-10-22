<template>
<div class="page myPage">
  <div class="head">
    <banner/>
  </div>
  <div class="body">
    <div class="main">
      <nuxt/>
    </div>
  </div>
  <div class="foot myFooter width-1of1">
        <p>
          Send mail to <a href="webmaster@stedwardsfellwalkers.co.uk">Webmaster</a> with questions or comments about this site. </p>
  </div>
</div>
</template>
<script>
import axios from 'axios';
import banner from '~/components/bannerStEds';
import { stedsServer } from '~/assets/js/config';
export default {
  components: {
    banner
  },
  created() {
    console.log('default created');
    this.$store.dispatch('hydrateStore');
  },
  async fetch({ store, params }) {
    let res = await axios.get(`${stedsServer}/walks/GetYears`);
    console.log('default fetch', {
      res
    });
    store.commit('setYears', res.data);
  },
  async asyncData({ route }) {
    console.log('default template', {
      route
    });

    return {
      route: route
    };
  }
};
</script>

<style lang="scss">
/* copied from kohsteds */
@media screen{
.myPage{
  width:800px;
  margin-left: auto;
  margin-right: auto;
  background: #FFFFFF;
}

}
body {
  background: #ddd;
  color: #333;
  margin: 0;
  padding: 0;
  border: 0;
  border-top: 5px solid #bbb;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  padding-bottom: 25px;
  box-sizing: border-box;
}
a {
  color:#CC3300;
  font-weight: bold;
  text-decoration: none;

  &:visited{
    color:#CC3300;
  }
  &:hover{
    color:white;
    background-color:#CC3300;
  }

}
</style>
