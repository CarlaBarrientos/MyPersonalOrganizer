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
      participantId: ""
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
    _calculateID() {
      return "PART-" + this.participants.length.toString();
    }
  }
};
</script>
