<template>
  <div>
    <v-dialog persistent max-width="600px" v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">Update {{ getName() }} appointment</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="name" label="Name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="description"
                  label="Description"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-menu :close-on-content-click="true" width="30">
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
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="startHour"
                  label="Start Hour"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="endHour" label="End Hour"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="agendas"
                  label="Select an Agenda"
                  v-model="agendaName"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.stop="dialog = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="updateSchedule()"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "CreateScheduleDialog",
  data() {
    return {
      code: "",
      name: "",
      description: "",
      date: "",
      startHour: "",
      endHour: "",
      agendaName: "",
      participants: [],
      agendaStartHour: "",
      agendaEndHour: ""
    };
  },
  props: {
    value: Boolean
  },
  computed: {
    ...mapGetters(["getScheduledList", "getAgendas"]),
    scheduled() {
      return this.getScheduledList;
    },
    agendas() {
      const agendasArray = [];

      for (let i = 0; i < this.getAgendas.length; i++) {
        agendasArray.push(this.getAgendas[i].name);
      }
      return agendasArray;
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
    ...mapActions(["modifySchedule"]),
    updateSchedule() {
      if (this._validateData()) {
        if (this._validateHoursRange()) {
          this.modifySchedule({
            code: this.code,
            name: this.name,
            description: this.description,
            date: this.date,
            startHour: this.startHour,
            endHour: this.endHour,
            agendaId: this.getAgendas.find(
              agenda => agenda.name === this.agendaName
            ).agendaId,
            participants: this.participants
          });
          this.dialog = false;
          this.name = "";
          this.description = "";
          this.date = "";
          this.startHour = "";
          this.endHour = "";
        } else {
          alert(
            "The start/end hour should be between the hours range of the Agenda."
          );
        }
      } else {
        alert("All fields must be filled!");
      }
    },
    _validateData() {
      return (
        this.name != "" &&
        this.description != "" &&
        this.date != "" &&
        this.startHour != "" &&
        this.endHour != "" &&
        this.agendaName != ""
      );
    },
    _validateHoursRange() {
      this.agendaStartHour = this.getAgendas.find(
        agenda => agenda.name === this.agendaName
      ).startHour;
      this.agendaEndHour = this.getAgendas.find(
        agenda => agenda.name === this.agendaName
      ).endHour;
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
    _setCode(code) {
      this.code = code;
      const appointment = this.scheduled.find(
        sched => sched.code === this.code
      );
      if (appointment !== undefined) {
        this.name = appointment.name;
        this.description = appointment.description;
        this.date = appointment.date;
        this.startHour = appointment.startHour;
        this.endHour = appointment.endHour;
        this.agendaName = this.agendas[
          this._getAgendaIndex(appointment.agendaId)
        ];
        this.participants = appointment.participants;
      }
    },
    _getAgendaIndex(code) {
      const selectedAgenda = this.getAgendas.find(
        agenda => agenda.agendaId === code
      ).name;
      const index = this.agendas.indexOf(selectedAgenda);
      if (index > -1) {
        return index;
      }
    },
    getName() {
      if (this.code !== "") {
        const appointment = this.scheduled.find(
          sched => sched.code === this.code
        );
        if (appointment !== undefined) {
          return appointment.name;
        }
      }
    }
  }
};
</script>
