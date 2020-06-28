<template>
  <v-row>
    <v-col>
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
      <v-sheet height="auto">
        <v-calendar
          ref="calendar"
          :now="date"
          :value="date"
          :events="parseScheduled"
          color="primary"
          type="week"
        ></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      date: this.today()
    };
  },
  computed: {
    ...mapGetters(["getScheduledList"]),
    scheduled() {
      return this.getScheduledList;
    },
    parseScheduled() {
      let parseScheduled = [];
      this.scheduled.forEach(appointment => {
        let start = appointment.date + " " + appointment.startHour;
        let end = appointment.date + " " + appointment.endHour;
        let name = appointment.name;
        let parsed = { start: start, end: end, name: name };
        parseScheduled.push(parsed);
      });
      return parseScheduled;
    }
  },
  methods: {
    today() {
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
