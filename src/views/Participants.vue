<template>
  <div>
    <v-container md auto class="my-10" grid-list-md>
      <H1>Participants List</H1>
      <v-flex md3 class="pl-0 pt-0">
        <v-btn
          long
          class="text-capitalize"
          color="green"
          width="150px"
          @click.stop="showCreateDialog = true"
        >
          <v-icon left small>mdi-plus-circle-outline</v-icon>
          <span class="caption">Add New</span>
        </v-btn>
      </v-flex>
      <v-card
        hover
        class="pa3"
        v-for="participant in participants"
        :key="participant.participantId"
      >
        <v-layout row wrap justify-space-around>
          <v-flex xs2 md2>
            <div class>
              <div class="caption.grey--text">ID</div>
              <v-chip outlined small color="black" text-color="black">
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
              <v-btn
                icon
                @click="
                  updateDialog(participant.participantId);
                  showUpdateDialog = true;
                "
                color="amber accent-2"
              >
                <v-icon>mdi-pencil-outline</v-icon>
              </v-btn>
            </div>
          </v-flex>
          <v-flex xs1 md1>
            <div>
              <v-btn
                icon
                color="red"
                @click.stop="
                  deleteDialog(participant.participantId);
                  showDeleteDialog = true;
                "
              >
                <v-icon right>mdi-trash-can-outline</v-icon>
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
    <CreateParticipantsDialog v-model="showCreateDialog" />
    <DeleteParticipantsDialog
      ref="DeleteParticipantsDialog"
      v-model="showDeleteDialog"
    />
    <UpdateParticipantsDialog
      ref="UpdateParticipantsDialog"
      v-model="showUpdateDialog"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CreateParticipantsDialog from "../components/CreateParticipantsDialog.vue";
import DeleteParticipantsDialog from "../components/DeleteParticipantsDialog.vue";
import UpdateParticipantsDialog from "../components/UpdateParticipantsDialog.vue";
export default {
  name: "Participants",
  data() {
    return {
      showCreateDialog: false,
      showDeleteDialog: false,
      showUpdateDialog: false,
      name: "",
      contactNumber: "",
      participantId: "",
      appointmentCode: ""
    };
  },
  components: {
    CreateParticipantsDialog,
    DeleteParticipantsDialog,
    UpdateParticipantsDialog
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
    updateDialog(participantId) {
      this.$refs.UpdateParticipantsDialog.setId(participantId);
    },
    deleteDialog(participantId) {
      this.$refs.DeleteParticipantsDialog.setId(participantId);
    }
  }
};
</script>
