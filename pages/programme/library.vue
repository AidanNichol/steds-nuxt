<template >
  <div class="libraryPage">
    <div class="navBars">
      <div class="searchBy">
        <div @click="showByYear=true">
          <img :class="{inactive: !showByYear}" src="~/assets/image/searchByDate.jpg">
        </div>
        <div @click="showByYear=false">
          <img :class="{inactive: showByYear}" src="~/assets/image/searchByRegion.jpg">
        </div>
      </div>
      <NavBarByYear v-if="showByYear" :walks="walksByYear" @walkSelected="newWalk"/>
      <NavBarByRegion v-else :walks="walksByRegion" @walkSelected="newWalk"/>
    </div>
    <div class="center">
      <div class="head">
        <banner/>
      </div>
      <div class="searchBy" v-show="curWalk">
        <!-- <div @click="prevWalk"><img :class="{inactive: curWalkIndex===0}" src="~/assets/image/PrevFingerpost.jpg"></div> -->
        <div @click="showMap=true">
          <img :class="{inactive: !showMap}" src="~/assets/image/viewMap.jpg">
        </div>
        <div @click="showMap=false">
          <img :class="{inactive: showMap}" src="~/assets/image/viewProfiles.jpg">
        </div>
        <!-- <div @click="nextWalk"><img :class="{inactive: !curWalkBlock || curWalkIndex+1 > curWalkBlock.length}" src="~/assets/image/NextFingerpost.jpg"></div> -->
      </div>
      <WalkDetails v-if="curWalk&&!showMap" :walkId="curWalk" :key="'P'+curWalk"/>
      <ShowMap v-if="curWalk&&showMap" :walkId="curWalk" :key="'M'+curWalk"/>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script type="text/javascript">
import NavBarByYear from '~/components/library/NavBarByYear';
import NavBarByRegion from '~/components/library/NavBarByRegion';
import WalkDetails from '~/components/WalkDetails';
import ShowMap from '~/components/library/ShowMap';
import WalksMixin from '~/components/WalksMixin';
import banner from '~/components/bannerStEds';
import {update, forEach} from 'lodash';
export default {
  layout: 'full',
  mixins: [WalksMixin],
  components: { NavBarByRegion, NavBarByYear, banner, WalkDetails, ShowMap },
  data() {
    return {
      curWalk: null,
      // curWalkBlock: null,
      // curWalkIndex: null,
      showByYear: false,
      walksByRegion: [],
      walksByYear: [],
      showMap: true,
    };
  },
  methods: {
    newWalk(walk) {
      // console.log('newWalk', data);
      // let { walk, walks, i } = data;
      // console.log('newWalk', walk, walks, i);
      this.curWalk = walk;
      // this.curWalkBlock = walks;
      // this.curWalkIndex = i;
    },
    // prevWalk() {
    //   if (this.curWalkIndex <= 0) return;
    //   this.curWalkIndex -= 1;
    //   this.curWalk = this.curWalkBlock[this.curWalkIndex];
    // },
    // nextWalk() {
    //   if (this.curWalkIndex + 1 > this.curWalkBlock.length) return;
    //   this.curWalkIndex += 1;
    //   this.curWalk = this.curWalkBlock[this.curWalkIndex];
    // }
  },
  async beforeMount() {
    let { data } = await this.getWalkData('GetWalksByRegionIndex');
    let reg = {};
    forEach(data, rec => {
      update(reg, [rec.regname, rec.finish], v => {
        return [...(v || []), rec];
      });
    });
    console.log('walksByRegion', reg);
    this.walksByRegion = reg;
    data = data.sort((a, b) => a.date < b.date);
    let byYear = {};
    forEach(data, rec => {
      update(byYear, [rec.date.substr(0, 4)], v => {
        return [...(v || []), rec];
      });
    });
    forEach(byYear, (data, year) => {
      byYear[year] = data.sort((a, b) => a.date.localeCompare(b.date));
    });
    console.log('walksByRegion', byYear);
    this.walksByYear = byYear;
  },
};
</script>

<style scoped>
.libraryPage,
.searchBy {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  & .navBars {
    flex: 0 0 180px;
    overflow: hidden;
  }
}
.searchBy {
  /*width: 200px;
  max-width: 200px;*/
  justify-content: space-around;
  & img {
    width: 70px;

    &.inactive {
      opacity: 0.5;
    }
  }
}
</style>
