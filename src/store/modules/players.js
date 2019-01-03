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
      hand: {
        blue: {
          count: 0,
          name: 'Blue Compass'
        },
        yellow: {
          count: 0,
          name: 'Yellow Lightning Arresters'
        },
        red: {
          count: 0,
          name: 'Red Foghorns'
        },
        black: {
          count: 0,
          name: 'Black Cannons'
        },
        wild: {
          count: 0,
          name: 'Wild'
        }
      }
    }
    commit('ADD', {id: player.id, value: player})
    return player
  },
  givePlayerPoints({ commit }, {player, points}) {
    let localPlayer = {...player}
    localPlayer.score += points
    commit('ADD', {id: localPlayer.id, value: localPlayer})
  },
  updatePlayerHand({ commit }, {player, cards}) {
    let localPlayer = {...player}

    localPlayer.hand['blue'].count += cards.filter(card => card === 'Blue Compass').length
    localPlayer.hand['yellow'].count += cards.filter(card => card === 'Yellow Lightning Arresters').length
    localPlayer.hand['red'].count += cards.filter(card => card === 'Red Foghorns').length
    localPlayer.hand['black'].count += cards.filter(card => card === 'Black Cannons').length
    localPlayer.hand['wild'].count += cards.filter(card => card === 'Wild').length

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
