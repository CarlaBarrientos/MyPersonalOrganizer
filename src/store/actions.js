"use strict";
const addAgenda = ({ commit }, newAgenda) => {
  commit("mutateAddAgenda", newAgenda);
};
const modifyAgenda = ({ commit }, agendaToUpdate) => {
  commit("mutateModifyAgenda", agendaToUpdate);
};
const deleteAgenda = ({ commit }, code) => {
  commit("mutateDeleteAgenda", code);
};
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
const addPpdAppointment = ({ commit }, newppdAppointment) => {
  commit("mutatePostponeAppointment", newppdAppointment);
};
const modifyPpdAppointment = ({ commit }, appointmentToUpdate) => {
  commit("mutateModifyPpdAppointment", appointmentToUpdate);
};
const deletePpdAppointment = ({ commit }, code) => {
  commit("mutateDeletePpdAppointment", code);
};
const addRecursive = ({ commit }, newRecursive) => {
  commit("mutateAddRecursive", newRecursive);
};
const modifyRecursive = ({ commit }, recursiveToUpdate) => {
  commit("mutateModifyRecursive", recursiveToUpdate);
};
const deleteRecursive = ({ commit }, code) => {
  commit("mutateDeleteRecursive", code);
};
export default {
  addAgenda,
  modifyAgenda,
  deleteAgenda,
  addSchedule,
  modifySchedule,
  deleteSched,
  createParticipant,
  updateParticipant,
  addParticipantToAppointment,
  deleteParticipantFromAppointment,
  deleteParticipant,
  addPpdAppointment,
  modifyPpdAppointment,
  deletePpdAppointment,
  addRecursive,
  modifyRecursive,
  deleteRecursive
};
