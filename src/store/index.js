import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const state = {
  agendas: [],
  scheduledAppointments: [],
  postponedAppointments: [],
  recursiveAppointments: [],
  participants: []
};

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  actions,
  mutations,
  getters,
  modules: {}
});
