import Vue from 'vue'
import Vuex from 'vuex'


import state from './modules/index'

Vue.use(Vuex)

export default new Vuex.Store({
  ...state,
  strict: process.env.NODE_ENV !== 'production'
})
