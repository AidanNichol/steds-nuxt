<template lang="html">
  <div id="libnav"  class="screenonly">
      <div id="NVprev" class="col width-1of4 txtC">
          <a class="ByDate" style="margin-top:-17px; margin-left:-40px;"
              href="/library/prevWalk/<?=$this->curWalk?>/ByDate"
              title="Previous Walk">
              <img src="~/assets/image/PrevFingerpost.jpg" /></a>
          <a class="ByRegion" style="margin-top:-17px; margin-left:-40px;"
              href="/library/prevWalk/<?=$this->curWalk?>/ByRegion"
              title="Previous Walk">
              <img src="~/assets/image/PrevFingerpost.jpg" /></a>
      </div>
      <div id="NVmode" class="col width-1of4 txtC">
          <a class="Map" style="margin-top:-16px; margin-left:-50px;"
              href="/library/showProfiles/<?=$this->curWalk?>"
              title="Switch Display"><img src="~/assets/image/viewProfiles.jpg" /></a>
          <a class="Profiles" style="margin-top:-22px; margin-left:-40px;"
              href="/library/showMap/<?=$this->curWalk?>"
              title="Switch Display"><img src="~/assets/image/viewMap.jpg" /></a></div>
      <div id="NVshowbY" class="col width-1of4 txtC">
          <a class="ByDate" style="margin-top:-31px; margin-left:-50px;"
              href="/library/showByRegion/" title="Switch Search">
              <img src="~/assets/image/SearchByRegion.jpg" /> </a>
          <a class="ByRegion" style="margin-top:-26px; margin-left:-40px;"
              href="/library/showByDate/" title="Switch Search">
              <img src="~/assets/image/SearchByDate.jpg" /> </a></div>
      <div id="NVnext" class="col width-1of4 last">
          <a class="ByDate" style="margin-top:-17px; margin-left:-40px;"
              href="/library/nextWalk/<?=$this->curWalk?>/ByDate" title="Next Walk">
              <img src="~/assets/image/NextFingerpost.jpg" /></a>
          <a class="ByRegion" style="margin-top:-17px; margin-left:-40px;"
              href="/library/nextWalk/<?=$this->curWalk?>/ByRegion" title="Next Walk">
              <img src="~/assets/image/NextFingerpost.jpg" /></a></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css">
</style>
