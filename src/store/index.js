import Vue from "vue";
import Vuex from "vuex";
import actions from "@/store/actions.js";
import mutations from "@/store/mutations.js";
import getters from "@/store/getters.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    agendas: [],
    scheduledAppointments: [{ code: "SCH-1", participants: [] }],
    postponedAppointments: [],
    recursiveAppointments: [{ code: "REC-1", participants: [] }],
    participants: [
      {
        participantId: "PART-5",
        name: "Andres Gamboa",
        contactNumber: "70777777"
      }
    ]
  },
  actions,
  mutations,
  getters,
  modules: {}
});
