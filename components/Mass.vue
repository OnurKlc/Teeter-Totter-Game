<template>
  <div
    ref="mass"
    class="mass"
    :style="`background: ${bgColor}; left: ${leftLimit}px`"
  >
    <div v-if="item === 0" class="square">{{ weight }}kg</div>
    <div v-if="item === 1" class="circle">{{ weight }}kg</div>
    <div v-if="item === 2" class="triangle">{{ weight }}kg</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { TimelineLite } from 'gsap'

export default {
  data() {
    return {
      weight: Math.ceil(Math.random() * 10),
      rColor: Math.floor(Math.random() * 255),
      gColor: Math.floor(Math.random() * 255),
      bColor: Math.floor(Math.random() * 255),
      item: 0,
    }
  },
  computed: {
    ...mapState(['leftLimit', 'bottomLimit']),
    bgColor() {
      return `rgba(${this.rColor}, ${this.gColor}, ${this.bColor}, 1)`
    },
  },
  watch: {
    bottomLimit() {
      this.animateMass()
    },
  },
  created() {
    this.item = Math.floor(Math.random() * 3)
  },
  mounted() {
    this.animateMass()
  },
  methods: {
    animateMass() {
      const { mass } = this.$refs
      const timeline = new TimelineLite()
      console.log(this.bottomLimit)
      timeline.to(mass, { duration: 5, top: this.bottomLimit - 40 })
    },
  },
}
</script>

<style lang="scss" scoped>
.mass {
  width: 40px;
  height: 40px;
  position: absolute;
  top: -50px;

  div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.square {
}
.circle {
  border-radius: 50%;
}
</style>
