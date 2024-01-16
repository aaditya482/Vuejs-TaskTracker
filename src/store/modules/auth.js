// store/modules/auth.js

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
  },
  mutations: {
    setAuthentication(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
  },
  actions: {
    login({ commit }) {
      let token = localStorage.getItem("user");
      let status = (token != null && token != "undefined") ? true : false;
      if(token == "undefined"){
        localStorage.removeItem('user')
      }
      commit('setAuthentication', status);
    },
    logout({ commit }) {
      let token = localStorage.getItem("user");
      if (token != null) {
        localStorage.removeItem('user');
      }
      commit('setAuthentication', false);
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
  },
};
