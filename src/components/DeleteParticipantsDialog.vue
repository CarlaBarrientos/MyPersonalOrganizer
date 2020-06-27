<template>
  <div>
    <v-dialog persistent max-width="600px" v-model="dialog">
      <v-card>
        <v-card-text>
          <span class="headline"
            >Are you sure you want to delete {{ name }}?</span
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
            @click="removeParticipant(participantId)"
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
    ...mapActions(["deleteParticipant"]),
    removeParticipant(participantId) {
      var onAppointment = false;
      this.allAppointments.forEach(appointment => {
        appointment.participants.forEach(participant => {
          if (participant.participantId === participantId) {
            onAppointment = true;
          }
        });
      });
      if (!onAppointment) {
        if (this._participantExists(participantId)) {
          this.participants.forEach(participant => {
            if (participant.participantId === participantId) {
              this.deleteParticipant({
                participantId: participant.participantId,
                name: participant.name,
                contactNumber: participant.contactNumber
              });
            }
          });
          this.dialog = false;
        } else {
          alert("Invalid Participant Id");
        }
      } else {
        alert("Cant Delete, First Remove Participant from all Appointments");
      }
    },
    _participantExists(participantId) {
      let exists = false;
      if (participantId !== "") {
        this.participants.forEach(participant => {
          if (participant.participantId === participantId) {
            exists = true;
          }
        });
      }
      return exists;
    },
    setId(participantId) {
      this.participantId = participantId;
      this.participants.forEach(participant => {
        if (participant.participantId === participantId) {
          this.name = participant.name;
        }
      });
    }
  }
};
</script>
