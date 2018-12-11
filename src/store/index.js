import Vuex from 'vuex'
import Vue from 'vue'
import {cardsModule} from './modules/cards'
import {citiesModule} from './modules/cities'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cards: cardsModule,
    cities: citiesModule
  },
  strict: true
})
