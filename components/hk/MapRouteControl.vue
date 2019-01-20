<template lang="html">
  <span>

  <el-button-group>
    <el-button :type="bType" :tooltip="tipText" @click="toggleRoute" class="w-button tooltip">Walk {{no}}</el-button>
    <el-button class="i-button tooltip" :tooltip="'Edit stroke for walk '+no" @click="showEditDialog" :style="{backgroundColor: options.strokeColor}">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon-img">
    <path :d="pencil" style="fill: white; stroke:white; mix-blend-mode: difference;"/>
    </svg>
      <!-- <img class="icon-img" src="~/assets/image/pencil-alt.svg"  style="fill: #ffff00"/> -->
    </el-button>
  </el-button-group>
  <el-dialog :visible.sync="showEdit" :title="'Edit stroke for Walk '+no" show-close>
    <el-form :model="options" @submit.native.prevent>
      <el-form-item label="Stroke Width" label-width="9em">
        <el-slider v-model="options.strokeWidth" :step="1" @change="widthChanged" :max="20" show-stops />
      </el-form-item>
      <el-form-item label="Opacity" label-width="9em">
        <el-slider v-model="options.strokeOpacity" :step="0.1" @change="opacityChanged" :max="1" show-stops />
      </el-form-item>
      <el-form-item label="Colour" label-width="9em">
        <el-color-picker
          v-model="options.strokeColor" @change="colorChanged"
          :predefine="predefineColors">
        </el-color-picker>
      </el-form-item>
    </el-form>
   
  </el-dialog>
  
</span>
</template>

<script>
import colors from './colors.js';
console.log('colours', colors);

// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path :d="pencil"/></svg>
export default {
  props: ['options', 'no', 'active', 'toggleRoute', 'optionsChanged'],
  data() {
    return {
      showColor: false,
      showEdit: false,
      predefineColors: (colors),
      pencil: "M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z",
    };
  },
  computed: {
    bType() {
      return this.active ? 'primary' : 'default';
    },
    tipText() {
      return (this.active ? 'Hide' : 'Show')+' walk '+this.no;

    },
  },
  beforeMount() {
    console.log(`MapRouteControl beforeMount ${this.no}`, this);
  },
  methods: {
    showEditDialog(){
      this.showEdit=true;
      if (!this.active)this.toggleRoute();
    },
    colorChanged(val) {
      console.log(`colorChanged ${this.no}`, val);
      this.optionsChanged('strokeColor', val);
      this.showColor = false;
    },
    widthChanged(val) {
      console.log(`widthChanged ${this.no}`, val);
      this.optionsChanged('strokeWidth', val);
    },
    opacityChanged(val) {
      console.log(`opacityChanged ${this.no}`, val);
      this.optionsChanged('strokeOpacity', val);
    },
    
  },
};
</script>

<style lang="css">
.tooltip {
    position: relative;
}
.tooltip:after {
    position: absolute;
    padding: 8px;
    border: 3px solid #000;
    border-radius: 8px;
    background-color: #C5E384;
    font-size: .9em;
    font-weight: bold;
    color: #000;
    content: attr(tooltip);
    min-width: 80px;
    bottom: 150%;
    left: 0;
    /* width: -moz-max-content; */
    /* width: -webkit-max-content; */
    opacity: 0;
    transition: all .2s ease-in-out .25s;
    visibility: hidden;
    z-index: 2;
}
.tooltip:hover:after {
    opacity: 1;
    visibility: visible;
    bottom: 120%;
}
.tooltip:before {
    content: "";
    display: block;
    position: absolute;
    border-width: 7px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0);
    opacity: 0;
    transition: all .2s ease-in-out .25s;
    top: -51%;
    left: 50%;
    transform: translateX(-50%);
    border-top-color: #000;
    visibility: hidden;
}
.tooltip:hover:before {
    opacity: 1;
    top: -21%;
    visibility: visible;
}
.el-button-group {
  margin-right: 0.5em;
}
.w-button {
  padding-left: 3px;
  padding-right: 3px;
  height: 36px;
}
.i-button {
  padding: 8px;
  & svg {
    width: 16px;
    max-height: 32px;
  }
}
</style>
