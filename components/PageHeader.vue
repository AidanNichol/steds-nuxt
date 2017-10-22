<template>
  <section class="pageheader">
    <h1 v-if="group || main" class="heading"><span>{{group}}</span><span class="secondary">{{main}}</span></h1>
    <h3 v-if="name || sub" class="heading"><span>{{name}}</span><span class="secondary">{{sub}}</span></h3>
  </section>
</template>
<script>
import { titleize } from 'underscore.string';
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
      let { path, query } = this.$route;
      var reg = new RegExp('/([^/]+)/?([^/]+)?');
      const match = reg.exec(path);
      if (!match) return [null, null];
      let [group, name] = match.slice(1, 3).map(xx => cleanup(xx));
      if (group === 'Home') return [group];
      if (group === 'Other') return [name];
      if (name === 'Walks') name += ` ${query.year}`;
      if (name === 'Year') name += ` ${query.year}`;
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

h1, h2, h3, h4 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  & span {
    display: block;
    &.secondary {
      color: rgb(134, 97, 24);
    }
  }
}
</style>

<style>
.pageheader {
  color:#008000;

}
h1, h2, h3, h4, h5, h6 {
  margin:0;
  color:#008000;
}

</style>
