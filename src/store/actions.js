export default {
  addPpdAppointment({ commit }, newppdAppointment) {
    commit("mutatePostponeAppointment", newppdAppointment);
  },
  modifyPpdAppointment({ commit }, appointmentToUpdate) {
    commit("mutateModifyPpdAppointment", appointmentToUpdate);
  },
  deletePpdAppointment({ commit }, code) {
    commit("mutateDeletePpdAppointment", code);
  }
};
