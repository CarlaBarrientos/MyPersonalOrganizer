<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday"
            >Today</v-btn
          >
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">{{
            $refs.calendar.title
          }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="800">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="parseEvents"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card class="mx-auto" max-width="344">
            <v-card-title>
              <div class="subheading">{{ selectedEvent.name }}</div>
            </v-card-title>
            <v-card-text>
              <div class="grey--text">
                Description: {{ selectedEvent.description }}
              </div>
              <div class="grey--text">
                Start hour: {{ selectedEvent.startHour }}
              </div>
              <div class="grey--text">
                End hour: {{ selectedEvent.endHour }}
              </div>
              <div class="grey--text">
                Participants:
              </div>
              <div
                v-for="participant in participantsOnAppointment(
                  selectedEvent.code
                )"
                :key="participant.participantId"
              >
                <v-chip small outlined color="black" text-color="black">
                  {{ participant.name }}
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
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
      focus: "",
      type: "month",
      typeToLabel: {
        month: "Month",
        week: "Week",
        day: "Day"
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false
    };
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  computed: {
    ...mapGetters(["getScheduledList"]),
    scheduled() {
      return this.getScheduledList;
    },
    parseEvents() {
      let parseEvents = [];
      this.scheduled.forEach(appointment => {
        let start = appointment.date + " " + appointment.startHour;
        let end = appointment.date + " " + appointment.endHour;
        let color = "green";
        appointment.start = start;
        appointment.end = end;
        appointment.color = color;
        parseEvents.push(appointment);
      });
      return parseEvents;
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
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    }
  }
};
</script>
