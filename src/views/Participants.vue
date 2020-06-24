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
    _validateFields() {
      return this.name !== "" && this.contactNumber !== "";
    },
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
      if (this._validateFields()) {
        this.updateParticipant({
          participantId: this.participantId,
          name: this.name,
          contactNumber: this.contactNumber
        });
      } else {
        alert("Verify Input Fields");
      }
    },
    pushParticipantToAppointment() {
      if (this._validateFields()) {
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
        alert("Verify Input Fields");
      }
    },
    removeParticipantFromAppointment() {
      if (this._validateFields()) {
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
        alert("Verify Input Fields");
      }
    },
    _calculateID() {
      return "PART-" + this.participants.length.toString();
    },
    _appointmentExists() {
      let exists = false;
      this.allAppointments.forEach(appointment => {
        if (appointment.code === this.appointmentCode) {
          exists = true;
        }
      });
      return exists;
    }
  }
};
</script>
