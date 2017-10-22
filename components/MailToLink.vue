<template>
  <div>
    <a  :href="mailto">{{to}}</a>
  </div>
</template>
<script>
export default {
  props: ['to'],
  computed: {
    mailto() {
      return `mailto:${this.to}`;
    }
  }
};
</script>
