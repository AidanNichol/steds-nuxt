<template>
  <div class="pure-container" data-effect="pure-effect-push">
      <input type="checkbox" id="pure-toggle-right" class="pure-toggle" data-toggle="right"/>
      <label class="pure-toggle-label" for="pure-toggle-right" data-toggle-label="right"><span class="pure-toggle-icon"></span></label>

      <nav class="pure-drawer" data-position="right">
          <p style="padding: 100px 20px; margin: 0;"><navBar/></p>
      </nav>

      <div class="pure-pusher-container">
          <div class="pure-pusher">
              <p style="width: 300px; height: 1800px; margin: 100px auto;">Insert your main content here</p>
          </div>
      </div>

      <label class="pure-overlay" for="pure-toggle-right" data-overlay="right"></label>
  </div>
</template>
<script>
import navBar from '~/components/navBarStEds';
export default {
  components: { navBar }
};
</script>
<style lang="scss">
@import "~/assets/css/pure-drawer.css"
</style>
