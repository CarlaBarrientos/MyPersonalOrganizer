export default {
  mutateAddSchedule(state, newSchedule) {
    state.scheduledAppointments.push(newSchedule);
  }
};
