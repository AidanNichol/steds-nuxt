
<template lang="html">
  <div id="yearNav">
    <div v-for="year in years" :key="year" class="year"  :class="{current: curYear===year}">
      <div @click="selectYear(year)" class="title">{{year}}</div>
      <div @click="selectWalk(walk.date, walks[year], i)" v-show="curYear === year" v-for="(walk, i) in walks[year]" class="walk" :class="{current: curWalk===walk.date}">
        {{walk.date}} {{walk.area}}
      </div>
    </div>

  </div>

</template>

<script>
export default {
  props: ['walks', 'walkId'],
  data() {
    return { curYear: null, curWalk: null, curIndex: null };
  },
  computed: {
    years() {
      return Object.keys(this.walks).sort((a, b) => b.localeCompare(a));
    }
  },
  methods: {
    sortedWalks(walks) {
      return walks.sort((a, b) => a.date.localeCompare(b.date));
    },
    selectYear(year) {
      this.curYear = year;
      this.curWalk = null;
      console.log('selectYear', year);
    },
    selectWalk(walkId, walks, i) {
      this.curWalk = walkId;
      console.log('selectWalk', { walkId, walks, i });
    }
  },
  watch: {
    curWalk() {
      console.log('watch CurWalk', this.curWalk);
      this.$emit('walkSelected', this.curWalk);
    }
  }
};
</script>

<style scoped>
/*#yearNav {*/
  .year {
    font-size: .8rem;
    color: rgb(73, 49, 29);
    cursor: pointer;
    & > div {
    }
    &.current {
      border-left: thin solid #888;
      & > div.title {
        font-weight: bold;
        font-size: 1rem;
        background-color: rgb(73, 49, 29);
        color: white;
      }
    }

    & .walk {
      margin-left: 1rem;
      font-size: .8rem;
      color: red;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;

      &.current {
        font-weight: bold;
        font-size: 1rem;
      }
    }
  }
/*}*/
</style>
