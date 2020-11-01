import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem, removeItem } from '../utils/storage'

Vue.use(Vuex)
const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {//存储
    user: getItem(USER_KEY)
  },
  mutations: {//设置
    setUser (state, data) {
      state.user = data
      setItem(USER_KEY, data)
    }
  },
  actions: {},
  modules: {}
})
