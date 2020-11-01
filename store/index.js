export const state = () => ({
  masses: [],
})

// export const getters = {
//   getData: (state) => {
//     return state.data
//   },
// }

export const mutations = {
  updateMasses: (state, payload) => {
    state.masses.push(payload)
  },
}

// export const actions = {
//   updateActionData({ commit, newData }) {
//     commit('updateData', newData)
//   },
// }
