import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";
Vue.use(Vuex);

const state = {
  agendas: [
    {
      agendaId: "ANG-1",
      name: "Work",
      description: "My Agenda to manage my workd",
      startHour: "10:00",
      endHour: "16:00",
      appointments: []
    },
    {
      agendaId: "ANG-2",
      name: "Work2",
      description: "My Agenda to manage my workd",
      startHour: "10:00",
      endHour: "16:00",
      appointments: []
    },
    {
      agendaId: "ANG-3",
      name: "Work3",
      description: "My Agenda to manage my workd",
      startHour: "10:00",
      endHour: "16:00",
      appointments: []
    }
  ],
  scheduledAppointments: [
    {
      code: "sched-1",
      name: "Dentist",
      description: "I need to go to dentist",
      date: "2020-06-24",
      startHour: "10:00",
      endHour: "11:00",
      agendaId: "ANG-1",
      participants: [
        {
          participantId: "PART-2",
          name: "TestDelete",
          contactNumber: "70777777"
        }
      ]
    },
    {
      code: "sched-2",
      name: "Dentist",
      description: "I need to go to dentist",
      date: "2020-06-24",
      startHour: "12:00",
      endHour: "15:00",
      agendaId: "ANG-1",
      participants: [
        {
          participantId: "PART-2",
          name: "TestDelete",
          contactNumber: "70777777"
        },
        {
          participantId: "PART-1",
          name: "TestUpdate",
          contactNumber: "70777777"
        },
        {
          participantId: "PART-0",
          name: "Andres Gamboa",
          contactNumber: "70777777"
        }
      ]
    },
    {
      code: "sched-3",
      name: "Dentist",
      description: "I need to go to dentist",
      date: "2020-06-24",
      startHour: "14:00",
      endHour: "15:00",
      agendaId: "ANG-1",
      participants: []
    }
  ],
  postponedAppointments: [
    {
      code: "schedPostponed-1",
      name: "Dentist",
      description: "I need to go to the dentist"
    },
    {
      code: "schedPostponed-2",
      name: "Doctor",
      description: "I need to go to the doctor"
    },
    {
      code: "schedPostponed-3",
      name: "University",
      description: "I need to go to my university"
    }
  ],
  recursiveAppointments: [
    {
      code: "recursive-1",
      name: "F",
      description: "FFF",
      begindate: "2020-06-28",
      enddate: "2020-06-30",
      startHour: "14:00",
      endHour: "15:00",
      agendaId: "ANG-001",
      participants: [],
      time: "Daily",
      each: ""
    },
    {
      code: "recursive-2",
      name: "S",
      description: "SSS",
      begindate: "2020-06-28",
      enddate: "2020-06-30",
      startHour: "15:00",
      endHour: "16:00",
      agendaId: "ANG-001",
      participants: [
        {
          participantId: "PART-2",
          name: "Test",
          contactNumber: "70777777"
        }
      ],
      time: "Weekly",
      each: "Monday"
    }
  ],
  participants: [
    {
      participantId: "PART-0",
      name: "Andres Gamboa",
      contactNumber: "70777777"
    },
    {
      participantId: "PART-1",
      name: "TestUpdate",
      contactNumber: "70777777"
    },
    {
      participantId: "PART-2",
      name: "TestDelete",
      contactNumber: "70777777"
    }
  ]
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {}
});
