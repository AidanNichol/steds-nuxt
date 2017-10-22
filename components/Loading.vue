<template>
  <div>
    <img v-if="typ==1" src="/images/gears.svg" />
    <img v-if="typ==2" src="/images/reload.svg" />
    <img v-if="typ==3" src="/images/spin.svg" />

  </div>

</template>

<script>
export default {
  props: {
    typ: {
      type: String,
      default: 3
    }
  }
};
</script>
