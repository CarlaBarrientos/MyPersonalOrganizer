"use strict";
//Schedule Appointments
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
// Postponing Appointments
const mutatePostponeAppointment = (state, newPpdAppointments) => {
  state.postponedAppointments.push(newPpdAppointments);
};
const mutateModifyPpdAppointment = (state, appointmentToUpdate) => {
  const indexToUpdate = state.postponedAppointments.findIndex(
    appointment => appointment.code === appointmentToUpdate.code
  );
  if (indexToUpdate > -1) {
    state.postponedAppointments.splice(indexToUpdate, 1, appointmentToUpdate);
  }
};
const mutateDeletePpdAppointment = (state, code) => {
  const indexToDelete = state.postponedAppointments.findIndex(
    appointment => appointment.code === code
  );
  if (indexToDelete > -1) {
    state.postponedAppointments = state.postponedAppointments.filter(
      appointment => appointment.code !== code
    );
  }
};
// Participants
const mutateCreateParticipant = (state, newParticipant) => {
  state.participants.push(newParticipant);
};
const mutateUpdateParticipant = (state, participantToUpdate) => {
  var indexOfItem;
  state.participants.forEach(participant => {
    if (participant.participantId === participantToUpdate.participantId) {
      indexOfItem = state.participants.indexOf(participant);
      if (indexOfItem > -1) {
        state.participants.splice(indexOfItem, 1, participantToUpdate);
      }
    }
  });
};
const mutateAddParticipantToAppointment = (state, participantToAdd) => {
  const participant = {
    participantId: participantToAdd.participantId,
    name: participantToAdd.name,
    contactNumber: participantToAdd.contactNumber
  };
  let allAppointments = state.scheduledAppointments.concat(
    state.recursiveAppointments
  );
  allAppointments.forEach(appointment => {
    if (appointment.code === participantToAdd.appointmentCode) {
      appointment.participants.push(participant);
    }
  });
};
const mutateDeleteParticipantFromAppointment = (state, participantToDelete) => {
  const participant = {
    participantId: participantToDelete.participantId,
    name: participantToDelete.name,
    contactNumber: participantToDelete.contactNumber
  };
  let allAppointments = state.scheduledAppointments.concat(
    state.recursiveAppointments
  );
  var indexOfItem;
  allAppointments.forEach(appointment => {
    if (appointment.code === participantToDelete.appointmentCode) {
      indexOfItem = appointment.participants.indexOf(participant);
      appointment.participants.splice(indexOfItem, 1);
    }
  });
};
const mutateDeleteParticipant = (state, participantToDelete) => {
  let allAppointments = state.scheduledAppointments.concat(
    state.recursiveAppointments
  );
  var indexOfItem;
  var onAppointment = false;
  allAppointments.forEach(appointment => {
    appointment.participants.forEach(participant => {
      if (participant.participantId === participantToDelete.participantId) {
        onAppointment = true;
      }
    });
  });
  if (!onAppointment) {
    state.participants.forEach(participant => {
      if (participant.participantId === participantToDelete.participantId) {
        indexOfItem = state.participants.indexOf(participant);
        state.participants.splice(indexOfItem, 1);
      }
    });
  } else {
    alert("Cant Delete Participant, First Remove it from all Appointments");
  }
};
export default {
  mutateAddSchedule,
  mutateModifySchedule,
  mutateDeleteSchedule,
  mutatePostponeAppointment,
  mutateModifyPpdAppointment,
  mutateDeletePpdAppointment,
  mutateCreateParticipant,
  mutateUpdateParticipant,
  mutateAddParticipantToAppointment,
  mutateDeleteParticipantFromAppointment,
  mutateDeleteParticipant
};
