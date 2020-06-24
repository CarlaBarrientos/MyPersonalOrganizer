<template>
  <div></div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Participants",
  data() {
    return {
      name: "",
      contactNumber: "",
      participantId: "",
      appointmentCode: ""
    };
  },
  computed: {
    ...mapGetters(["getParticipantsList"]),
    ...mapGetters(["getAllAppointmentsList"]),
    allAppointments() {
      return this.getAllAppointmentsList;
    },
    participants() {
      return this.getParticipantsList;
    }
  },
  methods: {
    ...mapActions(["createParticipant"]),
    ...mapActions(["updateParticipant"]),
    ...mapActions(["addParticipantToAppointment"]),
    ...mapActions(["deleteParticipantFromAppointment"]),
    ...mapActions(["deleteParticipant"]),
    createNewParticipant() {
      if (this._validateFields()) {
        this.createParticipant({
          participantId: this._calculateID(),
          name: this.name,
          contactNumber: this.contactNumber
        });
      } else {
        alert("Verify Input Fields");
      }
    },
    modifyParticipant() {
      if (this._participantExists()) {
        if (this._validateFields()) {
          this.updateParticipant({
            participantId: this.participantId,
            name: this.name,
            contactNumber: this.contactNumber
          });
        } else {
          alert("Verify Input Fields");
        }
      } else {
        alert("Invalid Participant Id");
      }
    },
    pushParticipantToAppointment() {
      if (this._participantExists()) {
        if (this._appointmentExists()) {
          this.participants.forEach(participant => {
            if (participant.participantId === this.participantId) {
              this.addParticipantToAppointment({
                appointmentCode: this.appointmentCode,
                participantId: participant.participantId,
                name: participant.name,
                contactNumber: participant.contactNumber
              });
            }
          });
        } else {
          alert("Invalid Appointment Code");
        }
      } else {
        alert("Invalid Participant Id");
      }
    },
    removeParticipantFromAppointment() {
      if (this._participantExists()) {
        if (this._appointmentExists()) {
          this.participants.forEach(participant => {
            if (participant.participantId === this.participantId) {
              this.deleteParticipantFromAppointment({
                appointmentCode: this.appointmentCode,
                participantId: participant.participantId,
                name: participant.name,
                contactNumber: participant.contactNumber
              });
            }
          });
        } else {
          alert("Invalid Appointment Code");
        }
      } else {
        alert("Invalid Participant Id");
      }
    },
    removeParticipant() {
      if (this._participantExists()) {
        this.participants.forEach(participant => {
          if (participant.participantId === this.participantId) {
            this.deleteParticipant({
              appointmentCode: this.appointmentCode,
              participantId: participant.participantId,
              name: participant.name,
              contactNumber: participant.contactNumber
            });
          }
        });
      } else {
        alert("Invalid Participant Id");
      }
    },
    _calculateID() {
      return "PART-" + this.participants.length.toString();
    },
    _validateFields() {
      return this.name !== "" && this.contactNumber !== "";
    },
    _participantExists() {
      let exists = false;
      if (this.participantId !== "") {
        this.participants.forEach(participant => {
          if (participant.participantId === this.participantId) {
            exists = true;
          }
        });
      }
      return exists;
    },
    _appointmentExists() {
      let exists = false;
      if (this.appointmentCode !== "") {
        this.allAppointments.forEach(appointment => {
          if (appointment.code === this.appointmentCode) {
            exists = true;
          }
        });
      }
      return exists;
    }
  }
};
</script>
