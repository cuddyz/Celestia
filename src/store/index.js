import Vuex from 'vuex'
import Vue from 'vue'
import {cardsModule} from './modules/cards'
import {citiesModule} from './modules/cities'
import {playersModule} from './modules/players'
import {coreModule} from './modules/core'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cards: cardsModule,
    cities: citiesModule,
    players: playersModule,
    core: coreModule
  },
  strict: true
})
