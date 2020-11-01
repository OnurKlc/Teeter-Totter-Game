<template>
  <main class="container">
    <div v-if="uiState === 'play'" class="button-container">
      <button class="primary" @click="pauseAnimation">Pause</button>
      <button class="primary" @click="continueAnimation">Continue</button>
    </div>
    <div v-if="uiState === 'play'" class="mass-field">
      <Mass />
    </div>
    <TeeterTotter v-if="uiState === 'play'" />
    <div v-if="uiState === 'end'" class="game-over">
      <h1>Game Over</h1>
      <button class="primary" @click="restartGame">Start Again</button>
    </div>
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
    return {}
  },
  computed: {
    ...mapState(['uiState']),
  },
  methods: {
    pauseAnimation() {
      this.$forceUpdate()
      window.timeline.pause()
    },
    continueAnimation() {
      window.timeline.play()
    },
    restartGame() {
      this.$store.commit('updateUiState', 'play')
    },
  },
}
</script>
