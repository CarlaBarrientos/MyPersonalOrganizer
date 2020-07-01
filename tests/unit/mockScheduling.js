export default {
  agendas: [
    {
      agendaId: "ANG-1",
      name: "Work",
      description: "My Agenda to manage my work",
      startHour: "10:00",
      endHour: "16:00",
      appointments: []
    },
    {
      agendaId: "ANG-2",
      name: "Work2",
      description: "My Agenda to manage my work",
      startHour: "10:00",
      endHour: "15:00",
      appointments: []
    }
  ],
  scheduledAppointments: [
    {
      code: "sched-1",
      name: "Dentist",
      description: "I need to go to dentist",
      date: "2020-06-12",
      startHour: "10:00",
      endHour: "11:00",
      agendaId: "ANG-1",
      participants: []
    }
  ]
};
