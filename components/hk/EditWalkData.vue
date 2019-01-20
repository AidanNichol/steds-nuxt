<template lang="html">
  <div class="walkdata">
    <div id="details" class="layout-percent">
      <form class="formbox" >
        <ul class="column">
          <li><span>date</span><input v-model="walk.date"/></li>
          <li><span>B/H w/e</span><input v-model="walk.bankHoliday" type="checkbox"/></li>
          <li><span>time</span><input v-model="walk.time"/></li>
          <li><span>area</span><input v-model="walk.area"/></li>
          <li><span>by line</span><input v-model="walk.byLine"/></li>
          <li><span>region</span>
            <select v-model="walk.region">
              <option disabled value="">Please select a region</option>
              <option v-for="reg in regions" :key="reg.no" :value="reg.no" >{{reg.name}}</option>
            </select>
            <!-- <el-select v-model="walk.region" placeholder="select a region">
              <el-option
                v-for="reg in regions"
                :key="reg.no"
                :label="reg.name"
                :value="reg.no">
              </el-option>
            </el-select> -->
          </li>
          <li><span>map</span><input v-model="walk.map"  /></li>
          <li><span>organizer</span><input v-model="walk.organizer"  /></li>
          <li><span>finish</span><input v-model="walk.finish" @dblclick="walk.finish = walk.area" /></li>
          <li><span>maps due</span><input v-model="walk.mapsDue" @dblclick="defaultMapsDue"  /></li>

        </ul>
        <ul class="column">
          <!-- <li><span>library</span><input v-model="walk.library"/></li> -->
          <li><span>coffee</span><input v-model="walk.coffee"/></li>
          <li><span>evening</span><input v-model="walk.evening"/></li>
          <li><span>leaving</span><input v-model="walk.leaving"/></li>
          <li><span>viaTT</span><input v-model="walk.viaTT" type="checkbox"/></li>
          <li class="pickup"><span>last pickup</span>
            <!-- <span> -->
              <label for="one">HM</label>
              <input type="radio" id="one" value="0" v-model="walk.pickupGHS">
              <label for="two">GHS</label>
              <input type="radio" id="two" value="1" v-model="walk.pickupGHS">

            <!-- </span> -->
          </li>
          <li><span>bus loc.</span><input v-model="walk.busLocation" @change="changed"/></li>
          <li><span>bus route</span><textarea v-model="walk.busRoute" :rows="rows.busRoute" name="busRoute" @keyup="autosize" ref="busRoute"/></li>
          <li><span>special</span><textarea v-model="walk.special" :rows="rows.special" name="special" @keyup="autosize" ref="special"/></li>
        </ul>
        <ul id="control" class="columnN">
          <li><span>top</span><input v-model="walk.top"/></li>
          <li><span>bottom</span><input v-model="walk.bottom" /></li>
          <li><span>left</span><input v-model="walk.left" /></li>
          <li><span>right</span><input v-model="walk.right" /></li>
          <li><span>legendTop</span><input v-model="walk.legendTop" /></li>
          <li><span>legendLeft</span><input v-model="walk.legendLeft" /></li>
          <li><span>orientation</span><input v-model="walk.orientation" /></li>
          <li><span>details</span><input v-model="walk.details" /></li>
        </ul>
      </form>
    </div>
  <section id="B4" class="">
    <h3>Walks</h3>
    <table>
      <thead>
        <tr ><th>no</th><th>drop off</th><th>leader</th><th>distance</th><th>ascent</th><th>descent</th></tr>
      </thead>
      <tbody id="tbody">
        <tr v-for="rt in walk.routes" :key="walk.date+rt.no" class="route">
            <!-- <td><span class="no" >{{rt.no}}</span></td> -->
            <td class="no" >{{rt.no}}</td>
            <td><input class="dropOff" v-model="rt.dropOff" pattern="^\d$" size="1" /></td>
            <td><input class="leader" v-model="rt.leader" type="text" size="20" /></td>
            <td class="distance"><span>{{dTo1(rt.distance)}} mi</span> (<span>{{dTo1(rt.mmdistance)}} Km</span>)</td>
            <!-- <td class="labeled"><span>{{dTo1(rt.distance)}}</span><span>&nbsp;mi</span></td>
            <td class="labeled"><span>{{dTo1(rt.mmdistance)}}</span><span>&nbsp;Km</span></td> -->
            <td class="distance">{{mToFt(rt.ascent)}} ft</td>
            <td class="distance">{{mToFt(rt.descent)}} ft</td>
        </tr>
      </tbody>
    </table>
  </section>
  <button @click="saveData">Save</button>
