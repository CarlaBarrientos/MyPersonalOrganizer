export default {
  createParticipant({ commit }, newParticipant) {
    commit("mutateCreateParticipant", newParticipant);
  },
  updateParticipant({ commit }, participantToUpdate) {
    commit("mutateUpdateParticipant", participantToUpdate);
  },
  addParticipantToAppointment({ commit }, participantToAdd) {
    commit("mutateAddParticipantToAppointment", participantToAdd);
  },
  deleteParticipantFromAppointment({ commit }, participantToDelete) {
    commit("mutateDeleteParticipantFromAppointment", participantToDelete);
  },
  deleteParticipant({ commit }, participantToDelete) {
    commit("mutateDeleteParticipant", participantToDelete);
  }
};
