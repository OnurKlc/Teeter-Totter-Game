<template>
  <main class="container">
    <Mass />
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
  computed: {
    ...mapState(['']),
  },
}
</script>

<style></style>
