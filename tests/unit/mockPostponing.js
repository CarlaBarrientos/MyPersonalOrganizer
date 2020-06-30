export default {
  agendas: [
    {
      agendaId: "ANG-1",
      name: "Work",
      description: "My Agenda to manage my workd",
      startHour: "10:00",
      endHour: "17:00",
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
      participants: []
    },
    {
      code: "sched-2",
      name: "Dentist",
      description: "I need to go to dentist",
      date: "2020-06-24",
      startHour: "12:00",
      endHour: "15:00",
      agendaId: "ANG-1",
      participants: []
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
  ]
};
