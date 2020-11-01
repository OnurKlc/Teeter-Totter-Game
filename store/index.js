export const state = () => ({
  masses: [],
  rightMasses: [],
  teeterTotterWidth: 0,
  uiState: 'play',
})

export const getters = {
  getMomentum: (state) => {
    const leftMomentum = state.masses.reduce((ac, next) => {
      const itemDistanceBaseFive =
        (next.position * 5) / (state.teeterTotterWidth / 2)
      const itemMomentum = next.weight * itemDistanceBaseFive
      return ac + itemMomentum
    }, 0)
    const rightMomentum = state.rightMasses.reduce((ac, next) => {
      const itemDistanceBaseFive =
        (next.position * 5) / (state.teeterTotterWidth / 2)
      const itemMomentum = next.weight * itemDistanceBaseFive
      return ac + itemMomentum
    }, 0)
    return rightMomentum.toFixed(2) - leftMomentum.toFixed(2)
  },
}

export const mutations = {
  updateMasses: (state, payload) => {
    state.masses.push(payload)
  },
  updateRightMasses: (state, payload) => {
    state.rightMasses.push(payload)
  },
  updatePositionData: (state, payload) => {
    const itemToUpdate = state.masses.find((mass) => mass.id === payload.id)
    itemToUpdate.position = payload.position
  },
  updateTeeterTotterWidth: (state, payload) => {
    state.teeterTotterWidth = payload
  },
  updateUiState: (state, payload) => {
    if (payload === 'end') {
      window.timeline.pause()
      state.masses = []
      state.rightMasses = []
      state.uiState = payload
    } else {
      window.location.reload()
    }
  },
}
