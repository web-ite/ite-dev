import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      admin: false
    },
    mutations: {
      adminMode (state) {
        state.admin = !state.admin
      }
    }
  })
}

export default createStore
