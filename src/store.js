// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    breadListState: [
      {name: '首页', path: '/'}
    ],

  },
  mutations: {
    breadListStateAdd(state, obj) {
      state.breadListState.push(obj)
    },
    breadListStateRemove(state, num) {
      state.breadListState.splice(num, state.breadListState.length - num)
    }
  },
  getters: {
    
  },
  actions: {
  }
})
