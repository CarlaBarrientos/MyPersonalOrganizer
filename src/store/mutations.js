export default {
  mutateCreateParticipant(state, newParticipant) {
    state.participants.push(newParticipant);
  },
  mutateUpdateParticipant(state, participantToUpdate) {
    var indexOfItem;
    state.participants.forEach(participant => {
      if (participant.participantId === participantToUpdate.participantId) {
        indexOfItem = state.participants.indexOf(participant);
        if (indexOfItem > -1) {
          state.participants.splice(indexOfItem, 1, participantToUpdate);
        }
      }
    });
  },
  mutateAddParticipant(state, participantToAdd) {
    const participant = {
      participantId: participantToAdd.participantId,
      name: participantToAdd.name,
      contactNumber: participantToAdd.contactNumber
    };
    let allAppointments = state.scheduledAppointments.concat(
      state.recursiveAppointments
    );
    allAppointments.forEach(appointment => {
      if (appointment.code === participantToAdd.appointmentCode) {
        appointment.participants.push(participant);
      }
    });
  }
};
