import Vue from 'vue'

function createDefaultState() {
  return {
    blue: {
      count: 20,
      name: 'Blue Compass'
    },
    yellow: {
      count: 18,
      name: 'Yellow Lightning Arresters'
    },
    red: {
      count: 16,
      name: 'Red Foghorns'
    },
    black: {
      count: 14,
      name: 'Black Cannons'
    },
    wild: {
      count: 8,
      name: 'Wild'
    }
  }
}

const mutations = {
  ADD(state, payload) {
    Vue.set(state, payload.id, payload.value)
  }
}

const actions = {
  update({ commit }, {id, value}) {
    commit('ADD', {id, value})
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
  },
  cardsLeft(state) {
    let count = 0
    Object.values(state).forEach(function(card) { count += card.count })
    return count
  }
}

export const cardsModule = {
  namespaced: true,
  state: createDefaultState,
  mutations,
  actions,
  getters
}
