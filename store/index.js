import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      admin: false,
      language: 'ru'
    },
    mutations: {
      adminMode (state) {
        state.admin = !state.admin
      },
      changeLanguage (state, language) {
        state.language = language
      }
    }
  })
}

export default createStore
