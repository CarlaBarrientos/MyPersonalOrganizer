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
  mutateAddParticipantToAppointment(state, participantToAdd) {
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
  },
  mutateDeleteParticipantFromAppointment(state, participantToDelete) {
    const participant = {
      participantId: participantToDelete.participantId,
      name: participantToDelete.name,
      contactNumber: participantToDelete.contactNumber
    };
    let allAppointments = state.scheduledAppointments.concat(
      state.recursiveAppointments
    );
    var indexOfItem;
    allAppointments.forEach(appointment => {
      if (appointment.code === participantToDelete.appointmentCode) {
        indexOfItem = appointment.participants.indexOf(participant);
        appointment.participants.splice(indexOfItem, 1);
      }
    });
  },
  mutateDeleteParticipant(state, participantToDelete) {
    let allAppointments = state.scheduledAppointments.concat(
      state.recursiveAppointments
    );
    var indexOfItem;
    var onAppointment = false;
    allAppointments.forEach(appointment => {
      appointment.participants.forEach(participant => {
        if (participant.participantId === participantToDelete.participantId) {
          onAppointment = true;
        }
      });
    });
    if (!onAppointment) {
      state.participants.forEach(participant => {
        if (participant.participantId === participantToDelete.participantId) {
          indexOfItem = state.participants.indexOf(participant);
          state.participants.splice(indexOfItem, 1);
        }
      });
    } else {
      alert("Cant Delete Participant, First Remove it from all Appointments");
    }
  }
};
