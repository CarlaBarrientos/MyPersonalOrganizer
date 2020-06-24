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
export default {
  addSchedule,
  modifySchedule,
  deleteSched
};
