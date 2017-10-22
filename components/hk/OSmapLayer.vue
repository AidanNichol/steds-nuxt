<template lang="html">
  <span>

  <el-button-group>
    <el-button :type="bType" @click="toggleVisibility">Walk {{no}}</el-button>
    <el-button class="i-button" @click="showColor=true" :style="{backgroundColor: style.strokeColor}"><img class="icon-img" src="~/assets/image/paint-brush.svg" /></el-button>
    <el-button class="i-button" @click="showWidth = true"><img src="~/assets/image/line_width1600.png" /></el-button>
    <el-button class="i-button" @click="showOpacity = true"><img src="~/assets/image/opacity-512.png" /></el-button>
  </el-button-group>
  <el-dialog :visible.sync="showColor" size="tiny" :title="'Choose colour for Walk '+no">
    <Swatches :value="style.strokeColor" @input="colorPicked" />
  </el-dialog>
  <el-dialog :visible.sync="showWidth" size="tiny" :title="'Choose stroke width for Walk '+no">
    <el-input-number v-model="style.strokeWidth" @change="styleChanged" :min="1" :max="10"></el-input-number>
  </el-dialog>
  <el-dialog :visible.sync="showOpacity" size="tiny" :title="'Choose line opacity for Walk '+no">
    <el-slider v-model="style.strokeOpacity" :step="0.1" @change="styleChanged" :max="1" show-stops />
  </el-dialog>
</span>
</template>

<script>
/* global OpenLayers */
import { Swatches } from 'vue-color';
export default {
  props: ['osMap', 'no', 'route', 'active', 'color'],
  components: { Swatches },
  data() {
    return {
      lgpx: null,
      layer: null,
      showColor: false,
      showWidth: false,
      showOpacity: false,
      style: { strokeColor: 'red', strokeWidth: 3, strokeOpacity: 1 }
    };
  },
  computed: {
    bType() {
      return this.lgpx ? 'primary' : 'default';
    },
    cTitle() {
      return ``;
    },
    wTitle() {
      return ``;
    },
    oTitle() {
      return ``;
    }
  },
  beforeMount() {
    this.style.strokeColor = this.color;
    this.style.strokeOpacity = this.active ? 1 : 0.7;
    if (this.active) this.showLayer();
  },
  methods: {
    toggleVisibility() {
      if (this.lgpx) this.hideLayer();
      else this.showLayer();
    },
    showLayer() {
      console.log(`showing ${this.no}`);
      if (this.lgpx) {
        this.lgpx.setVisibility(true);
        return;
      }
      this.lgpx = new OpenLayers.Layer.GML(
        `gpx${this.no}`,
        // this.gpx,
        this.route,
        // '/walkdata/2017/2017-09-23/data-2017-09-23-walk-2.gpx',
        {
          format: OpenLayers.Format.GPX,
          style: this.style,
          projection: new OpenLayers.Projection('EPSG:4326')
        }
      );

      this.layer = this.osMap.addLayer(this.lgpx);
      // osMap.addLayer(lgpx2);
      console.log(
        'lgpx addLayer ' + this.no,
        this.osMap,
        this.lgpx,
        this.layer
      );
    },
    hideLayer() {
      console.log(`hiding ${this.no}`, this.lgpx);
      // this.lgpx.setVisibility(false);
      if (this.lgpx) this.osMap.removeLayer(this.lgpx);
      // if (this.lgpx) this.osMap.removeLayer(`gpx${this.no}`);
      this.lgpx = null;
    },
    colorPicked(col) {
      console.log(`colorPicked ${this.no}`, col);
      this.style.strokeColor = col.hex;
      this.styleChanged();
      // this.showLayer();
      this.showColor = false;
    },
    styleChanged(col) {
      console.log(`widthChanged ${this.no}`, col);
      // this.style.strokeColor = col.hex;
      this.hideLayer();
      this.showLayer();
      // this.showColor = false;
    },
    tweakOpactity() {
      // this.lgpx.style.strokeOpacity = 0.5;
      this.style.strokeColor = 'purple';
      // this.lgpx.styleMap = this.style;
      console.log(`tweakOpactity ${this.no}`, this.lgpx);
      // this.lgpx.setVisibility(false);
    }
  }
};
</script>

<style lang="css">
.el-button-group { margin-right: 1em;}
.i-button {
  padding: 3px;
  & img {width: 26px; max-height: 32px;}
}
</style>
