<template>
  <!-- <div class="proramme"> -->
    <div id=programme v-if="walksDetails.length > 0">
      <div class="yearprog">
        <div v-for="walk in walksDetails" :class="{detailN: walk.details!=='Y'}">
          <span>{{dispDat(walk.date)}}</span>
          <a @click="setHiWalk(walk)" :title="toolTip(walk)">{{walk.area}}</a>
        </div>
      </div>
    <!-- </div> -->
    <div id="hiWalk" class="programme">
      <WalkHighlight :walk="hiWalk" />
    </div>

    <div v-show="progPDF" class="screenonly progPDF"><a :href="progPDF">
      Download this programme as a PDF document</a></div>


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
    return { walksDetails: [], hiWalk: {} };
  },
  async beforeMount() {
    let { query } = this.$route;
    console.log(query);
    let { data } = await axios.get(
      `${stedsServer}/walks/getYearsData/${query.year}`
    );
    console.log(data);
    let dat = new XDate().toString('yyyy-MM-dd');
    console.log({ dat });

    this.walksDetails = data.walksDetails;
    this.hiWalk = data.hiDate;
    this.docname = data.docname;
  },
  computed: {
    progPDF() {
      return (
        this.docname && `http://stedwardsfellwalkers.co.uk/${this.docname}`
      );
    }
  },
  methods: {
    dispDat(dat) {
      return new XDate(dat).toString('MMM d');
    },
    toolTip(walk) {
      return `${walk.regname}, bus: ${walk.time}, org: ${walk.organizer}, maps: ${walk.map}`;
    },
    setHiWalk(walk) {
      this.hiWalk = walk;
    }
  }
};
</script>
<style scoped>
#programme{
  margin:5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
/*#programme .inner{
  border:thin solid black;
}
#programme .last .inner{
  border-left:0;
    font-size:small;
}
#programme .inner div {
    line-height:1.7em;
    font-size:x-small;
}
#programme .inner div span{
    font-size:x-small;
    display:inline-block;
    width:43px;
    padding-left:3px;
}
#programme .inner div.detailsN a{
    color:tan;
}
#programme .inner div a{
    font-weight:normal;
}*/
.yearprog {
  /*display: flex;
  flex-flow: column wrap;*/
  border: 3px solid #CC9999;
  /*margin-left: 2em;
  margin-right: 2em;*/
  padding: 6px;
  width: 400px;
  columns: 180px 2;
  column-rule: 3px solid #CC9999;
  font-size: x-small;
}
.progPDF {
  align-self: flex-start;
  padding-top: 0.5em;
}
.yearprog span {
  display:inline-block;
  width: 46px;
  padding-left: 3px;
}
.detailN a{
  color: tan;
}
#hiWalk.nextwalk {
    float: right;
}
#hiWalk {
  /*margin:2px auto;*/
  padding: 6px;
  border: 3px solid #CC9999;
  border-top-width: 0;
  width: 320px;
}
#hiWalk h3{
  padding:0;
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
