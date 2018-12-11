import Vue from 'vue'

function createDefaultState() {
  return {
    location: '',
    players: []
  }
}

const mutations = {
  ADD(state, payload) {
    Vue.set(state, payload.id, payload.value)
  },
  LOAD(state, payload) {
    Object.assign(state, payload)
  }
}

const actions = {
  resetShip({ commit }) {
    const ship = {
      location: this.getters['cities/startingCity'],
      players: this.getters['players/list']
    }
    commit('LOAD', ship)
    return ship
  },
  update({ commit }, {id, value}) {
    commit('ADD', {id, value})
  }
}

const getters = {
  show(state) {
    return state
  }
}

export const shipModule = {
  namespaced: true,
  state: createDefaultState,
  mutations,
  actions,
  getters
}
