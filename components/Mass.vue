<template>
  <div ref="massWrapper" class="mass-wrapper">
    <div class="mass-left-wrapper">
      <div
        v-for="mass in masses"
        ref="masses"
        :key="mass.id"
        :data-id="mass.id"
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
    <div class="mass-right-wrapper">
      <div
        v-for="mass in rightMasses"
        :key="mass.id"
        :data-id="mass.id"
        :class="`mass-right ${
          mass.itemType === 0
            ? 'square'
            : mass.itemType === 1
            ? 'circle'
            : mass.itemType === 2
            ? 'triangle'
            : ''
        }`"
        :style="
          `left: ${mass.position}px;` +
          (mass.itemType === 2
            ? `border-color: transparent transparent ${mass.bgColor} transparent`
            : `background: ${mass.bgColor}`)
        "
      >
        {{ mass.weight }}kg
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { TimelineLite } from 'gsap'
import { v4 as uuidv4 } from 'uuid'

export default {
  data() {
    return {
      left: 0,
      rightMass: {},
      pageReady: false,
    }
  },
  computed: {
    ...mapState(['masses', 'rightMasses', 'teeterTotterWidth']),
    ...mapGetters(['getLeftMomentum']),
  },
  watch: {
    '$store.state.masses'() {
      if (this.$store.state.masses.length > 0) {
        this.animateMass()
      }
    },
    '$store.getters.getLeftMomentum'() {
      console.log(this.$store.getters.getLeftMomentum)
    },
  },
  created() {
    this.generateNewMass()
  },
  mounted() {
    this.left = this.$refs.massWrapper.getBoundingClientRect().width / 4
    this.generateRightMass()
  },
  methods: {
    async animateMass() {
      const scope = this
      const timeline = new TimelineLite()
      const lastMass = await this.$refs.masses[this.masses.length - 1]
      this.listenArrowPress(lastMass)
      timeline.to(lastMass, {
        duration: 10,
        top: '100%',
        onComplete() {
          const leftOffset = Math.floor(
            lastMass.getBoundingClientRect().left + 40
          )
          const halfPageLength = window.innerWidth / 2
          const position = halfPageLength - leftOffset
          const data = {
            id: lastMass.getAttribute('data-id'),
            position,
          }
          scope.$store.commit('updatePositionData', data)
          scope.generateNewMass()
          scope.generateRightMass()
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
        position: 0,
      }
      this.$store.commit('updateMasses', newMass)
    },
    generateRightMass() {
      const rColor = Math.floor(Math.random() * 255)
      const gColor = Math.floor(Math.random() * 255)
      const bColor = Math.floor(Math.random() * 255)
      const width = this.$refs.massWrapper.getBoundingClientRect().width
      this.$store.commit('updateTeeterTotterWidth', width)
      const bgColor = `rgba(${rColor}, ${gColor}, ${bColor}, 1)`
      const newMass = {
        weight: Math.ceil(Math.random() * 10),
        bgColor,
        itemType: Math.floor(Math.random() * 3),
        id: uuidv4(),
        position: Math.floor((Math.random() * width) / 2),
      }
      this.$store.commit('updateRightMasses', newMass)
    },
    listenArrowPress(el) {
      const scope = this
      const listenerFunc = function (e) {
        let leftPx = el.style.left
        leftPx = leftPx.substring(0, leftPx.length - 2)
        switch (e.keyCode) {
          case 37:
            if (+leftPx - 10 < 0) return 0
            el.style.left = +leftPx - 10 + 'px'
            break
          case 39:
            if (+leftPx + 40 > scope.teeterTotterWidth / 2) return 0
            el.style.left = +leftPx + 10 + 'px'
            break
        }
      }
      document.addEventListener('keydown', listenerFunc)
      setTimeout(() => {
        document.removeEventListener('keydown', listenerFunc)
      }, 10000)
    },
  },
}
</script>

<style lang="scss" scoped>
.mass-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
}
.mass-left-wrapper {
  height: 100%;
  width: 50%;
  position: relative;
}
.mass-right-wrapper {
  width: 50%;
  height: 100%;
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
.mass-right {
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
