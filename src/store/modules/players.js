import Vue from 'vue'

function createDefaultState() {
  return {
  }
}

const mutations = {
  ADD(state, payload) {
    Vue.set(state, payload.id, payload.value)
  }
}

const actions = {
  create({ commit, state }, {name, color}) {
    const player = {
      id: name,
      name: name,
      color: color,
      score: 0,
      hand: []
    }
    commit('ADD', {id: player.id, value: player})
    return player
  },
  updatePlayerHand({ commit }, {player, hand}) {
    let localPlayer = {...player}
    localPlayer.hand = {
      blue: {
        count: hand.filter(card => card === 'Blue Compass').length,
        name: 'Blue Compass'
      },
      yellow: {
        count: hand.filter(card => card === 'Yellow Lightning Arresters').length,
        name: 'Yellow Lightning Arresters'
      },
      red: {
        count: hand.filter(card => card === 'Red Foghorns').length,
        name: 'Red Foghorns'
      },
      black: {
        count: hand.filter(card => card === 'Black Cannons').length,
        name: 'Black Cannons'
      },
      wild: {
        count: hand.filter(card => card === 'Wild').length,
        name: 'Wild'
      }
    }

    commit('ADD', {id: localPlayer.id, value: localPlayer})
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
