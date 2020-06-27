<template>
  <div>
    <v-dialog persistent max-width="600px" v-model="dialog">
      <v-card>
        <v-card-text>
          <span class="headline"
            >Are you Sure you Want to Remove {{ name }} from Appointment?</span
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.stop="dialog = false"
            >Cancel</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            @click="removeParticipantFromAppointment(participantId, code)"
            >Yes</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DeleteParticipantsDialog",
  data() {
    return {
      code: "",
      participantId: "",
      name: "",
      contactNumber: ""
    };
  },
  props: {
    value: Boolean
  },
  computed: {
    ...mapGetters(["getParticipantsList"]),
    ...mapGetters(["getAllAppointmentsList"]),
    allAppointments() {
      return this.getAllAppointmentsList;
    },
    participants() {
      return this.getParticipantsList;
    },
    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    ...mapActions(["deleteParticipantFromAppointment"]),
    removeParticipantFromAppointment(participantId, code) {
      this.participants.forEach(participant => {
        if (participant.participantId === participantId) {
          this.deleteParticipantFromAppointment({
            appointmentCode: code,
            participantId: participantId,
            name: participant.name,
            contactNumber: participant.contactNumber
          });
        }
      });
      this.dialog = false;
    },
    setData(data) {
      this.code = data.code;
      this.participantId = data.participantId;
      this.participants.forEach(participant => {
        if (participant.participantId === data.participantId) {
          this.name = participant.name;
        }
      });
    }
  }
};
</script>
