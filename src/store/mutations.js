"use strict";
const mutateAddSchedule = (state, newSchedule) => {
  state.scheduledAppointments.push(newSchedule);
};
const mutateModifySchedule = (state, scheduleToUpdate) => {
  const indexToUpdate = state.scheduledAppointments.findIndex(
    schedule => schedule.code === scheduleToUpdate.code
  );
  if (indexToUpdate > -1) {
    state.scheduledAppointments.splice(indexToUpdate, 1, scheduleToUpdate);
  }
};
const mutateDeleteSchedule = (state, code) => {
  const indexToDelete = state.scheduledAppointments.findIndex(
    schedule => schedule.code === code
  );
  if (indexToDelete > -1) {
    state.scheduledAppointments = state.scheduledAppointments.filter(
      schedule => schedule.code !== code
    );
  }
};
export default {
  mutateAddSchedule,
  mutateModifySchedule,
  mutateDeleteSchedule
};
