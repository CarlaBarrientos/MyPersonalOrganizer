<template>
  <div>
    <v-dialog persistent max-width="600px" v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">Enable Appointment</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  disabled
                  label="Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="description"
                  disabled
                  label="Description"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-menu ref="menu1" :close-on-content-click="true">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="date"
                      label="Date"
                      prepend-icon="mdi-calendar-range"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    no-title
                    @input="menu1 = true"
                    v-model="date"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="startHour"
                  label="Start Hour"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="endHour" label="End Hour"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="agendas"
                  label="Select an Agenda"
                  v-model="agendaId"
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
          <v-btn color="blue darken-1" text @click="addNewSchedule()"
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
  name: "EnablePpdAppointmentDialog",
  data() {
    return {
      code: "",
      name: "",
      description: "",
      date: "",
      startHour: "",
      endHour: "",
      agendaId: "1",
      participants: [],
      agendaStartHour: "11:00",
      agendaEndHour: "17:00",
      agendas: ["ANG-001", "ANG-002", "ANG-003"]
    };
  },
  props: {
    value: Boolean
  },
  computed: {
    ...mapGetters(["getPpdAppointmentsList"]),
    postponed() {
      return this.getPpdAppointmentsList;
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
    ...mapActions(["addSchedule"]),
    ...mapActions(["deletePpdAppointment"]),
    addNewSchedule() {
      if (this._validateData()) {
        if (this._validateHoursRange()) {
          this.addSchedule({
            code: this.code,
            name: this.name,
            description: this.description,
            date: this.date,
            startHour: this.startHour,
            endHour: this.endHour,
            agendaId: this.agendaId
          });
          this.deletePpdAppointment(this.code);
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
        this.agendaId != ""
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
    _setCode(code) {
      this.code = code;
      const appointment = this.postponed.find(
        sched => sched.code === this.code
      );
      if (appointment !== undefined) {
        this.name = appointment.name;
        this.description = appointment.description;
      }
    }
  }
};
</script>
