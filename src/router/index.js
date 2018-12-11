import Vue from 'vue'
import Router from 'vue-router'
import Game from '@/components/Game'

Vue.use(Router)

let routeConfig = {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Game',
      component: Game
    }
  ]
}

const router = new Router(routeConfig)

export default router
