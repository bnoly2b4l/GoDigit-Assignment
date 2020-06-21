import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    currentCustomer: null,
    currentUser: ''
  },

  getters: {
    customers: (state) => {
      return state.data.map((customer) => {
        return {
          name: {
            fullName: customer['first_name'] + ' ' + customer['last_name'],
            id: customer.id,
          },
          management: customer.id,
          ...customer,
        }
      })
    },
  },

  actions: {
    setCurrentCustomer: ({ commit }, payload) => {
      commit('SET_CURRENT_CUSTOMER', payload)
    },
    setData: ({ commit }, payload) => {
      commit('SET_DATA', payload)
    },
    setUserName: ({ commit }, payload) => {
      commit('SET_USER_NAME', payload)
    },
  },

  mutations: {
    SET_CURRENT_CUSTOMER(state, payload) {
      state.currentCustomer = payload
    },
    SET_DATA(state, payload) {
      state.data = payload
    },
    SET_USER_NAME(state, payload) {
      state.currentUser = payload
    },
  },
})
