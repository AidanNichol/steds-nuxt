<template>
  <div id="programme" v-if="walksDetails.length > 0">
    <div class="yearprog">
      <div v-for="walk in walksDetails" :key="walk.date" :class="{detailN: walk.details!=='Y'}">
        <span>{{dispDat(walk.date)}}</span>
        <a @click="setHiWalk(walk)" :title="toolTip(walk)">{{walk.area}}</a>
      </div>
    </div>
    <div id="hiWalk" class="programme">
      <WalkHighlight :walk="hiWalk"/>
    </div>

    <div v-show="progPDF" class="screenonly progPDF">
      <a :href="progPDF">Download this programme as a PDF document</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import XDate from 'xdate';
import { stedsServer } from '~/assets/js/config';
import WalkHighlight from '~/components/WalkHighlight';

export default {
  // d
  components: { WalkHighlight },
  data() {
    return { year: '', walksDetails: [], hiWalk: {} };
  },
  async beforeMount() {
    let { query } = this.$route;
    console.log(query);
    this.yearsWalks(query.year);
  },
  async beforeUpdateX() {
    let { query } = this.$route;
    console.log(query);
    this.yearsWalks(query.year);
  },
  computed: {
    progPDF() {
      return (
        this.docname && `http://stedwardsfellwalkers.co.uk/${this.docname}`
      );
    },
  },
  methods: {
    async yearsWalks(year) {
      let { data } = await axios.get(
        `${stedsServer}/walks/getYearsData/${year}`
      );
      console.log(data);
      let dat = new XDate().toString('yyyy-MM-dd');
      console.log({ dat });

      this.walksDetails = data.walksDetails;
      this.hiWalk = data.hiDate;
      this.docname = data.docname;
    },
    dispDat(dat) {
      return new XDate(dat).toString('MMM d');
    },
    toolTip(walk) {
      return `${walk.regname}, bus: ${walk.time}, org: ${
        walk.organizer
      }, maps: ${walk.map}`;
    },
    setHiWalk(walk) {
      this.hiWalk = walk;
    },
  },
  watch: {
    '$route.query.year': function(year, oldyear) {
      console.log(`year changed from ${oldyear} to ${year}`);
      this.year = year;
      this.yearsWalks(year);
    },
  },
};
</script>
<style scoped>
#programme {
  margin: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.yearprog {
  border: 3px solid #cc9999;
  padding: 6px;
  width: 400px;
  columns: 180px 2;
  column-rule: 3px solid #cc9999;
  font-size: x-small;
}
.progPDF {
  align-self: flex-start;
  padding-top: 0.5em;
}
.yearprog span {
  display: inline-block;
  width: 46px;
  padding-left: 3px;
}
.detailN a {
  color: tan;
}
#hiWalk.nextwalk {
  float: right;
}
#hiWalk {
  padding: 6px;
  border: 3px solid #cc9999;
  border-top-width: 0;
  width: 320px;
}
#hiWalk h3 {
  padding: 0;
}
@media only screen and (max-width: 338px) {
  .yearprog {
    width: auto;
  }
  #hiWalk {
    width: auto;
  }
}
</style>
