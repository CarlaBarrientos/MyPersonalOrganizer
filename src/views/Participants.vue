<template>
  <v-container md auto class="my-10" grid-list-md>
    <H1>Participants</H1>
    <v-card
      flat
      class="pa3"
      v-for="participant in participants"
      :key="participant.participantId"
    >
      <v-layout row wrap justify-center>
        <v-flex xs1 md1>
          <div class>
            <div class="caption.grey--text">ID</div>
            <v-chip outlined small color="orange" text-color="orange">
              {{ participant.participantId }}
              <v-icon right>mdi-account-outline</v-icon>
            </v-chip>
          </div>
        </v-flex>
        <v-flex xs2 sm2>
          <div class="caption.grey--text">Name</div>
          <div>{{ participant.name }}</div>
        </v-flex>
        <v-flex xs2 sm2>
          <div class="caption.grey--text">Contact Number</div>
          <div>{{ participant.contactNumber }}</div>
        </v-flex>
        <v-flex xs1 md1>
          <div>
            <v-chip
              @click="removeParticipant"
              color="amber accent-2"
              text-color="white"
            >
              Update
            </v-chip>
          </div>
        </v-flex>
        <v-flex xs1 md1>
          <div>
            <v-chip @click="removeParticipant" color="red" text-color="white">
              <v-icon right>mdi-delete</v-icon>
            </v-chip>
          </div>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card>
  </v-container>
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
