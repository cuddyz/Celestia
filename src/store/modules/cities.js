import Vue from 'vue'

function createDefaultState() {
  return {
    pink: {
      id: 'pink',
      order: 1,
      baseValue: 1,
      name: 'Pink City',
      dice: 0,
      rewards: [
        {
          value: 1,
          count: 5
        },
        {
          value: 2,
          count: 3
        },
        {
          value: 4,
          count: 2
        }
      ]
    },
    yellow: {
      id: 'yellow',
      order: 2,
      baseValue: 2,
      name: 'Yellow City',
      dice: 2,
      rewards: [
        {
          value: 2,
          count: 5
        },
        {
          value: 4,
          count: 3
        },
        {
          value: 6,
          count: 2
        }
      ]
    },
    green: {
      id: 'green',
      order: 3,
      baseValue: 4,
      name: 'Green City',
      dice: 2,
      rewards: [
        {
          value: 4,
          count: 5
        },
        {
          value: 6,
          count: 3
        },
        {
          value: 9,
          count: 1
        }
      ]
    },
    tan: {
      id: 'tan',
      order: 4,
      baseValue: 6,
      name: 'Tan City',
      dice: 2,
      rewards: [
        {
          value: 6,
          count: 5
        },
        {
          value: 9,
          count: 3
        },
        {
          value: 12,
          count: 1
        }
      ]
    },
    purple: {
      id: 'purple',
      order: 5,
      baseValue: 9,
      name: 'Purple City',
      dice: 3,
      rewards: [
        {
          value: 9,
          count: 6
        },
        {
          value: 12,
          count: 3
        }
      ]
    },
    orange: {
      id: 'orange',
      order: 6,
      baseValue: 12,
      name: 'Orange City',
      dice: 3,
      rewards: [
        {
          value: 12,
          count: 6
        },
        {
          value: 15,
          count: 3
        }
      ]
    },
    brown: {
      id: 'brown',
      order: 7,
      baseValue: 15,
      name: 'Brown City',
      dice: 3,
      rewards: [
        {
          value: 15,
          count: 6
        }
      ]
    },
    aqua: {
      id: 'aqua',
      order: 8,
      baseValue: 20,
      name: 'Aqua City',
      dice: 4,
      rewards: [
        {
          value: 20,
          count: 6
        }
      ]
    },
    blue: {
      id: 'blue',
      order: 9,
      baseValue: 25,
      name: 'Blue City',
      dice: 4,
      rewards: [
        {
          value: 25,
          count: 6
        }
      ]
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
  cityCardsLeft(state) {
    return function (id) {
      const city = state[id]
      let count = 0
      city.rewards.forEach(function(card) { count += card.count })
      return count
    }
  },
  startingCity(state) {
    return Object.values(state).find(city => city.order === 1)
  },
  nextCity(state) {
    return function (id) {
      const currentCity = state[id]
      const nextCityOrder = currentCity.order + 1
      if (nextCityOrder > 9) {
        return ''
      }

      return Object.values(state).find(city => city.order === nextCityOrder)
    }
  }
}

export const citiesModule = {
  namespaced: true,
  state: createDefaultState,
  mutations,
  actions,
  getters
}
