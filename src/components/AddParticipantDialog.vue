<template>
  <div>
    <v-dialog persistent max-width="600px" v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">Participant List</span>
        </v-card-title>
        <v-card-text>
          <v-card
            hover
            class="pa3"
            v-for="participant in filteredParticipants()"
            :key="participant.participantId"
          >
            <v-layout row wrap justify-space-around>
              <v-flex xs5 md5>
                <div class>
                  <div class="caption.grey--text">Name</div>
                  <v-chip outlined color="black" text-color="black">
                    {{ participant.name }}
                    <v-icon right>mdi-account-outline</v-icon>
                  </v-chip>
                </div>
              </v-flex>
              <v-flex xs1 md1>
                <div>
                  <v-btn
                    x-large
                    icon
                    @click="
                      pushParticipantToAppointment(participant.participantId)
                    "
                    color="green"
                  >
                    <v-icon>mdi-account-plus</v-icon>
                  </v-btn>
                </div>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </v-card>
          <div v-if="filteredParticipants().length <= 0" class="grey--text">
            No more Available Participants, Do you Want to Create One?
            <v-btn
              color="blue darken-1"
              text
              @click.stop="showCreateDialog = true"
              >Yes</v-btn
            >
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.stop="dialog = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <CreateParticipantsDialog v-model="showCreateDialog" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import CreateParticipantsDialog from "../components/CreateParticipantsDialog.vue";

export default {
  name: "UpdateParticipantsDialog",
  data() {
    return {
      participantId: "",
      showCreateDialog: false,
      name: "",
      contactNumber: ""
    };
  },
  components: {
    CreateParticipantsDialog
  },
  props: {
    value: Boolean
  },
  computed: {
    ...mapGetters(["getParticipantsList"]),
    ...mapGetters(["getScheduledList"]),
    ...mapGetters(["getAllAppointmentsList"]),
    allAppointments() {
      return this.getAllAppointmentsList;
    },
    scheduled() {
      return this.getScheduledList;
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
    ...mapActions(["addParticipantToAppointment"]),
    pushParticipantToAppointment(participantId) {
      if (this._participantExists(participantId)) {
        this.participants.forEach(participant => {
          if (participant.participantId === participantId) {
            this.addParticipantToAppointment({
              appointmentCode: this.code,
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
    _setCode(code) {
      this.code = code;
    },
    filteredParticipants() {
      let founded = [];
      let filtered = [];
      this.allAppointments.forEach(appointment => {
        if (appointment.code === this.code) {
          founded = appointment.participants;
        }
      });
      this.participants.forEach(participant => {
        let exists = false;
        founded.forEach(found => {
          if (participant.participantId === found.participantId) {
            exists = true;
          }
        });
        if (!exists) {
          filtered.push(participant);
        }
      });
      return filtered;
    }
  }
};
</script>
