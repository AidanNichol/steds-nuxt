<template>
  <div>
  <nuxt-link :to="to" :class="{active: to === current}"><slot/></nuxt-link>
  </div>
</template>
<script>
export default {
  props: ['to'],
  computed: {
    current() {
      return this.$route.path;
    }
  }
};
</script>
