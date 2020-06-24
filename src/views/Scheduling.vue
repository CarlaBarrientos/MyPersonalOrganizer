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
              <v-btn @click="deleteSchedule(appointment.code)">Delete</v-btn>
              <v-btn>Update</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <CreateScheduleDialog v-model="showCreateDialog" />
  </div>
</template>

<script>
import CreateScheduleDialog from "../components/CreateScheduleDialog.vue";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "Scheduling",
  data() {
    return {
      code: "6",
      name: "",
      description: "",
      date: "",
      startHour: "",
      endHour: "",
      agendaId: "",
      participants: [],
      agendaStartHour: "",
      agendaEndHour: "",
      showCreateDialog: false
    };
  },

  components: {
    CreateScheduleDialog
  },

  computed: {
    ...mapGetters(["getScheduledList"]),
    scheduled() {
      return this.getScheduledList;
    }
  },

  methods: {
    ...mapActions(["modifySchedule", "deleteSched"]),
    updateSchedule() {
      if (this._validateData() && this._validateHoursRange()) {
        this.modifySchedule({
          code: this.code,
          name: this.name,
          description: this.description,
          date: this.date,
          startHour: this.startHour,
          endHour: this.endHour,
          agendaId: this.agendaId
        });
      }
    },
    deleteSchedule(codeToDelete) {
      if (this._validateDate()) {
        this.deleteSched(codeToDelete);
      }
    },
    _validateData() {
      console.log("aqui");
      return (
        this.code !== "" &&
        this.name !== "" &&
        this.description !== "" &&
        this.date !== "" &&
        this.startHour !== "" &&
        this.endHour !== "" &&
        this.agendaId !== ""
      );
    },
    _validateHoursRange() {
      const startAgenda = parseInt(this.agendaStartHour.split(":")[0]);
      const endAgenda = parseInt(this.agendaEndHour.split(":")[0]);
      const startAppointment = parseInt(this.startHour.split(":")[0]);
      const endAppointment = parseInt(this.endHour.split(":")[0]);
      return (
        startAppointment >= startAgenda &&
        startAppointment < endAgenda &&
        endAppointment > startAgenda &&
        endAppointment <= endAgenda
      );
    },
    _validateDate(appointmentDate) {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();

      const currentDate = `${yyyy}-${mm}-${dd}`;

      return appointmentDate !== currentDate;
    }
  }
};
</script>
