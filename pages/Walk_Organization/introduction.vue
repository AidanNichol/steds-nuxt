<template>
  <div>
    <p>
      Given that walking is what we are about, this section tells
      you what you'll want to know about how the club is run, starting with how the
      <nuxt-link to="/Walk_Organization/planning">walk programme is created</nuxt-link>, through
      <nuxt-link to="/Walk_Organization/bus_logistics">what happens on the day of a walk</nuxt-link>, and
      <nuxt-link to="/Walk_Organization/bookings">how to book a place on a walk</nuxt-link>.
    </p>
    <hr>
    <p>The walk programme is available
      <nuxt-link :to="curProg">here</nuxt-link>.
    </p>
    <hr>
    <p>
      When on a walk, accidents can sometimes happen and the
      weather can change for the worse unexpectedly. The club has spent a lot of
      effort planning for how we deal with these issues. Safety guidelines and
      procedures for handling unplanned events can be found under
      <b>Guidelines</b>
    </p>
  </div>
</template>
<script>
export default {
  data: () => ({
    year: new Date().getFullYear(),
  }),
  computed: {
    curProg() {
      return `/programme/year?year=${this.year}`;
    },
  },
};
</script>
