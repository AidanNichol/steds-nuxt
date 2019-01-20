<template>
  <WalkDetails :walkId="wwId"/>
</template>

<script>
import WalkDetails from '~/components/WalkDetails';
export default {
  props: ['walkId'],
  components: {WalkDetails},
  data() {
    return { wId: '' };
  },
  computed: {
    wwId() {
      let { params, query } = this.$route;
      console.log('walkDetail wwId', this, params, query);
      return this.walkId || params.walkId || query.walkId;
    }
  },
  beforeMount() {
    let { params, query } = this.$route;
    console.log('walkDetail beforeMount', this, params, query);
    let walkId = this.walkId || params.walkId || query.walkId;
    this.wId = walkId;
    console.log('walkDetail beforeMount', this.walkId, walkId, this.wId);
  }
  
};
</script>