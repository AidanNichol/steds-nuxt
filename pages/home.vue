<template>
  <div class="page">
    <div class="section blocks">
      <div class=" nextwalk">
        <h3>Next Walk</h3>
        <WalkHighlight :walk="hiWalk" />
      </div>
      <ShowSlides class=" slides" />
      <!-- <ShowSlidesAgile class=" slides" /> -->
      <!-- <?=$eventDetails?> -->

    </div>

    <div class="section content">
      <p>
        Welcome to the web site of St. Edward's ABC Fellwalkers.</p>
        <p>
          We are an all-weather, all-year round walking club based on
          northeast Tyneside.&nbsp; Walks take
          place every other Saturday in areas such as Northumberland,
          Durham, Cumbria, Scotland, and both the Yorkshire Dales and
          Moors.
        </p>
        <p>
          There is usually a choice of four walks, which vary in
          distance and height to cater for the individual walkers
          requirements.
        </p>
        <hr />
        <p>
          All you need is a strong pair of boots, waterproofs and a
          rucksack.&nbsp; Sorry we can't guarantee the weather but
          we can guarantee a warm welcome as St. Edward's is a friendly
          club with a lively social life for those who are interested,
          which includes Barbeques, Discos, Bowling etc.
        </p>
        <hr />
        <p>
          Follow the links on the right hand side to find out more about the club
          and our activities
        </p>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { getWalkData } from '~/components/WalksMixin';

import XDate from 'xdate';
// import axios from 'axios';
import WalkHighlight from '~/components/WalkHighlight';
import ShowSlides from '~/components/ShowSlides';
export default {
  layout: 'default',
  components: {
    WalkHighlight,
    ShowSlides
  },
  data() {
    return {
      hiWalk: null
    };
  },

  computed: {
    ...mapState(['pictures', 'curPic'])
  },

  async beforeMount() {
    let dat = new XDate().toString('yyyy-MM-dd');
    let { data } = await getWalkData(`GetNextWalkData`, dat);
    this.hiWalk = data;
  }
};
</script>
<style lang="scss" scoped>
.nextwalk {
  border: 3px solid #cc9999;
  margin: 0 1px;
  padding: 0 0 2px 2px;
}
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  // flex-wrap: wrap;
}

.section {
  width: 100%;
  // height: 300px;
  // display: flex;
  // flex-direction: column;
  justify-content: center;
  align-items: center;
  &.blocks{
     width: 100%;
     max-width: 340px;
     overflow-x: hidden;
  }
}
.content {
  height: auto;
}


/* Mobile Styles */
@media only screen and (max-width: 400px) {
  body {
    background-color: #F09A9D; /* Red */
  }
}

/* Tablet Styles */
// @media only screen and (min-width: 401px) and (max-width: 800px) {
//   body {
//     background-color: #F5CF8E; /* Yellow */
//     .blocks {
//        width: 340px;
//        max-width: 340px;
//  }
//   }
// }

/* Desktop Styles */
@media only screen and (min-width: 650px) {
  .page {
    display: block;

    .blocks {
      float: right;
      margin: 2px;
      max-width: 340px;
      /*border: 1px solid red;*/
      position: relative;
    }
  }
}
</style>
