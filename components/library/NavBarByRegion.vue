
<template lang="html">
  <div id="regNav">
    <div v-for="(finishes, reg) in walks" class="region"  :class="{current: curReg===reg}">
      <div @click="selectRegion(reg)" class="title">{{reg}}</div>
      <div v-show="curReg === reg" v-for="(walks, finish) in finishes" class="finish"  :class="{current: curFinish===finish}">
        <div @click="selectFinish(finish)"  class="title">{{finish}}</div>
        <div @click="selectWalk(walk.date, walks, i)" v-show="curFinish === finish" v-for="(walk,i) in walks" class="walk" :class="{current: curWalk===walk.date}">
          {{walk.date}} {{walk.area}}
        </div>
      </div>
    </div>

  </div>

</template>

<script>
const nullWalkX = { walk: null, walks: null, i: null };
export default {
  props: ['walks'],
  data() {
    return {
      curReg: null,
      curFinish: null,
      curWalk: null,
      curWalkX: nullWalkX,
      curIndex: null
    };
  },
  methods: {
    selectRegion(reg) {
      this.curReg = reg;
      this.curFinish = null;
      this.curWalk = null;
      this.curWalkX = nullWalkX;
      console.log('selectRegion', reg);
    },
    selectFinish(finish) {
      this.curFinish = finish;
      this.curWalk = null;
      this.curWalkX = nullWalkX;
      console.log('selectFinish', finish);
    },
    selectWalk(walkId, walks, i) {
      this.curWalk = walkId;
      this.curWalkX = { walk: walkId, walks, i };
      console.log('selectWalk', this.curWalkX);
    }
  },
  watch: {
    curWalk() {
      console.log('watch CurWalk', this.curWalk, this.curWalkX);
      this.$emit('walkSelected', this.curWalk);
    }
  }
};
</script>

<style lang="scss" scoped>
/*#regNav {*/
.region, .finish, .walk {
  cursor: pointer;
}
  .region {
    font-size: .8rem;
    color: rgb(73, 49, 29);
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
    & .finish {
      font-size: .8rem;
      margin-left: 1rem;
      color: rgb(122, 87, 58);
      &.current {
        border-left: thin solid #888;
        & > div.title {
          font-weight: bold;
          font-size: 1rem;
          background-color: rgb(122, 87, 58);
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
  }
/*}*/
</style>
