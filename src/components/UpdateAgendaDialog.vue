<template>
  <div>
    <v-dialog persistent max-width="600px" v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">Update {{ getName() }} Agenda</span>
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
              <v-col cols="3">
                <v-text-field
                  v-model="startHour"
                  label="Start Hour"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="endHour" label="End Hour"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.stop="dialog = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="updateAgenda()">Save</v-btn>
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
      name: "",
      description: "",
      startHour: "",
      endHour: "",
      agendaId: "",
      appointments: []
    };
  },
  props: {
    value: Boolean
  },
  computed: {
    ...mapGetters(["getAgendas"]),
    ...mapGetters(["getScheduledList"]),
    agendas() {
      return this.getAgendas;
    },
    scheduled() {
      return this.getScheduledList;
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
    ...mapActions(["modifyAgenda"]),
    updateAgenda() {
      if (this._validateData()) {
        if (this._validateHoursRange()) {
          if (!this.hasAppointments(this.agendaId)) {
            this.modifyAgenda({
              name: this.name,
              description: this.description,
              startHour: this.startHour,
              endHour: this.endHour,
              agendaId: this.agendaId,
              appointments: this.appointments
            });
            this.dialog = false;
            this.name = "";
            this.description = "";
            this.startHour = "";
            this.endHour = "";
          } else {
            alert("Cannot Edit this Agenda");
          }
        } else {
          alert("The End hour should be greater than the Start hour.");
        }
      } else {
        alert("All fields must be filled!");
      }
    },
    _validateData() {
      return (
        this.name != "" &&
        this.description != "" &&
        this.startHour != "" &&
        this.endHour != ""
      );
    },
    _validateHoursRange() {
      const startAgenda = parseInt(this.startHour.split(":")[0]);
      const endAgenda = parseInt(this.endHour.split(":")[0]);
      return startAgenda < endAgenda;
    },
    _setCode(agendaId) {
      this.agendaId = agendaId;
      const agenda = this.agendas.find(
        agend => agend.agendaId === this.agendaId
      );
      if (agenda !== undefined) {
        this.name = agenda.name;
        this.description = agenda.description;
        this.startHour = agenda.startHour;
        this.endHour = agenda.endHour;
        this.appointments = agenda.appointments;
      }
    },
    getName() {
      if (this.agendaId !== "") {
        const agenda = this.agendas.find(
          agend => agend.agendaId === this.agendaId
        );
        if (agenda !== undefined) {
          return agenda.name;
        }
      }
    },
    hasAppointments(agendaId) {
      const agenda = this.scheduled.find(sched => sched.agendaId === agendaId);
      if (agenda !== undefined) {
        return true;
      } else return false;
    }
  }
};
</script>
