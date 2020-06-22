export default {
  addSchedule({ commit }, newSchedule) {
    commit("mutateAddSchedule", newSchedule);
  },
  modifySchedule({ commit }, scheduleToUpdate) {
    commit("mutateModifySchedule", scheduleToUpdate);
  },
  deleteSched({ commit }, code) {
    commit("mutateDeleteSchedule", code);
  }
};
