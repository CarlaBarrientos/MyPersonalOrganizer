"use strict";
const addSchedule = ({ commit }, newSchedule) => {
  commit("mutateAddSchedule", newSchedule);
};
const modifySchedule = ({ commit }, scheduleToUpdate) => {
  commit("mutateModifySchedule", scheduleToUpdate);
};
const deleteSched = ({ commit }, code) => {
  commit("mutateDeleteSchedule", code);
};
const createParticipant = ({ commit }, newParticipant) => {
  commit("mutateCreateParticipant", newParticipant);
};
const updateParticipant = ({ commit }, participantToUpdate) => {
  commit("mutateUpdateParticipant", participantToUpdate);
};
const addParticipantToAppointment = ({ commit }, participantToAdd) => {
  commit("mutateAddParticipantToAppointment", participantToAdd);
};
const deleteParticipantFromAppointment = ({ commit }, participantToDelete) => {
  commit("mutateDeleteParticipantFromAppointment", participantToDelete);
};
const deleteParticipant = ({ commit }, participantToDelete) => {
  commit("mutateDeleteParticipant", participantToDelete);
};
export default {
  addSchedule,
  modifySchedule,
  deleteSched,
  createParticipant,
  updateParticipant,
  addParticipantToAppointment,
  deleteParticipantFromAppointment,
  deleteParticipant
};
