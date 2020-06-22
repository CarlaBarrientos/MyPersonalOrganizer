export default {
  addSchedule({ commit }, newSchedule) {
    commit("mutateAddSchedule", newSchedule);
  }
};
