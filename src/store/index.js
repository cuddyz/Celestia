import Vuex from 'vuex'
import Vue from 'vue'
import {cardsModule} from './modules/cards'
import {citiesModule} from './modules/cities'
import {playersModule} from './modules/players'
import {shipModule} from './modules/ship'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cards: cardsModule,
    cities: citiesModule,
    players: playersModule,
    ship: shipModule
  },
  strict: true
})