</div>

</template>

<script>
import WalksMixin from '~/components/WalksMixin';
import { mapState } from 'vuex';
import {format, addWeeks, addDays} from 'date-fns/fp';
import {cloneDeep, pickBy, keys} from 'lodash';
const fmtYYMMDD = format('yyyy-MM-dd');

export default {
  data() {
    return {
      walk: cloneDeep(this.walkData),
      rows: {
        special: 2,
        busRoute: 2
      },
      pixelsPerRow: 15,
      specialHt: 30,
      busRouteHt: 30
    };
  },
  props: ['walkData', 'regions'],
  mixins: [WalksMixin],
  mounted() {
    console.log('EditWalkData mounted', this.$refs, this);
    Object.values(this.$refs).forEach(el => this.autosize({ target: el }));
  },
  computed: {
    ...mapState('authentication', ['state'])
  },
  methods: {
    changed(ev) {
      const t = ev.target;
      console.log('changed', t.name, t.value);
    },
    defaultMapsDue() {
      let dat = addDays(-3, addWeeks(-6, new Date(this.walk.date)));
      this.walk.mapsDue = fmtYYMMDD(dat);
    },
    // mToFt(m) {
    //   return Math.round(Math.round(m * 3.28084) / 50) * 50;
    // },
    // dTo1(d) {
    //   return Number.parseInt(d).toFixed(1);
    // },
    autosize(ev) {
      // if (!this.pixelsPerRow) this.pixelsPerRow = ev.target.scrollHeight / 2;
      let name = ev.target.name;
      if (!this.rows[name]) return;
      let rows = Math.ceil(ev.target.scrollHeight / this.pixelsPerRow);
      this.rows[name] = Math.max(rows, 2);
      // console.log( 'autosize', name, this.rows[name], ev.target.scrollHeight, this.pixelsPerRow, ev );
    },
    async saveData() {
      let changes = pickBy(
        this.walk,
        (value, key) => key !== 'routes' && value !== this.walkData[key]
      );
      console.log('walk changes', changes);
      if (keys(changes).length > 0) {
        await this.postWalkData(changes, 'UpdateWalkDetails', this.walk.date);
      }
      this.walk.routes.forEach(async (route, i) => {
        console.log('route change check', route, i, this.walkData.routes[i]);
        let rtChanges = pickBy(route, (value, key) => {
          console.log(
            'route change check',
            key,
            value,
            this.walkData.routes[i][key]
          );
          return value !== this.walkData.routes[i][key];
        });
        console.log('~Route Changes', route.no, rtChanges);
        if (keys(rtChanges).length > 0) {
          await this.postWalkData(
            rtChanges,
            'UpdateRouteArray',
            this.walk.date,
            route.no
          );
        }
      });
      this.$emit('walkUpdated', this.walk.date);
    }
  }
};
</script>

<style lang="css" scoped>
.walkdata{;
  font-size: small;
  margin-top:10px;
  & .formbox {
    display: flex;
    flex-direction: row;
    width:100%;
  }
  & .columnN {
    padding-right: 0.5em;
    & input{
      flex: 0 0 1em;
    }
  }
  & ul {
    list-style: none;
    padding-left: 1em;
    flex: 1 1 auto;
    &:first-child {
      flex: 0 0 190px;
      padding-left: 0;
      & span {
        width: 55px;
      }
    }
    &:last-child {
      flex: 0 0 130px;
    }

    & li {
      display: flex;
      flex-direction: row;
      align-items: center;
      & textarea {
        box-sizing: content-box;
        /*line-height: 15px;*/
        /*overflow:hidden;*/
        flex: 1 1 auto;
      }
      & input {
        flex: 1 1 auto;
      }
      &.pickup {
        & input {
          flex: 0 0 15px;
        }

      }

      & span {
        display:block;
        flex: 0 0 70px;
        text-align: right;
        padding-right: 0.5em;
      }
      & input {
        width: 100%;
        box-sizing: border-box;
        display: block;

      }
    }

  }
}
.walkdata input{
  flex: 1 1 auto;

  font-size: small;
}
table {
  border-collapse: collapse;
}
th, td {
  border: thin solid #888;
  text-align: center;
  padding: 0 0.5em;
}
td {
  box-sizing: border-box;
  &.leader {
    width: 10em;
  }
  &.distance {
    text-align: right;
    & span {
      display: inline-block;
      width: 4em;
    }
  }
}
@media print {
  #control {
    display: none;
  }
}
</style>
