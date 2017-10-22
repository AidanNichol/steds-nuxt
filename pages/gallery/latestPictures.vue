<template>
  <Lightbox :imgs="pictures" :modalclose="modalclose" :keyinput="keyinput"
            :mousescroll="mousescroll" :showclosebutton="showclosebutton"
            :showcaption="showcaption" :imagecountseparator="imagecountseparator"
            :showimagecount="showimagecount" :showthumbnails="showthumbnails"
            v-if="pictures.length"/>

</template>
<script>
import { mapState } from 'vuex';
import Lightbox from '~/components/vue-images/lightbox';
export default {
  components: { Lightbox },
  // layout: 'full',
  data() {
    return {
      modalclose: true,
      keyinput: true,
      mousescroll: true,
      showclosebutton: true,
      showcaption: true,
      imagecountseparator: 'of',
      showimagecount: true,
      showthumbnails: true
    };
  },
  computed: {
    ...mapState(['pictures', 'curPic'])
  }
};
</script>
