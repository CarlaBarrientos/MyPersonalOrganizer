import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";
Vue.use(Vuex);

const state = {
  agendas: [],
  scheduledAppointments: [
    {
      code: "sched-1",
      name: "Dentist",
      description: "I need to go to dentist",
      date: "2020-06-12",
      startHour: "10:00",
      endHour: "11:00",
      agendaId: "ANG-0001",
      participants: []
    },
    {
      code: "sched-2",
      name: "Dentist",
      description: "I need to go to dentist",
      date: "2020-06-12",
      startHour: "10:00",
      endHour: "11:00",
      agendaId: "ANG-0001",
      participants: []
    },
    {
      code: "sched-3",
      name: "Dentist",
      description: "I need to go to dentist",
      date: "2020-06-12",
      startHour: "10:00",
      endHour: "11:00",
      agendaId: "ANG-0001",
      participants: []
    }
  ],
  postponedAppointments: [],
  recursiveAppointments: [],
  participants: []
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {}
});
