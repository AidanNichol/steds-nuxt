<template>
  <div>
    <p>If you are interested in join us then a take a look at the following items</p>
    <ul>
      <li><nuxt-link to="/downloads/StEdsNewMemberInfo.pdf">Information for New Member and Guests</nuxt-link> to get answers to your questions</li>
      <li><nuxt-link to="/downloads/StEdsBusRoute.pdf">Bus Route</nuxt-link> shows the options for joining the bus on a walk day</li>
      <li><nuxt-link :to="curProg">Walks {{year}}</nuxt-link> is the current walks programme</li>
      <li><nuxt-link to="/About_the_Club/membership">Membership</nuxt-link> shows the current fees.</li>
    </ul>
    <p>If there is something you still want to ask then just contact our membership secretary whose details
      are in the information leaflet and on the <nuxt-link to="/banner/contact_us">contacts page</nuxt-link>. </p>
      <p>If you are not sure then why not come out as a guest before committing to become a member.</p>
      <p>To join the club you'll need to fill in an <nuxt-link to="/downloads/StEdsNewMemberForm.pdf">application form</nuxt-link> and sent it to our membership secretary</p>

  </div>
</template>
<script>
export default {
  data: () => ({
    year: new Date().getFullYear(),
    curProg: `/programme/walks/${this.year}`
  })
};
</script>
