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
  }
};
