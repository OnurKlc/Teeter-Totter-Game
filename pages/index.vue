<template>
  <main class="container">
    <div class="button-container">
      <button class="primary" @click="pauseAnimation">Pause</button>
      <button class="primary" @click="continueAnimation">Continue</button>
    </div>
    <div class="mass-field">
      <Mass :is-playing="isAnimationPlaying" />
    </div>
    <TeeterTotter />
  </main>
</template>

<script>
import { mapState } from 'vuex'
import TeeterTotter from '@/components/TeeterTotter'
import Mass from '@/components/Mass'

export default {
  components: {
    Mass,
    TeeterTotter,
  },
  data() {
    return {
      isAnimationPlaying: true,
    }
  },
  computed: {
    ...mapState(['']),
  },
  methods: {
    pauseAnimation() {
      this.isAnimationPlaying = false
    },
    continueAnimation() {
      this.isAnimationPlaying = true
    },
  },
}
</script>

<style></style>
