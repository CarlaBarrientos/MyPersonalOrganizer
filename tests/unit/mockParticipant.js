export default {
  agendas: [],
  scheduledAppointments: [{ code: "SCH-1", participants: [] }],
  postponedAppointments: [],
  recursiveAppointments: [
    {
      code: "REC-1",
      participants: [
        {
          participantId: "PART-7",
          name: "TestDelete",
          contactNumber: "70777777"
        }
      ]
    }
  ],
  participants: [
    {
      participantId: "PART-5",
      name: "Andres Gamboa",
      contactNumber: "70777777"
    },
    {
      participantId: "PART-6",
      name: "TestUpdate",
      contactNumber: "70777777"
    },
    {
      participantId: "PART-7",
      name: "TestDelete",
      contactNumber: "70777777"
    },
    {
      participantId: "PART-8",
      name: "TestDelete",
      contactNumber: "70777777"
    }
  ]
};
