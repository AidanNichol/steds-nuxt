<template>
  <div class="vertMenu">
    <p>Home</p>
    <NavLink to="/">Home</NavLink>

    <p>About the Club</p>
    <NavLink to="/About_the_Club/introduction">Introduction</NavLink>
    <NavLink to="/About_the_Club/history">History</NavLink>
    <NavLink to="/About_the_Club/membership">Membership</NavLink>
    <NavLink to="/About_the_Club/new_members_and_guests">New Members & Guests</NavLink>

    <p>Walk Organization</p>
    <NavLink to="/Walk_Organization/introduction">Introduction</NavLink>
    <NavLink to="/Walk_Organization/planning">Planning</NavLink>
    <NavLink to="/Walk_Organization/choice_of_walk">Choice of Walk</NavLink>
    <NavLink to="/Walk_Organization/bus_logistics">Bus Logistics</NavLink>
    <NavLink to="/Walk_Organization/bookings">Bookings</NavLink>
    <NavLink to="/Walk_Organization/organizer_s_guidelines">Organizer's Guidelines</NavLink>

    <p>Programme</p>
    <!-- <NavLink v-for="year in linkYears" :to="'/programme/year?year='+year" :key="year">{{year}} Walks</NavLink> -->
    <NavLink to="/programme/year?year=2019">2019 Walks</NavLink>
    <NavLink to="/programme/year?year=2018">2018 Walks</NavLink>
    <NavLink to="/programme/library">Walks Library</NavLink>
    <NavLink to="/programme/otherEvents">Other Events</NavLink>

    <p>Guidelines</p>
    <NavLink to="/guidelines/introduction">Introduction</NavLink>
    <NavLink to="/guidelines/personal_equipment">Personal Equipment</NavLink>
    <NavLink to="/guidelines/member_s_role">Member's Role</NavLink>
    <NavLink to="/guidelines/leader_s_role">Leader's Role</NavLink>
    <NavLink to="/guidelines/emergency-planning">Emergency Planning</NavLink>
    <NavLink to="/guidelines/emergency-procedures">Emergency Procedures</NavLink>

    <p>Other</p>
    <NavLink to="/other/contact_us">Contact Us</NavLink>
    <NavLink to="/other/links">Links</NavLink>
    <NavLink to="/gallery/albums">Gallery</NavLink>
    <NavLink to="/other/downloads">Downloads</NavLink>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import NavLink from '~/components/NavLink';
import WalksMixin from '~/components/WalksMixin';
export default {
  components: { NavLink },
  mixins: [WalksMixin],
  computed: {
    // ...mapState(['years']),
    // linkYears() {
    //   return this.years.slice(0, 2);
    // },
  },
  // async beforeMount() {
  //   if (this.years.length > 0) return;
  //   let { data } = await this.getWalkData('GetYears');
  //   this.$store.commit('setYears', data);
  // },
};
</script>
<style >
.vertMenu {
  width: 145px;
  font-stretch: condensed;
  border-left: thin solid #cc3300;
  padding-left: 4px;
  margin-left: 2px;

  & p {
    font-size: small;
    color: rgb(88, 76, 77);
    margin-bottom: 0;
    margin-top: 0.5em;
    width: 100%;
    border: 1px solid rgb(88, 76, 77);
    background-color: rgb(235, 206, 208);
    &:first-child {
      margin-top: 0;
    }
  }

  & a {
    line-height: 1.5em;
    font-size: 10px;
    /*font-weight: bold;*/
    /*transform:scale(.9,1);*/
    color: #cc3300;
    padding: 0 0 2px 0;
    text-decoration: none;
    &:hover {
      color: white;
    }
    &.active {
      font-weight: 900;
      font-size: 11px;
      &::before {
        content: '▶︎';
      }
    }
    &::before {
      content: url(~assets/image/listmark.gif);
      padding-right: 1em;
    }
  }
}
</style>
