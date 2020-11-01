<template>
  <main class="container">
    <div class="mass-field">
      <Mass />
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
    return {}
  },
  computed: {
    ...mapState(['']),
  },
}
</script>

<style></style>
