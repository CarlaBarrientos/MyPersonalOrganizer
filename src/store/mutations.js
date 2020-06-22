export default {
  mutateAddSchedule(state, newSchedule) {
    state.scheduledAppointments.push(newSchedule);
  },
  mutateModifySchedule(state, scheduleToUpdate) {
    const indexToUpdate = state.scheduledAppointments.findIndex(
      schedule => schedule.code === scheduleToUpdate.code
    );
    if (indexToUpdate > -1) {
      state.scheduledAppointments.splice(indexToUpdate, 1, scheduleToUpdate);
    }
  }
};
