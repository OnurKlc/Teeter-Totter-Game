export const state = () => ({
  leftLimit: 0,
  bottomLimit: 0,
})

// export const getters = {
//   getData: (state) => {
//     return state.data
//   },
// }

export const mutations = {
  updateLeftLimit: (state, payload) => {
    state.leftLimit = payload
  },
  updateBottomLimit: (state, payload) => {
    console.log(payload)
    state.bottomLimit = payload
  },
}

// export const actions = {
//   updateActionData({ commit, newData }) {
//     commit('updateData', newData)
//   },
// }
