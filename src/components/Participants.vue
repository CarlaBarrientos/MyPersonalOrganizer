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
    participants() {
      return this.getParticipantsList;
    }
  },
  methods: {
    ...mapActions(["createParticipant"]),
    ...mapActions(["updateParticipant"]),
    ...mapActions(["addParticipant"]),
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
    addParticipantToAppointment() {
      if (this._validateFields()) {
        this.participants.forEach(participant => {
          if (participant.participantId === this.participantId) {
            this.addParticipant({
              appointmentCode: this.appointmentCode,
              participantId: participant.participantId,
              name: participant.name,
              contactNumber: participant.contactNumber
            });
          }
        });
      } else {
        alert("Verify Input Fields");
      }
    },
    _calculateID() {
      return "PART-" + this.participants.length.toString();
    }
  }
};
</script>
