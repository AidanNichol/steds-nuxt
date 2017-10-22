<template lang="html">
  <OSMap :walkId='walkId' :no='no'/>
</template>


<script>
import OSMap from '~/components/hk/OSMap';
import WalksMixin from '~/components/WalksMixin';
export default {
  mixins: [WalksMixin],
  components: { OSMap },

  data() {
    return {
      walkId: null,
      no: null,
      lat: null,
      lng: null,
      gpxJ: null,
      start: null,
      end: null,
      cent: null
    };
  },
  async beforeMount() {
    console.log('gpxJ', this);
    let query = this.$route.query;
    this.walkId = query.walkId;
    this.no = query.no;
  },
  methods: {
    imgFile(img) {
      // return `http://stedwardsfellwalkers.co.uk/${img}`;
      // return `../../../Users/aidan/Websites/htdocsC/${img}`;
      return `/${img}`;
    }
  }
};
</script>
<style lang="css">
</style>
