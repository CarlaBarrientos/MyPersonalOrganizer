export default {
  mutatePostponeAppointment(state, newPpdAppointments) {
    state.ppdAppointments.push(newPpdAppointments);
  },
  mutateModifyPpdAppointment(state, appointmentToUpdate) {
    const indexToUpdate = state.ppdAppointments.findIndex(
      appointment => appointment.code === appointmentToUpdate.code
    );
    if (indexToUpdate > -1) {
      state.ppdAppointments.splice(indexToUpdate, 1, appointmentToUpdate);
    }
  },
  mutateDeletePpdAppointment(state, code) {
    const indexToDelete = state.ppdAppointments.findIndex(
      appointment => appointment.code === code
    );
    if (indexToDelete > -1) {
      state.ppdAppointments = state.ppdAppointments.filter(
        appointment => appointment.code !== code
      );
    }
  }
};
