<template>
  <section class="pageheader">
    <span v-if="name" class="heading"><span>{{name}}</span></span>:
    <span v-if="main" class="secondary">{{main}}</span>
    <span v-if="sub" class="secondary">{{sub}}</span>
  </section>
</template>
<script>
const titleize  = require('titleize');
import { mapState } from 'vuex';
const cleanup = xx =>
  xx && titleize(xx.replace(/[_-]s[_-]/g, `'s-`).replace(/[_-]/g, ' '));
export default {
  head() {
    return { title: this.parsedRoute.join('|') };
  },
  computed: {
    ...mapState(['secondaryHeading']),
    parsedRoute() {
      let { path } = this.$route;
      var reg = new RegExp('/([^/]+)/?([^/]+)?');
      const match = reg.exec(path);
      if (!match) return [null, null];
      let [group, name] = match.slice(1, 3).map(xx => cleanup(xx));
      return [group, name];
    },
    main() {
      return this.secondaryHeading && this.secondaryHeading.main;
    },
    sub() {
      return this.secondaryHeading && this.secondaryHeading.sub;
    },
    group() {
      const group = this.parsedRoute[0];
      return group === 'Home' ? null : group;
    },
    name() {
      return this.parsedRoute[1];
    }
  }
};
</script>
<style scoped>

section {
  font-size: 1.3rem;

  & span {
    color:#008000;
    display: inline-block;
    &.secondary {
      padding-left: 1em;
      color: rgb(134, 97, 24);
    }
  }
}
</style>
