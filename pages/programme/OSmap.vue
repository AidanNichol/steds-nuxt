<template lang="html">
  <div class="osmap" >
    <div id="map" :style="{border: '1px solid black'}"></div>
    <div class="selectorRegion" v-if="osMap" >
      <MapRouteControl v-for="lay in fLayers" :no="lay.no" :options="lay.options" :active="lay.lgpx" :toggleRoute="toggleRoute(lay.no)" :lay="lay" :optionsChanged="changeValue(lay.no)" :key="lay.no"></MapRouteControl>
    </div>
    <el-dialog title="Trying to Hide All Walks" :visible.sync="notificationVisible" >
      <span>You must display at least one walk to satisfy the Ordnance Survey's terms and conditions</span>
    </el-dialog>  
  </div>
</template>

<script>
/* global OpenSpace, OpenLayers */
import Vue from 'vue';
import { mapMutations } from 'vuex';
import MapRouteControl from '~/components/hk/MapRouteControl';
import WalksMixin from '~/components/WalksMixin';
const colors = ['white', '#ff0000', '#0000ff', '#00ff00', '#ff8c00', '#4B0082'];

export default {
  // props: ['walkId', 'no'],
  layout: 'defaultMin',
  components: { MapRouteControl },
  mixins: [WalksMixin],
  data() {
    let ret = {
      gpxJ: null,
      osMap: null,
      markerF: null,
      cent: [],
      end: [],
      layers: [],
      data: null,
      no: null,
      noRoutes: 5,
      notificationVisible:false,
      // mHt: '60vh',
      // mWd: '100vw'
    };
    [0, 1, 2, 3, 4, 5].forEach(no => {
      ret.layers[no] = {
        lgpx: null,
        marker: null,
        no: no,
        options: { strokeColor: colors[no], strokeWidth: 5, strokeOpacity: 1 },
      };
    });
    console.log('OSMap data', ret);
    return ret;
  },
  computed: {
    fLayers() {
      return this.layers.filter(
        layer => layer.no !== 0 && layer.no <= this.noRoutes
      );
    },
  },
  async beforeMount() {
    // this.windowResize();
    // window.onresize = this.windowResize;
    console.log('props', this.vpHeight, this.$props, Notification);
    // this.$nextTick(async function() {
    try {
      let query = this.$route.query;
      this.walkId = query.walkId;
      this.no = query.no;
      this.noRoutes = query.noRoutes;
      console.log('OSMap beforeMount0', this);
      let res = await this.getWalkData('getRoutesGpxJ', this.walkId);
      this.gpxJ = res.data;
      this.setSecondaryHeading({
        main: this.walkId,
        sub: this.gpxJ.area,
      });
      const gpx = res.data[this.no];
      console.log('OSMap beforeMount', gpx, this.walkId, res, res.data);
      Object.assign(this, gpx);
      console.log('OSMap beforeMount2', this);
      let { walkId, no, lat, lng, gpxJ, cent, end } = this;
      console.log('OSmap gpxJ', { walkId, no, cent, lat, lng, gpxJ, end });
      // initiate the map
      await Vue.nextTick();
      var options = {
        resolutions: [2500, 1000, 500, 200, 100, 50, 25, 10, 5, 4, 2.5, 2, 1],
      };
      this.osMap = new OpenSpace.Map('map', options);
      lat = (368455 + 374849) / 2;
      let long = (519659 + 528052) / 2;
      this.osMap.setCenter(new OpenSpace.MapPoint(...this.cent), 7);
      console.log('OSMap', this.osMap, lat, long);
      this.showLayer(this.no);
      var size = new OpenLayers.Size(32, 32);
      var offset = new OpenLayers.Pixel(-12, -30);
      // var offset = new OpenLayers.Pixel(0, 0);
      var icon = new OpenSpace.Icon(
        '/images/Finish-Flag-icon32.png',
        size,
        offset
      );

      // Creating a postion for the marker and then adding it

      var pos = new OpenSpace.MapPoint(...this.end);
      this.markerF = this.osMap.createMarker(pos, icon);

      // var markers = new OpenLayers.Layer.Markers('Markers');
      //
      // // Add the layer to the map
      //
      // this.osMap.addLayer(markers);
      //
      // // Create a variable to hold a map position
      //
      // var pos = new OpenSpace.MapPoint(...this.end);
      //
      // // Add a marker with that position
      //
      // var marker = new OpenLayers.Marker(pos);
      // markers.addMarker(marker);
    } catch (e) {
      console.log('OSMap beforeMount error', e.toString(), e);
    } finally {
    }
    // });
  },
  beforeDestroy() {
    this.setSecondaryHeading(null);
  },
  methods: {
    ...mapMutations(['setSecondaryHeading']),
    // windowResize() {
    //   let vh = window.innerHeight;
    //   this.mHt = ((vh - 99) / vh * 100).toFixed(2) + 'vh';
    //   let vw = window.innerWidth;
    //   this.mWd = ((vw - 12) / vw * 100).toFixed(2) + 'vw';
    //   console.log('window resize', this.mHt, this.mWd);
    // },
    route(no) {
      return this.getWalkdataURL(
        this.walkId.substr(0, 4),
        this.walkId,
        `data-${this.walkId}-walk-${no}.gpx`
      );
      // return `/walkdata/${this.walkId.substr(0, 4)}/${this.walkId}/data-${this
      //   .walkId}-walk-${no}.gpx`;
    },
    toggleRoute(no) {
      return () => this.toggleVisibility(no);
    },
    toggleVisibility(no) {
      if (this.layers[no].lgpx) {
        let layersVisible = this.layers.reduce(
          (sum, layer) => (sum += layer.lgpx ? 1 : 0),
          0
        );
        console.log('hide layers', this.layers, layersVisible);
        if (layersVisible > 1) this.hideLayer(no);
        else { this.notificationVisible = true;
        }
      } else this.showLayer(no);
    },
    showLayer(no) {
      let lay = this.layers[no];
      const start = this.gpxJ[no].start;
      console.log(`showing ${no}`, lay);
      if (lay.lgpx) {
        lay.lgpx.setVisibility(true);
        return;
      }
      // let vectorLayer = this.osMap.getVectorLayer();
      // lay.lgpx = vectorLayer.GML(
      lay.lgpx = new OpenLayers.Layer.GML(
        `gpx${lay.no}`,
        // lay.gpx,
        this.route(no),
        // '/walkdata/2017/2017-09-23/data-2017-09-23-walk-2.gpx',
        {
          format: OpenLayers.Format.GPX,
          style: lay.options,
          projection: new OpenLayers.Projection('EPSG:4326'),
        }
      );
      lay.lgpx.setZIndex(1000);
      this.osMap.addLayer(lay.lgpx);
      var size2 = new OpenLayers.Size(26, 32);
      var offset2 = new OpenLayers.Pixel(-13, -30);
      var icon2 = new OpenSpace.Icon(`/images/start-${no}.png`, size2, offset2);

      // Creating a postion for the marker and then adding it

      var pos2 = new OpenSpace.MapPoint(start);
      lay.marker = this.osMap.createMarker(pos2, icon2);
      // osMap.addLayer(lgpx2);
      console.log('lgpx addLayer ' + lay.no, this.osMap, lay.lgpx);
    },
    hideLayer(no) {
      let lay = this.layers[no];
      console.log(`hiding ${lay.no}`, lay);
      // lay.lgpx.setVisibility(false);
      if (lay.lgpx) this.osMap.removeLayer(lay.lgpx);
      // if (lay.lgpx) lay.osMap.removeLayer(`gpx${lay.no}`);
      lay.lgpx = null;
      if (lay.marker) this.osMap.removeMarker(lay.marker);
    },
    changeValue(no) {
      return (att, val) => {
        this.layers[no].options[att] = val;
        this.hideLayer(no);
        this.showLayer(no);
      };
    },
  },
};
</script>


<style  scoped>
.osmap {
  overflow: scroll;
  /* display: flex;
  flex-direction: column; */
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
  width: 100%;
  & .selectorRegion {
    flex: 0 0 auto;
  }
  & #map {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }
}
.selectorRegion {
  padding: 3px;
  background-color: #ccc;
}
</style>
