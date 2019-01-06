<template>
  <div id="walkData">
    <div id="walkDetail">
      <p class="area">{{walk.area}}</p>
      <p class="region">{{walk.regname}}</p>
      <!-- <p class="date">{{walk.dispDate}}</p> -->
      <p>
        <span>Bus Departure:</span>
        {{walk.time}} a.m.
      </p>
      <p>
        <span>Organizer:</span>
        {{walk.organizer}}
      </p>
      <p>
        <span>Maps:</span>
        {{walk.map}}
      </p>
      <p v-if="walk.coffee">
        <span>Morning Coffee:</span>
        {{walk.coffee}}
      </p>
      <p v-if="walk.evening">
        <span>Evening Meal:</span>
        {{walk.evening}}
      </p>
      <p class="screenonly" v-if="walk.details === 'Y'">
        See
        <a :href="getWalkdataURL(walk.img)" target="_blank">Route Map</a> for these walks.
      </p>
      <div
        id="instructions"
        class="screenonly"
        v-if="walk.scaledPrf === 'Y'"
      >The profiles for these walks are all to the same scale.
        <br>The distances shown, under the profiles, are the distances remaining to the finish.
      </div>
      <div id="instructions" class="screenonly" v-else>
        The profiles for these walk are
        <b>not</b> to the same scale. (The blue vertical lines correspond with the waypoints on the route card.)
      </div>
    </div>

    <div id="walkDetails">
      <div class="walk" v-for="route in walk.routes" :key="route.no">
        <div class="routeHeading">
          <strong>Walk {{route.no}}</strong> &nbsp;&nbsp;&nbsp;&nbsp;
          <span>Leader:</span>
          {{route.leader}}
        </div>
        <div class="profile">
          <img border="0" :src="getWalkProfileURL(route.prfImg)" alt :isize="route.imgSize">
        </div>
        <div class="routeDetails">
          <span>Distance:</span>
          {{Math.round(route.distance,1)}} Mi
          <span>Ascent:</span>
          {{route.ascent}} m
          <span>Descent:</span>
          {{route.descent}} m
        </div>
        <div class="screenonly routeDetails links">
          <a
            :href="getWalkURL('getWalkRouteGpx', walk.date, route.no)"
            download
            target="_blank"
            title="Download route as gpx"
          >
            <img src="~/assets/image/gpx.png" style="height:30px">
          </a>
          <nuxt-link :to="showRoute(route.no)">
            <img src="~/assets/image/OS.png" style="height:30px" title="View route on OS map">
          </nuxt-link>
        </div>
        <!-- <div class="screenonly routeDetails">See <a :href="`/routecard/${walk.date}/${route.no}`" target="_blank">
        Route Card</a> for precise details for this walk.</div>-->
      </div>
    </div>
  </div>
</template>

<script>
import WalksMixin from '~/components/WalksMixin';
import XDate from 'xdate';
export default {
  props: ['walkId'],
  mixins: [WalksMixin],
  data() {
    return { walk: {} };
  },
  async beforeMount() {
    let { params, query } = this.$route;
    console.log('walkDetail beforeMount', this, params, query);
    let walkId = this.walkId || params.walkId || query.walkId;
    console.log('walkDetail beforeMount', this.walkId, walkId);
    let res = await this.getWalkData('GetWalkDetails', walkId);
    let walk = res.data;
    this.$store.gpxJ = walk.gpx;
    // walk.dispDate = new XDate(walk.date).toString('dddd, d MMMM yyyy ');
    console.log(walk);
    this.walk = walk;
  },
  methods: {
    dispDate(dat) {
      return new XDate(dat).toString('dddd, d MMMM yyyy ');
    },
    // imgFile(img) {
    //   return `http://stedwardsfellwalkers.co.uk/${img}`;
    // },
    showRoute(no) {
      return `/programme/OSMap?walkId=${this.walk.date}&no=${no}&noRoutes=${
        this.walk.routes.length
      }`;
      // return `/programme/showOnOSMap?walkId=${this.walk.date}&no=${no}`;
    },
  },
};
</script>
<style lang="scss" scoped>
#instructions {
  background-color: #ccffcc;
  margin: 2%;
  padding: 2%;
  color: #0000cc;
  border: thin solid #ffcc66;
}
#walkData {
  padding: 5px;
}

#walkDetail {
  text-align: left;

  p {
    padding: 0;
    margin: 0;
    font-weight: bold;

    &.area {
      color: #333333;
      font-size: xx-large;
    }
    span {
      display: inline;
      color: #999999;
    }
  }
}
.walk {
  margin: 3% 0 0 0;
  border: 2px solid #cc9999;
  overflow: visible;
  display: flex;
  flex-direction: column;
  width: 100%;

  .profile {
    padding-right: 3px;
    align-self: flex-end;
  }
  .routeDetails {
    font-size: 0.8em;
    text-align: center;
  }
  .routeHeading {
    text-align: center;
    padding-right: 0;
    border-bottom: 2px solid #cc9999;
    background: MistyRose;
  }
}
.routeDetails.links img {
  height: 30px;
  padding: 0 1em;
}
</style>
