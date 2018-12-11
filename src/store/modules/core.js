import Vue from 'vue'

const DICE_FACES = {
  BLANK: 'blank',
  BLUE: 'blue',
  RED: 'red',
  YELLOW: 'yellow',
  BLACK: 'black'
}

const die = [DICE_FACES.BLANK, DICE_FACES.BLUE, DICE_FACES.RED, DICE_FACES.YELLOW, DICE_FACES.BLACK, DICE_FACES.BLANK]

function createDefaultState() {
  return {
    captain: '',
    dice: [DICE_FACES.BLANK, DICE_FACES.BLANK, DICE_FACES.BLANK, DICE_FACES.BLANK],
    ship: {
      location: '',
      players: []
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
  newRound({ commit, state }) {
    const players = this.getters['players/list']
    let captain = ''

    // Get Captain
    if (!state.captain) {
      captain = players[0]
    } else {
      let currentIndex = players.findIndex(p => p.id === state.captain.id)
      currentIndex++
      if (currentIndex < players.length) {
        captain = players[currentIndex]
      } else {
        captain = players[0]
      }
    }

    const game = {
      captain: captain,
      dice: [DICE_FACES.BLANK, DICE_FACES.BLANK, DICE_FACES.BLANK, DICE_FACES.BLANK],
      ship: {
        location: this.getters['cities/startingCity'],
        players: this.getters['players/list']
      }
    }
    commit('LOAD', game)
    return game
  },
  rollDie({ commit }, { num }) {
    let dice = [DICE_FACES.BLANK, DICE_FACES.BLANK, DICE_FACES.BLANK, DICE_FACES.BLANK]
    for (let i = 0; i < num; i++) {
      let random = Math.floor(Math.random() * 6)
      dice[i] = die[random]
    }
    commit('ADD', {id: 'dice', value: dice})
  }
}

const getters = {
  show(state) {
    return state
  }
}

export const coreModule = {
  namespaced: true,
  state: createDefaultState,
  mutations,
  actions,
  getters
}
