/* eslint-disable prettier/prettier */
<template>
  <div>
    <v-container class="my-10" grid-list-md>
      <H1>Appointments/Meetings</H1>
      <br />
      <v-btn
        long
        depressed
        color="#F2F2F2"
        width="150px"
        @click.stop="showCreateDialog = true"
      >
        <v-icon left small>mdi-plus-circle-outline</v-icon>
        <span class="caption text-lowercase">Add New</span>
      </v-btn>
      <v-layout row wrap>
        <v-flex v-for="appointment in scheduled" :key="appointment.code">
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
            </v-card-text>
            <v-card-actions>
              <v-layout row wrap justify-space-around class="pb-3">
                <v-btn
                  @click.stop="
                    deleteDialog(appointment.code);
                    showDeleteDialog = true;
                  "
                >
                  <v-icon>mdi-trash-can-outline</v-icon>
                  <span>Delete</span>
                </v-btn>
                <v-btn
                  @click.stop="
                    updateDialog(appointment.code);
                    showUpdateDialog = true;
                  "
                >
                  <v-icon>mdi-pencil-outline</v-icon>
                  <span>Update</span>
                </v-btn>
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
  </div>
</template>

<script>
import CreateScheduleDialog from "../components/CreateScheduleDialog.vue";
import DeleteScheduleDialog from "../components/DeleteScheduleDialog.vue";
import UpdateScheduleDialog from "../components/UpdateScheduleDialog.vue";

import { mapGetters } from "vuex";

export default {
  name: "Scheduling",
  data() {
    return {
      showCreateDialog: false,
      showDeleteDialog: false,
      showUpdateDialog: false
    };
  },

  components: {
    CreateScheduleDialog,
    DeleteScheduleDialog,
    UpdateScheduleDialog
  },

  computed: {
    ...mapGetters(["getScheduledList"]),
    scheduled() {
      return this.getScheduledList;
    }
  },

  methods: {
    updateDialog(code) {
      this.$refs.UpdateScheduleDialog._setCode(code);
    },
    deleteDialog(code) {
      this.$refs.DeleteScheduleDialog._setCode(code);
    }
  }
};
</script>
