<template lang="html">
  <div class="showMap">
    <div v-if="mapIsPdf(walk.mapimg)">
      <iframe :src="imgFile(walk.mapimg)" height="1000" :class="orientation" />

    </div>
    <div v-else>
      <!-- <h1>Map is {{walk.mapimg}}</h1> -->
      <!-- if (substr($walk['mapimg'], -3) == 'pdf')
      else return new View('programme/showMap', $walk);
      <div id="blankpage" class="<?=$orientation?>">
      <img class="Top<?=$headPos?>" alt="" src="<?=$heading?>" />
      <img v-if="$headingR" class="printonly head<?=$headPos?>" alt="<?="$area $date"?>" src="<?=$headingR?>" />



      <div id="mapspace">
      <img class="mapRot<?=$mapRot?> mapHead<?=$headPos?>" alt="" src="<?="$mapimg"?>" USEMAP="#overlay" />
      <?=($overlay? $overlay:'')?>
    </div>
    <? if ($overlay):?>
      <div id="wpinstructions" class="screenonly">
        Click on any change of direction on a route to see a 1:50K OS
        map of that part of the route.
        The location of the waypoint will be shown by a red arrow
      </div>
    <? endif; ?>
    <? if ($mapimgR):?>
    <img class="printonly mapHead<?=$headPos?>" alt="" src="{MAPIMGR}" />
    <? endif;?> -->

    <!-- </div> -->
  </div>

</div>

</template>

<script>
import WalksMixin from '~/components/WalksMixin';

export default {
  props: ['walkId'],
  mixins: [WalksMixin],
  data() {
    return { walk: {} };
  },
  computed: {
    orientation() {
      return this.walk.orientation === 'L' ? 'landscape' : 'portrait';
    },
  },
  methods: {
    mapIsPdf(map) {
      return map && map.substr(-4) === '.pdf';
    },
    imgFile(img) {
      return `http://stedwardsfellwalkers.co.uk/${img}`;
    },
  },
  async beforeMount() {
    console.log('ShowMap beforeMount', this.walkId);
    let res = await this.getWalkData('GetMapData', this.walkId);
    let walk = res.data;
    // walk.dispDate = new XDate(walk.date).toString('dddd, d MMMM yyyy ');
    console.log('ShowMap', { walk });
    this.walk = walk;
  },
};
</script>

<style lang="css" scoped>
iframe {
  &.portrait {
    width: 778px;
    height: 1160px;
  }
  &.landscape {
    width: 1100px;
    height: 840px;
  }
}
</style>
