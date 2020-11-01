export const state = () => ({
  masses: [],
  rightMasses: [],
  teeterTotterWidth: 0,
})

export const getters = {
  getLeftMomentum: (state) => {
    if (state.masses.length > 0) {
      return state.masses.reduce((ac, next) => {
        const itemDistanceBaseFive =
          (next.position * 5) / state.teeterTotterWidth
        const itemMomentum = next.weight * itemDistanceBaseFive
        return ac + itemMomentum
      }, 0)
    }
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
}

// export const actions = {
//   updateActionData({ commit, newData }) {
//     commit('updateData', newData)
//   },
// }
