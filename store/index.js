export const state = () => ({
  data: [],
})

export const getters = {
  getData: (state) => {
    return state.data
  },
}

export const mutations = {
  updateData: (state, payload) => {
    state.data = payload
  },
}

export const actions = {
  updateActionData({ commit, newData }) {
    commit('updateData', newData)
  },
}
