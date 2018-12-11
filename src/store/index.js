import Vuex from 'vuex'
import Vue from 'vue'
import {cardsModule} from './modules/cards'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cards: cardsModule
  },
  strict: true
})
