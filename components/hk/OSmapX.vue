<template lang="html">
  <div>
    <div id="map" style="border: 1px solid black; width:100vw; height:800px;"></div>
    <div class="selectorRegion" v-if="osMap" >
      <OSLayer v-for="wk in walks" :no="wk" :color="colors[wk]" :active="wk==no" :route="route(wk)" :osMap="osMap" :key="no"></OSLayer>
    </div>
  </div></template>

<script>
/* global OpenSpace */
import Vue from 'vue';
import OSLayer from '~/components/hk/OSMapLayer';
export default {
  props: ['walkId', 'no', 'lat', 'lng', 'gpxJ'],
  components: { OSLayer },
  data() {
    return {
      osMap: null,
      walks: [1, 2, 3, 4, 5],
      colors: ['', '#ff0000', '#0000ff', '#00ff00', 'orange', 'purple']
    };
  },
  async beforeMount() {
    // let res = await this.getWalkData('getRoutesGpxJ', this.walkId);
    // this.gpxJ = res.data;
    let { walkId, no, lat, lng, gpxJ, cent } = this;
    console.log('OSmap gpxJ', { walkId, no, cent, lat, lng, gpxJ });
    // initiate the map
    await Vue.nextTick();
    var options = {
      resolutions: [2500, 1000, 500, 200, 100, 50, 25, 10, 5, 4, 2.5, 2, 1]
    };
    this.osMap = new OpenSpace.Map('map', options);
    lat = (368455 + 374849) / 2;
    let long = (519659 + 528052) / 2;
    this.osMap.setCenter(new OpenSpace.MapPoint(lat, long), 7);
    console.log('OSMap', this.osMap, lat, long);
  },
  methods: {
    route(no) {
      return `/walkdata/2017/2017-09-23/data-2017-09-23-walk-${no}.gpx`;
    }
  }
};
</script>

<style lang="css">
.selectorRegion {
  padding: 3px;
  background-color: #ccc;
}
</style>
