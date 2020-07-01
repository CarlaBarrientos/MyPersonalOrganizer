export default {
    agendas: [
    {
        agendaId: "AGN-1",
        name: "Work",
        description: "My Agenda to manage my workd",
        startHour: "8:00",
        endHour: "16:00",
        appointments: []
    },
    {
        agendaId: "AGN-2",
        name: "Work2",
        description: "My Agenda to manage my workd",
        startHour: "10:00",
        endHour: "16:00",
        appointments: []
    },
    {
        agendaId: "AGN-3",
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
        name: "Test",
        description: "I need to test",
        date: "2020-06-24",
        startHour: "10:00",
        endHour: "11:00",
        agendaId: "AGN-1",
        participants: []
    },
    {
        code: "sched-2-1",
        name: "Dentist",
        description: "FFF",
        date: "2020-06-28",
        startHour: "14:00",
        endHour: "15:00",
        agendaId: "AGN-1",
        participants: []
    },
    {
        code: "sched-3-1",
        name: "Dentist",
        description: "FFF",
        date: "2020-06-29",
        startHour: "14:00",
        endHour: "15:00",
        agendaId: "AGN-1",
        participants: []
    }
    ],
    recursiveAppointments: [
    {
        code: "recursive-1",
        name: "Dentist",
        description: "FFF",
        begindate: "2020-06-28",
        enddate: "2020-06-29",
        startHour: "14:00",
        endHour: "15:00",
        agendaId: "AGN-1",
        participants: [],
        time: "Daily",
        each: ""
    }
    ]
};
