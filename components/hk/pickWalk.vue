<template lang="html">
  <div  class="walkPicker">
    <select v-model="currentYear"  >
      <option disabled value="">Please select a year</option>
      <option v-for="year in years" :value="year" :key="year">{{year}} </option>
    </select>
    <select v-model="currentWalk">
      <option disabled value="">Please select a walk</option>
      <option v-for="wlk in walks" :key="wlk.date" :value="wlk.date" >{{wlk.date}} {{wlk.area}}</option>
    </select>
    <input type="button" id="first" value="&lt;&lt;" :disabled="isFirstWalk" @click="incrWalkSelected(0)"/>
    <input type="button" id="prev" value="&lt;" :disabled="isFirstWalk" @click="incrWalkSelected(-1)" />
    <input type="button" id="next" value="&gt;" :disabled="isLastWalk" @click="incrWalkSelected(+1)" />
    <input type="button" id="last" value="&gt;&gt;" :disabled="isLastWalk" @click="incrWalkSelected(2)" />
    <button @click="reqAddWalk">Add Walk</button>
    <button @click="reqDelWalk">Del Walk</button>
    <button @click="reqAddYear">Add Year</button>
    <el-dialog :visible.sync="showAddYear" title="Set up next year's walk dates" class="editData" size="tiny">
        <span>Enter the first Saturday in the regular bi-weekly cycle.
        <el-date-picker v-model="addDate" type="date" placeholder="Pick a day" autofocus format="yyyy-MM-dd"/>
      </span>
           <!-- </el-date-picker> -->
            <span slot="footer" class="dialog-footer">
        <el-button @click="showAddYear = false">Cancel</el-button>
        <el-button type="primary" @click="addYear">AddYear</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="showAddWalk" title="Add a Walk Day" class="editData" size="tiny">
      <span>Enter the date requred.
        <el-date-picker v-model="addDate" type="date" placeholder="Pick a day" autofocus format="yyyy-MM-dd" />
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddWalk = false">Cancel</el-button>
        <el-button type="primary" @click="addWalk">AddWalk</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import walkMixins from '~/components/WalksMixin';
import {format, addYears, addDays, setMonth, setDate, getDay} from 'date-fns/fp';
import {remove} from 'lodash';
const fmtYYMMDD = format('yyyy-MM-dd');
export default {
  mixins: [walkMixins],
  mounted() {
    this.getYears();
  },
  data() {
    return {
      years: [],
      walks: [],
      currentYear: null,
      currentWalk: null,
      showAddYear: false,
      showAddWalk: false,
      showDelWalk: false,
      addDate: null
    };
  },
  watch: {
    async currentYear() {
      console.log('currentYear watcher', this.currentYear);
      // if (this.currentYear) this.walks = [];
      let { data } = await this.getWalkData(
        `GetYearsDataIndex`,
        this.currentYear
      );
      console.log('currentYear', data, this.today());
      let ind = data.findIndex(w => w.date > this.today());
      this.walks = data;
      this.currentWalk = ind > -1 ? this.walks[ind].date : this.lastWalk;
    },
    currentWalk() {
      if (this.currentWalk) {
        console.log('currentWalk watcher', this.currentWalk.toString());
        this.$emit('newWalkSelected', this.currentWalk);
      }
    }
  },
  computed: {
    lastWalk() {
      return (this.walks[this.walks.length - 1] || {}).date;
    },
    isFirstWalk() {
      return (this.walks[0] || {}).date === this.currentWalk;
    },
    isLastWalk() {
      return this.lastWalk === this.currentWalk;
    }
  },
  methods: {
    today() {
      return fmtYYMMDD(new Date());
    },
    reqAddYear() {
      let dat = new Date()
        dat = addYears(1, dat)
        dat = setMonth(0, dat)
        dat = setDate(1, dat);
      dat = addDays(6 - getDay(dat), dat);
      this.addDate = fmtYYMMDD( dat);
      this.showAddYear = true;
    },
    reqAddWalk() {
      this.addDate = this.currentYear + '-01-01';
      this.showAddWalk = true;
    },
    async reqDelWalk() {
      try {
        await this.$confirm(
          `This will permanently delete the walk for ${this
            .currentWalk}. Continue?`,
          'Warning',
          { type: 'warning' }
        );
        let { data } = await this.getWalkData(`DelWalkDay`, this.currentWalk);
        console.log('delWalkDay result', data);
        if (data.error) {
          return this.$notify({
            type: 'error',
            title: 'Delete Walk',
            message: data.error
          });
        }
        this.$message({ type: 'success', message: 'Delete completed' });
      } catch (e) {
        this.$message({ type: 'info', message: 'Delete canceled' });
      }
      remove(this.walks, w => w.date === this.currentWalk);
      this.currentWalk = null;
    },
    async getYears() {
      let res = await this.getWalkData(`GetYears`);
      this.years = res.data;
      this.currentYear = this.today().substr(0, 4);
    },
    async addYear() {
      let dat = fmtYYMMDD(new Date(this.addDate));
      console.log('adding records for', dat);
      this.showAddYear = false;
      await this.getWalkData(`CreateYearsWalkDays`, dat);
      const newYear = dat.substr(0, 4);
      this.years.unshift(newYear);
      this.currentYear = newYear;
    },
    async addWalk(addDate) {
      this.addDate = fmtYYMMDD(new Date(this.addDate));
      if (this.currentYear !== this.addDate.substr(0, 4)) {
        return this.$notify({
          type: 'error',
          title: 'Add Walk',
          message: `Date for new walk (${this
            .addDate}) is not in the selected year`
        });
      }
      console.log('adding record for', this.addDate);
      this.showAddWalk = false;
      let { data } = await this.getWalkData(`AddWalkDay`, this.addDate);
      console.log('addDate result', data);
      if (data.error) {
        return this.$notify({
          type: 'error',
          title: 'Add Walk',
          message: data.error
        });
      }
      this.walks.push(data);
      console.log('addwalk usorted walks', this.walks);
      this.walks = this.walks.sort((a, b) => a.date.localeCompare(b.date));
      this.currentWalk = this.addDate;
      this.$message({
        type: 'success',
        message: `${this.addDate} added successfully.`
      });
    },
    // dateChanged(xx) {
    //   console.log('dateChanged', xx);
    // },
    incrWalkSelected(i) {
      let ind;
      if (i === 2) ind = this.walks.length - 1;
      else if (i === 0) ind = 0;
      else ind = this.walks.findIndex(w => w.date === this.currentWalk) + i;
      this.currentWalk = this.walks[ind].date;
      console.log('incrWalkSelected', i, ind, this.currentWalk);
    }
  }
};
</script>

<style scoped>
.walkPicker {
  padding-top: 0.5em
}
</style>
