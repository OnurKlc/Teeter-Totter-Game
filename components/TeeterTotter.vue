<template>
  <div class="teeter-totter">
    <div
      id="teeterTotterTop"
      ref="topLayer"
      class="top-layer"
      :style="`transform: rotate(${momentum / 2}deg)`"
    />
    <div class="base" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getMomentum']),
    momentum() {
      return this.$store.getters.getMomentum.toFixed(2)
    },
  },
  watch: {
    momentum() {
      if (this.momentum > 20 || this.momentum < -20) {
        window.timeline.pause()
        setTimeout(() => {
          this.$store.commit('updateUiState', 'end')
        }, 1000)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.teeter-totter {
  margin-bottom: 50px;
  margin-top: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.top-layer {
  background-color: red;
  width: 70%;
  height: 5px;
  transition: 0.5s;
}
.base {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 100px 173.2px 100px;
  border-color: transparent transparent #393d42 transparent;
}
</style>
