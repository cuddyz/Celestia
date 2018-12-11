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
  },
  LOAD(state, payload) {
    Object.assign(state, payload)
  }
}

const actions = {
  updateCards({ commit, state }, deck) {
    let newState = {
      blue: {
        count: deck.filter(card => card === state.blue.name).length,
        name: 'Blue Compass'
      },
      yellow: {
        count: deck.filter(card => card === state.yellow.name).length,
        name: 'Yellow Lightning Arresters'
      },
      red: {
        count: deck.filter(card => card === state.red.name).length,
        name: 'Red Foghorns'
      },
      black: {
        count: deck.filter(card => card === state.black.name).length,
        name: 'Black Cannons'
      },
      wild: {
        count: deck.filter(card => card === state.wild.name).length,
        name: 'Wild'
      }
    }
    commit('LOAD', newState)
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
  getDeck(state) {
    let deck = []
    Object.values(state).forEach(function(card) {
      for (let i = 0; i < card.count; i++) {
        deck.push(card.name)
      }
    })
    return deck
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
