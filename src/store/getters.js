"use strict";
const getScheduledList = state => {
  return state.scheduledAppointments;
};
const getParticipantsList = state => {
  return state.participants;
};
const getAllAppointmentsList = state => {
  return state.scheduledAppointments.concat(state.recursiveAppointments);
};
const getPpdAppointmentsList = state => {
  return state.ppdAppointments;
};
export default {
  getScheduledList,
  getAllAppointmentsList,
  getParticipantsList
};
