<template>
  <div ref="massWrapper" class="mass-wrapper">
    <div
      v-for="mass in masses"
      ref="masses"
      :key="mass.id"
      :class="`mass ${
        mass.itemType === 0
          ? 'square'
          : mass.itemType === 1
          ? 'circle'
          : mass.itemType === 2
          ? 'triangle'
          : ''
      }`"
      :style="
        `left: ${left}px;` +
        (mass.itemType === 2
          ? `border-color: transparent transparent ${mass.bgColor} transparent`
          : `background: ${mass.bgColor}`)
      "
    >
      {{ mass.weight }}kg
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { TimelineLite } from 'gsap'
import { v4 as uuidv4 } from 'uuid'

export default {
  data() {
    return {
      left: 0,
    }
  },
  computed: {
    ...mapState(['masses']),
  },
  watch: {
    '$store.state.masses'() {
      this.animateMass()
    },
  },
  created() {
    this.generateNewMass()
  },
  methods: {
    async animateMass() {
      const scope = this
      const timeline = new TimelineLite()
      const lastMass = await this.$refs.masses[this.masses.length - 1]
      this.listenArrowPress(lastMass)
      timeline.to(lastMass, {
        duration: 5,
        top: '100%',
        onComplete() {
          scope.generateNewMass()
        },
      })
    },
    generateNewMass() {
      const rColor = Math.floor(Math.random() * 255)
      const gColor = Math.floor(Math.random() * 255)
      const bColor = Math.floor(Math.random() * 255)
      const bgColor = `rgba(${rColor}, ${gColor}, ${bColor}, 1)`
      const newMass = {
        weight: Math.ceil(Math.random() * 10),
        bgColor,
        itemType: Math.floor(Math.random() * 3),
        id: uuidv4(),
      }
      this.$store.commit('updateMasses', newMass)
    },
    listenArrowPress(el) {
      const scope = this
      const listenerFunc = function (e) {
        let leftPx = el.style.left
        leftPx = leftPx.substring(0, leftPx.length - 2)
        const totalWidth = scope.$refs.massWrapper.getBoundingClientRect().width
        console.log(totalWidth)
        switch (e.keyCode) {
          case 37:
            if (+leftPx - 10 < 0) return 0
            el.style.left = +leftPx - 10 + 'px'
            break
          case 39:
            if (+leftPx + 40 > totalWidth) return 0
            el.style.left = +leftPx + 10 + 'px'
            break
        }
      }
      document.addEventListener('keydown', listenerFunc)
      setTimeout(() => {
        document.removeEventListener('keydown', listenerFunc)
      }, 5000)
    },
  },
}
</script>

<style lang="scss" scoped>
.mass-wrapper {
  height: 100%;
  width: 50%;
  position: relative;
}
.mass {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-40px);
}
.circle {
  border-radius: 50%;
}
.triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 20px 34.6px 20px;
  background: none !important;
}
</style>
