<template lang="html">
  <section >
    <br/>
    <h3>Walks for {{dispDate(walk.date)}} – {{walk.time}} o’clock start </h3>
    <table>

      <tbody id="tbody">
        <tr>
          <td colspan="2">Area - {{walk.area}}</td><td>Ascent</td><td>Leader</td><td>Organizer: {{walk.organizer}}</td>
        </tr>
        <tr v-for="(rt, i) in walk.routes" :key="walk.date+rt.no" class="route">
            <td class="no" >{{rt.no}}</td>
            <!-- <td><input class="dropOff" v-model="rt.dropOff" pattern="^\d$" size="1" /></td> -->
            <td class="leader">{{rt.leader}}</td>
            <td class="distance">{{dTo1(rt.distance)}} miles</td>
            <td class="ascent">{{mToFt(rt.ascent)}} ft</td>
            <td rowspan="2" v-if="i===0">Coffee: {{walk.coffee}}</td>
            <td rowspan="3" v-if="i===2">Evening: {{walk.evening}}<br/>Leaving at {{walk.return || 'TBC'}}</td>
            <!-- <td class="distance">{{mToFt(rt.descent)}} ft</td> -->
        </tr>
        <tr>
          <td colspan="2">Maps: {{walk.map}}</td>
          <td colspan="3">Bus will be parked {{walk.busLocation}}</td>
        </tr>
        <tr>
          <!-- <td colspan="2" v-html="lastPickup"</td> -->
          <td colspan="2">Last pickup: <span>{{lastPickup}}</span></td>
          <td colspan="3" v-html="dropOff"/>
        </tr>
      </tbody>
    </table>
  </section>

</template>

<script>
import WalksMixin from '~/components/WalksMixin';
import {format, addWeeks, addDays} from 'date-fns/fp';
const fmtYYMMDD = format('yyyy-MM-dd');

export default {
  props: ['walk'],
  mixins: [WalksMixin],
  mounted() {
    console.log('Minutes', this.walk);
  },
  computed: {
    lastPickup() {
      let ghs = this.walk.pickupGHS && this.walk.pickupGHS === '1';
      return ghs ? 'Gosforth High Street' : 'Haddricks Mill';
    },
    dropOff() {
      const viaTT = this.walk.viaTT && this.walk.viaTT === '1';
      console.log('dropOff', viaTT);
      return viaTT
        ? 'Via Tyne Tunnel: <wbr>first drop off in Tynemouth'
        : '&nbsp;';
    }
  },
  methods: {
    dispDate(date) {
      if (!date) return '';
      console.log('dispDate in ', date);
      const ret = fmtYYMMDD( new Date(date));
      console.log('dispDate out', ret);
      return ret;
    }
  }
};
</script>

<style lang="css" scoped >
table, td{
  border: thin solid #888;
  border-collapse: collapse;
  padding: 0 0.5em;
}
td{
  box-sizing: border-box;
  border: thin solid #888;
  border-collapse: collapse;
  padding: 0 0.5em;
  &.distance {
    width: 91px;
    text-align: right;
  }
  &.ascent {
    width: 71px;
    text-align: right;
  }
  &.no {
    width: 32px;
    text-align:center;
  }
  &.leader {
    min-width: 180px;
  }
  & span {
    white-space: nowrap;
  }
}
</style>
