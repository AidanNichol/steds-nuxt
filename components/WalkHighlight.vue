<template>
  <div id="walkDetail" v-if="walk && walk.date">
    <p class="date">{{dispDate(walk.date)}}
      <span class="bhwe" v-if="walk.bankHoliday==='1'">(Bank Hol. weekend)</span>
    </p>
    <p class="area">{{walk.area}}
      <span class="byline" v-if="walk.byLine">({{walk.byLine}})</span>
    </p>
    <p class="region">{{walk.regname}}</p>
    <p><span>Bus Departure: </span>{{walk.time}} a.m.</p>
    <p><span>Organizer: </span>{{walk.organizer}}</p>
    <p><span>Maps: </span>{{walk.map}}</p>
    <p v-show="walk.details==='Y'">See <nuxt-link :to="details(walk)">Route Details</nuxt-link> for this walk.</p>
  </div>
</template>

<script>
import XDate from 'xdate';
export default {
  props: ['walk'],
  methods: {
    dispDate(dat) {
      return dat && new XDate(dat).toString('dddd, d MMMM yyyy ');
    },
    details(walk) {
      return `/programme/walkDetails?walkId=${walk.date}`;
    }
  }
};
</script>
<style>
#walkDetail {
  font-size: 13px;
  margin: 0; padding: 0;
  border: 0;
  width: 100%;
  text-align: left;
}


#walkDetail p.date {
  font-size: smaller;

  & .bhwe {
    font-style: italic;
  }
}
#walkDetail p.area {
  color: #663300;
  font-size: larger;

  & span.byline {
    font-size: smaller;
    font-style: italic;
  }
}

#walkDetail p {
  padding:0;
  margin: 0;
  font-weight: bold
}
#walkDetail p span {
  display: inline;
  color: #999999;
}



</style>
