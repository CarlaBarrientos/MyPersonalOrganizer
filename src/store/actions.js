export default {
  addSchedule({ commit }, newSchedule) {
    commit("mutateAddSchedule", newSchedule);
  },
  modifySchedule({ commit }, scheduleToUpdate) {
    commit("mutateModifySchedule", scheduleToUpdate);
  }
};
