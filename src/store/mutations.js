"use strict";
//Agendas commits
const mutateAddAgenda = (state, newAgenda) => {
  state.agendas.push(newAgenda);
};
const mutateModifyAgenda = (state, agendaToUpdate) => {
  const indexToUpdate = state.agendas.findIndex(
    agenda => agenda.code === agendaToUpdate.code
  );
  if (indexToUpdate > -1) {
    state.agendas.splice(indexToUpdate, 1, agendaToUpdate);
  }
};
const mutateDeleteAgenda = (state, code) => {
  const indexToDelete = state.agendas.findIndex(
    agenda => agenda.agendaId === code
  );
  if (indexToDelete > -1) {
    state.agendas = state.agendas.filter(agenda => agenda.agendaId !== code);
  }
};
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
const mutateDeleteAppointmentFromAgenda = (state, appointmentCode) => {
  const indexAppointment = state.scheduledAppointments.findIndex(
    appointment => appointment.code === appointmentCode
  );

  const agendaId = state.scheduledAppointments[indexAppointment].agendaId;
  const agendaIndex = state.agendas.findIndex(
    agenda => agenda.agendaId === agendaId
  );
  state.agendas[agendaIndex].appointments = state.agendas[
    agendaIndex
  ].appointments.filter(appointment => appointment.code !== appointmentCode);
};
const mutateUpdateAppointmentFromAgenda = (state, appointmetToUpdate) => {
  const agendaIndex = state.agendas.findIndex(
    agenda => agenda.agendaId === appointmetToUpdate.agendaId
  );
  const indexToUpdate = state.agendas[agendaIndex].appointments.findIndex(
    appointment => appointment.code === appointmetToUpdate.code
  );
  if (indexToUpdate > -1) {
    state.agendas[agendaIndex].appointments.splice(
      indexToUpdate,
      1,
      appointmetToUpdate
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
const mutateAddAppointment = (state, newAppointment) => {
  const agendaIndex = state.agendas.findIndex(
    agenda => agenda.agendaId === newAppointment.agendaId
  );
  state.agendas[agendaIndex].appointments.push(newAppointment);
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
const mutateDeleteParticipantFromAppointment = (state, participantAndCode) => {
  let allAppointments = state.scheduledAppointments.concat(
    state.recursiveAppointments
  );
  let indexOfItem;
  let participantDelete;
  allAppointments.forEach(appointment => {
    if (appointment.code === participantAndCode.appointmentCode) {
      appointment.participants.forEach(participant => {
        if (participantAndCode.participantId === participant.participantId)
          participantDelete = participant;
      });
      indexOfItem = appointment.participants.indexOf(participantDelete);
      appointment.participants.splice(indexOfItem, 1);
    }
  });
};
const mutateDeleteParticipant = (state, participantToDelete) => {
  var indexOfItem;
  state.participants.forEach(participant => {
    if (participant.participantId === participantToDelete.participantId) {
      indexOfItem = state.participants.indexOf(participant);
      state.participants.splice(indexOfItem, 1);
    }
  });
};

//Recursive Appointments
const mutateAddRecursive = (state, newRecursive) => {
  state.recursiveAppointments.push(newRecursive);
};
const mutateModifyRecursive = (state, recursiveToUpdate) => {
  const indexToUpdate = state.recursiveAppointments.findIndex(
    recursive => recursive.code === recursiveToUpdate.code
  );
  if (indexToUpdate > -1) {
    state.recursiveAppointments.splice(indexToUpdate, 1, recursiveToUpdate);
  }
};
const mutateDeleteRecursive = (state, code) => {
  const indexToDelete = state.recursiveAppointments.findIndex(
    schedule => schedule.code === code
  );
  if (indexToDelete > -1) {
    state.recursiveAppointments = state.recursiveAppointments.filter(
      recursive => recursive.code !== code
    );
  }
};
export default {
  mutateAddAgenda,
  mutateModifyAgenda,
  mutateDeleteAgenda,
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
  mutateDeleteParticipant,
  mutateAddRecursive,
  mutateModifyRecursive,
  mutateDeleteRecursive,
  mutateAddAppointment,
  mutateDeleteAppointmentFromAgenda,
  mutateUpdateAppointmentFromAgenda
};
