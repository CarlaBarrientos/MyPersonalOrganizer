<template>
  <div>
    <v-dialog persistent max-width="600px" v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">Add New Recursive Appointment</span>
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
                      :value="begindate"
                      label="Begin Date"
                      prepend-icon="mdi-calendar-range"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="begindate"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-menu :close-on-content-click="true" width="30">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="enddate"
                      label="End Date"
                      prepend-icon="mdi-calendar-range"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="enddate"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="3">
                <v-menu :close-on-content-click="false" width="30">
                  <template v-slot:activator="{ on }">
                    <v-row justify="center">
                      <v-col>
                        <v-text-field
                          readonly
                          v-model="startHour"
                          label="Start Hour"
                          v-on="on"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </template>
                  <v-time-picker
                    format="24hr"
                    v-model="startHour"
                    v-on="on"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="3">
                <v-menu :close-on-content-click="false" width="30">
                  <template v-slot:activator="{ on }">
                    <v-row justify="center">
                      <v-col>
                        <v-text-field
                          readonly
                          v-model="endHour"
                          label="End Hour"
                          v-on="on"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </template>
                  <v-time-picker
                    format="24hr"
                    v-model="endHour"
                    v-on="on"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="agendas"
                  label="Select an Agenda"
                  v-model="agendaName"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="repeat"
                  label="Select every when"
                  v-model="repeatId"
                ></v-select>
              </v-col>
              <v-col cols="12" v-if="repeatId === 'Weekly'">
                <v-select
                  :items="days"
                  label="Select the Day"
                  v-model="day"
                ></v-select>
              </v-col>
              <v-col cols="12" v-if="repeatId === 'Monthly'">
                <v-text-field
                  v-model="day"
                  label="Select the Day"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.stop="dialog = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="addNewRecursive()"
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
  name: "CreateRecursiveDialog",
  data() {
    return {
      on: "",
      name: "",
      code: "",
      description: "",
      begindate: "",
      enddate: "",
      startHour: "",
      endHour: "",
      agendaId: "",
      repeatId: "Daily",
      participants: [],
      agendaStartHour: "",
      agendaEndHour: "",
      agendaName: "",
      repeat: ["Daily", "Weekly", "Monthly"],
      day: "",
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      dates: []
    };
  },
  props: {
    value: Boolean
  },
  computed: {
    ...mapGetters(["getRecursiveList"]),
    ...mapGetters(["getScheduledList"]),
    ...mapGetters(["getAgendas"]),
    scheduled() {
      return this.getScheduledList;
    },
    recursive() {
      return this.getRecursiveList;
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
    ...mapActions(["addRecursive"]),
    ...mapActions(["addSchedule"]),
    addNewRecursive() {
      let self = this;
      let correctDate = function(date) {
        let d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-").toString();
      };
      if (this._validateData()) {
        if (this._validateHoursRange()) {
          this.agendaId = this.getAgendas.find(
            agenda => agenda.name === this.agendaName
          ).agendaId;
          let appointment = {
            code: this._selfGenerateCode(),
            name: this.name,
            description: this.description,
            begindate: this.begindate,
            enddate: this.enddate,
            startHour: this.startHour,
            endHour: this.endHour,
            agendaId: this.getAgendas.find(
              agenda => agenda.name === this.agendaName
            ).agendaId,
            time: this.repeatId,
            each: this.day,
            participants: []
          };
          this.addRecursive(appointment);
          if (this.repeatId === "Daily") {
            this.dates = this.obtainDates(
              new Date(this.begindate),
              new Date(this.enddate)
            );
            this.dates.forEach(function(date) {
              self.addSchedule({
                code: self._selfGenerateCodeSchedule(),
                name: self.name,
                description: self.description,
                date: date,
                startHour: self.startHour,
                endHour: self.endHour,
                agendaId: self.agendaId,
                participants: []
              });
            });
          }
          if (this.repeatId === "Weekly") {
            this.dates = this.obtainDatesWeek(
              new Date(this.begindate),
              new Date(this.enddate)
            );
            this.dates.forEach(function(date) {
              if (self.day.substring(0, 3) === date.substring(0, 3)) {
                self.addSchedule({
                  code: self._selfGenerateCodeSchedule(),
                  name: self.name,
                  description: self.description,
                  date: correctDate(date),
                  startHour: self.startHour,
                  endHour: self.endHour,
                  agendaId: self.agendaId,
                  participants: []
                });
              }
            });
          }
          if (this.repeatId === "Monthly") {
            this.dates = this.obtainDates(
              new Date(this.begindate),
              new Date(this.enddate)
            );
            this.dates.forEach(function(date) {
              if (self.day === date.slice(-2)) {
                self.addSchedule({
                  code: self._selfGenerateCodeSchedule(),
                  name: self.name,
                  description: self.description,
                  date: date,
                  startHour: self.startHour,
                  endHour: self.endHour,
                  agendaId: self.agendaId,
                  participants: []
                });
              }
            });
          }
          this.dialog = false;
          this.name = "";
          this.description = "";
          this.begindate = "";
          this.enddate = "";
          this.startHour = "";
          this.endHour = "";
          this.repeatId = "Daily";
          this.day = "";
        } else {
          alert(
            "The start/end hour should be between the hours range of the Agenda."
          );
        }
      } else {
        alert("All fields must be filled!");
      }
    },
    addNewSchedule() {
      this.addSchedule({
        code: this._selfGenerateCodeSchedule(),
        name: this.name,
        description: this.description,
        date: this.begindate,
        startHour: this.startHour,
        endHour: this.endHour,
        agendaId: this.agendaId,
        participants: []
      });
    },
    obtainDates(startDate, endDate) {
      let dates = [],
        currentDate = startDate,
        addDays = function(days) {
          let date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        },
        formatDate = function(date) {
          let d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();
          if (month.length < 2) month = "0" + month;
          if (day.length < 2) day = "0" + day;

          return [year, month, day].join("-").toString();
        };
      currentDate = addDays.call(currentDate, 1);
      endDate = addDays.call(endDate, 1);
      while (currentDate <= endDate) {
        dates.push(formatDate(currentDate));
        currentDate = addDays.call(currentDate, 1);
      }
      return dates;
    },
    obtainDatesWeek(startDate, endDate) {
      let dates = [],
        currentDate = startDate,
        addDays = function(days) {
          let date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };
      currentDate = addDays.call(currentDate, 1);
      endDate = addDays.call(endDate, 1);
      while (currentDate <= endDate) {
        dates.push(currentDate.toString());
        currentDate = addDays.call(currentDate, 1);
      }
      return dates;
    },
    _validateData() {
      return (
        this.name != "" &&
        this.description != "" &&
        this.begindate != "" &&
        this.enddate != "" &&
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
    _selfGenerateCode() {
      if (this.recursive.length === 0) {
        this.code = "recursive-" + 1;
        return "recursive-" + 1;
      } else {
        const { code } = this.recursive[Object.keys(this.recursive).length - 1];
        const newNumber = parseInt(code.split("-")[1]) + 1;
        this.code = "recursive-" + newNumber;
        return "recursive-" + newNumber;
      }
    },
    _selfGenerateCodeSchedule() {
      if (this.scheduled.length === 0) {
        return "sched-" + 1 + "-" + this.code.split("-")[1];
      } else {
        const { code } = this.scheduled[Object.keys(this.scheduled).length - 1];
        const newNumber =
          parseInt(code.split("-")[1]) + 1 + "-" + this.code.split("-")[1];
        return "sched-" + newNumber;
      }
    }
  }
};
</script>
