<template lang="html">
  <span>

  <el-button-group>
    <el-button :type="bType" @click="toggleRoute" class="w-button">Walk {{no}}</el-button>
    <el-button class="i-button" @click="showColor=true" :style="{backgroundColor: options.strokeColor}"><img class="icon-img" src="~/assets/image/paint-brush.svg" /></el-button>
    <el-button class="i-button" @click="showWidth = true"><img src="~/assets/image/line_width1600.png" /></el-button>
    <el-button class="i-button" @click="showOpacity = true"><img src="~/assets/image/opacity-512.png" /></el-button>
  </el-button-group>
  <el-dialog :visible.sync="showColor" size="tiny" :title="'Choose colour for Walk '+no">
    <Swatches :value="options.strokeColor" @input="colorChanged" />
  </el-dialog>
  <el-dialog :visible.sync="showWidth" size="tiny" :title="'Choose stroke width for Walk '+no">
    <el-input-number :value="options.strokeWidth" @change="widthChanged" :min="1" :max="10"></el-input-number>
  </el-dialog>
  <el-dialog :visible.sync="showOpacity" size="tiny" :title="'Choose line opacity for Walk '+no">
    <el-slider v-model="options.strokeOpacity" :step="0.1" @change="opacityChanged" :max="1" show-stops />
  </el-dialog>
</span>
</template>

<script>
import { Swatches } from 'vue-color';
export default {
  props: ['options', 'no', 'active', 'toggleRoute', 'optionsChanged', 'active'],
  components: { Swatches },
  data() {
    return {
      showColor: false,
      showWidth: false,
      showOpacity: false
    };
  },
  computed: {
    bType() {
      return this.active ? 'primary' : 'default';
    }
  },
  beforeMount() {
    console.log(`MapRouteControl beforeMount ${this.no}`, this);
  },
  methods: {
    colorChanged(val) {
      console.log(`colorChanged ${this.no}`, val);
      this.optionsChanged('strokeColor', val.hex);
      this.showColor = false;
    },
    widthChanged(val) {
      console.log(`widthChanged ${this.no}`, val, this.options.strokeWidth);
      this.optionsChanged('strokeWidth', val);
    },
    opacityChanged(val) {
      console.log(`opacityChanged ${this.no}`, val);
      this.optionsChanged('strokeOpacity', val);
    }
  }
};
</script>

<style lang="css">
.el-button-group { margin-right: 0.5em;}
.w-button {
  padding-left: 3px;
  padding-right: 3px;
}
.i-button {
  padding: 3px;
  & img {width: 26px; max-height: 32px;}
}
</style>
