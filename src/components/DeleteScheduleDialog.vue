<template>
  <div>
    <v-dialog persistent max-width="600px" v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline"
            >Are you sure you want to delete {{ getName() }} appointment?</span
          >
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.stop="dialog = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="deleteSchedule(code)"
            >Yes</v-btn
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
  name: "DeleteScheduleDialog",
  data() {
    return {
      code: "",
      name: "",
      description: "",
      date: "",
      startHour: "",
      endHour: "",
      agendaId: ""
    };
  },
  props: {
    value: Boolean
  },
  computed: {
    ...mapGetters(["getScheduledList"]),
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
    ...mapActions(["deleteSched"]),
    ...mapActions(["addPpdAppointment"]),
    deleteSchedule(codeToDelete) {
      if (this._validateDate(this.getDate())) {
        this.deleteSched(codeToDelete);
        this.dialog = false;
      } else {
        alert("Can't delete this appointment it will be postponed!");
        this.addPpdAppointment({
          code: codeToDelete,
          name: this.name,
          description: this.description
        });
        this.deleteSched(codeToDelete);
        this.dialog = false;
      }
    },
    _validateDate(appointmentDate) {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();

      const currentDate = `${yyyy}-${mm}-${dd}`;

      return appointmentDate !== currentDate;
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
        this.agendaId = appointment.agendaId;
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
    },
    getDate() {
      if (this.code !== "") {
        const appointment = this.scheduled.find(
          sched => sched.code === this.code
        );
        if (appointment !== undefined) {
          return appointment.date;
        }
      }
    }
  }
};
</script>
