import Vue from 'vue'

function createDefaultState() {
  return {
  }
}

const mutations = {
  ADD(state, payload) {
    payload.forEach(p => Vue.set(state, p.id, p.value))
  }
}

const actions = {
  create({ commit }, {name, color}) {
    const player = {
      id: name,
      name: name,
      color: color,
      score: 0
    }
    commit('ADD', [{id: player.id, value: player}])
    return player
  },
  update({ commit }, {id, value}) {
    commit('ADD', [{id, value}])
  }
}

const getters = {
  show(state) {
    return function (id) {
      return state[id]
    }
  },
  list(state) {
    return Object.values(state)
  }
}

export const playersModule = {
  namespaced: true,
  state: createDefaultState,
  mutations,
  actions,
  getters
}
