/* eslint-disable prettier/prettier */
<template>
  <div>
    <v-container class="my-10" grid-list-md>
      <H1>Scheduled Appointments/Meetings</H1>
      <br />
      <v-layout row wrap>
        <v-flex md3 class="pl-5">
          <v-menu :close-on-content-click="true" width="60">
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="date"
                label="Date"
                prepend-icon="mdi-calendar-range"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex md3 class="pl-5 pt-4">
          <v-btn
            long
            outlined
            class="text-capitalize"
            color="blue-grey darken-2"
            width="150px"
            @click.stop="showCreateDialog = true"
          >
            <v-icon left small>mdi-plus-circle-outline</v-icon>
            <span class="caption">Add New</span>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-space-around>
        <v-flex
          v-for="appointment in filteredAppointments"
          :key="appointment.code"
        >
          <v-card class="mx-auto" max-width="344">
            <v-card-title>
              <div class="subheading">{{ appointment.name }}</div>
            </v-card-title>
            <v-card-text>
              <div class="grey--text">
                Description: {{ appointment.description }}
              </div>
              <div class="grey--text">Date: {{ appointment.date }}</div>
              <div class="grey--text">
                Start hour: {{ appointment.startHour }}
              </div>
              <div class="grey--text">End hour: {{ appointment.endHour }}</div>
              <div class="grey--text">Agenda: {{ appointment.agendaId }}</div>
              <div class="grey--text">
                Participants:
              </div>
              <div
                v-for="participant in participantsOnAppointment(
                  appointment.code
                )"
                :key="participant.participantId"
              >
                <v-chip small outlined color="black" text-color="black">
                  {{ participant.name }}
                </v-chip>
                <v-btn
                  icon
                  color="red"
                  @click="
                    deleteParticipantDialog({
                      code: appointment.code,
                      participantId: participant.participantId
                    });
                    showDeleteParticipantDialog = true;
                  "
                >
                  <v-icon>mdi-account-remove</v-icon>
                </v-btn>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-layout row wrap justify-space-around class="pb-3">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      fab
                      depressed
                      dark
                      color="red"
                      @click.stop="
                        deleteDialog(appointment.code);
                        showDeleteDialog = true;
                      "
                      v-on="on"
                    >
                      <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Delete</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      fab
                      depressed
                      dark
                      color="indigo"
                      @click.stop="
                        updateDialog(appointment.code);
                        showUpdateDialog = true;
                      "
                      v-on="on"
                    >
                      <v-icon>mdi-pencil-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Update</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      fab
                      depressed
                      dark
                      color="blue-grey"
                      @click.stop="
                        postponeAppointmentDialog(appointment.code);
                        showPostponeDialog = true;
                      "
                      v-on="on"
                    >
                      <v-icon>mdi-calendar-remove-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Postpone</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      fab
                      depressed
                      dark
                      color="deep-purple"
                      @click.stop="
                        addDialog(appointment.code);
                        showAddParticipantDialog = true;
                      "
                      v-on="on"
                    >
                      <v-icon>mdi-account-multiple-plus-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Add participant</span>
                </v-tooltip>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <CreateScheduleDialog v-model="showCreateDialog" />
    <DeleteScheduleDialog
      ref="DeleteScheduleDialog"
      v-model="showDeleteDialog"
    />
    <UpdateScheduleDialog
      ref="UpdateScheduleDialog"
      v-model="showUpdateDialog"
    />
    <PostponeDialog ref="PostponeDialog" v-model="showPostponeDialog" />
    <AddParticipantDialog
      ref="AddParticipantDialog"
      v-model="showAddParticipantDialog"
    />
    <DeleteParticipantsFromAppointment
      ref="DeleteParticipantsFromAppointment"
      v-model="showDeleteParticipantDialog"
    />
  </div>
</template>

<script>
import CreateScheduleDialog from "../components/CreateScheduleDialog.vue";
import DeleteScheduleDialog from "../components/DeleteScheduleDialog.vue";
import UpdateScheduleDialog from "../components/UpdateScheduleDialog.vue";
import PostponeDialog from "../components/PostponeAppointmentDialog.vue";
import AddParticipantDialog from "../components/AddParticipantDialog.vue";
import DeleteParticipantsFromAppointment from "../components/DeleteParticipantsFromAppointment.vue";

import { mapGetters } from "vuex";

export default {
  name: "Scheduling",
  data() {
    return {
      showCreateDialog: false,
      showDeleteDialog: false,
      showUpdateDialog: false,
      showPostponeDialog: false,
      showAddParticipantDialog: false,
      showDeleteParticipantDialog: false,
      date: this.currentDate()
    };
  },

  components: {
    CreateScheduleDialog,
    DeleteScheduleDialog,
    UpdateScheduleDialog,
    AddParticipantDialog,
    DeleteParticipantsFromAppointment,
    PostponeDialog
  },

  computed: {
    ...mapGetters(["getScheduledList"]),
    ...mapGetters(["getParticipantsList"]),
    participants() {
      return this.getParticipantsList;
    },
    scheduled() {
      return this.getScheduledList;
    },
    filteredAppointments() {
      const filteredList = this.scheduled.filter(
        appointment => appointment.date === this.date
      );
      const orderedList = filteredList.sort(function(
        appointment1,
        appointment2
      ) {
        const hour1 = parseFloat(appointment1.startHour.replace(":", "."));
        const hour2 = parseFloat(appointment2.startHour.replace(":", "."));
        if (hour1 < hour2) return -1;
        if (hour1 > hour2) return 1;
        return 0;
      });
      return orderedList;
    }
  },

  methods: {
    participantsOnAppointment(appointmentCode) {
      let foundParticipants = [];
      this.scheduled.forEach(appointment => {
        if (appointment.code === appointmentCode) {
          foundParticipants = appointment.participants;
        }
      });
      return foundParticipants;
    },
    addDialog(code) {
      this.$refs.AddParticipantDialog._setCode(code);
    },
    updateDialog(code) {
      this.$refs.UpdateScheduleDialog._setCode(code);
    },
    deleteDialog(code) {
      this.$refs.DeleteScheduleDialog._setCode(code);
    },
    deleteParticipantDialog(data) {
      this.$refs.DeleteParticipantsFromAppointment.setData(data);
    },
    postponeAppointmentDialog(code) {
      this.$refs.PostponeDialog._setCode(code);
    },
    currentDate() {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();

      const currentDate = `${yyyy}-${mm}-${dd}`;

      return currentDate;
    }
  }
};
</script>
