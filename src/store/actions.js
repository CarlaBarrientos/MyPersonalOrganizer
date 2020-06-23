export default {
  createParticipant({ commit }, newParticipant) {
    commit("mutateCreateParticipant", newParticipant);
  },
  updateParticipant({ commit }, participantToUpdate) {
    commit("mutateUpdateParticipant", participantToUpdate);
  },
  addParticipant({ commit }, participantToAdd) {
    commit("mutateAddParticipant", participantToAdd);
  }
};
