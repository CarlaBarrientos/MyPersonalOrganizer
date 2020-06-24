export default {
  getParticipantsList(state) {
    return state.participants;
  },
  getAllAppointmentsList(state) {
    return state.scheduledAppointments.concat(state.recursiveAppointments);
  }
};
