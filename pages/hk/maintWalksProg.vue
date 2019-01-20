<template lang="html">
  <div class="grid" >
    <Authentication roleReq="1" />
    <div v-if="authenticated">
      <div class="form">
        <Header />
        <div >
          <!-- <h3 :style="{width: '100%', textAlign: 'right'}">{{walkId}} {{walkData.area}}</h3> -->
          <PickWalk @newWalkSelected="newWalk"/>
          <!-- <div>Picked walk : {{walkData}}</div> -->
          <!-- <EditWalkData  v-if="walkData.date" @walkUpdated="walkUpdated" :walkData="walkData" walkDetailChanged="" :key="walkData.date"/> -->
          <EditWalkData  v-if="walkId" @walkUpdated="walkUpdated" :walkData="walkData" :regions="regions" :key="walkId"/>
        </div>
      </div>
      <div class="map">
        <!-- <DisplayMap /> -->
      </div>
      <br/>
      <br/>
      <!-- <MinutesWalkData v-if="walkId" :walk="walkData" :key="'x'+walkId"/> -->
      <ShowMap v-if="walkId" :walkId="walkId" :key="'x'+walkId"/>

    </div>

  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import PickWalk from '~/components/hk/pickWalk';
import EditWalkData from '~/components/hk/EditWalkData';
import walkMixins from '~/components/WalksMixin';
import Authentication from '~/components/authentication';
// import MinutesWalkData from '~/components/hk/MinutesWalkData';
import ShowMap from '~/components/library/ShowMap';
import {format} from 'date-fns/fp';
import {merge, pick , forOwn, includes} from 'lodash';
const fmtYYMMDD = format('yyyy-MM-dd');export default {
  mixins: [walkMixins],
  components: {
    PickWalk,
    EditWalkData,
    // MinutesWalkData,
    ShowMap,
    Authentication
  },
  data() {
    return { walkId: null, walkData: {}, regions: {} };
  },
  async beforeMount() {
    // console.log('mapMutations', mapMutations);
    let { data } = await this.getWalkData(`GetRegions`);
    this.regions = data;
    console.log('maintWalkProg regions', data);
  },
  computed: {
    ...mapState('authentication', ['state', 'roles']),
    authenticated() {
      console.log('authenticated', { state: this.state, roles: this.roles });
      console.log('authenticated', pick(this, ['state', 'roles']));
      return this.state === 2 && (this.roles||'').includes('tester');
    }
  },
  methods: {
    ...mapMutations(['setSecondaryHeading']),
    walkUpdated(value) {
      console.log('walkUpdated', value);
      this.newWalk(value);
    },
    async newWalk(value) {
      console.log('newWalk', value);
      let { data } = await this.getWalkData(`GetWalkDetails`, value);
      this.walkId = value;
      this.setSecondaryHeading({
        main: this.dispDate(data.date),
        sub: data.area
      });
      const ints = ['viaTT', 'pickupGHS', 'bankHoliday'];
      forOwn(data, (val, key) => {
        if (includes(ints, key)) data[key] = parseInt(val);
      });
      merge(this.walkData, data);
      this.walkData.routes.splice(data.routes.length);
      console.log('newWalk', value, data);
    },
    dispDate(date) {
      if (!date) return '';
      return fmtYYMMDD(new Date(date));
    }
  },
  beforeDestroy() {
    this.setSecondaryHeading(null);
  }
};
</script>

<style lang="css" scoped>
@media print {
  .grid {
    width: 650px;


  }

}
</style>
