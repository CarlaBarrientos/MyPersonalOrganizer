<template>
  <div>
    <v-dialog persistent max-width="550px" v-model="dialog">
      <v-card>
        <v-card-text>
          <span class="headline"
            >Are you sure you want to postpone "{{ getName() }}"
            appointment?</span
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.stop="dialog = false"
            >Cancel</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            @click="
              postponeAppointment();
              dialog = false;
            "
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
  name: "PostponeAppointmentDialog",
  data() {
    return {
      code: "",
      name: "",
      description: ""
    };
  },
  props: {
    value: Boolean
  },
  computed: {
    ...mapGetters(["getScheduledList"]),
    postponed() {
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
    postponeAppointment() {
      this.addPpdAppointment({
        code: this.code,
        name: this.name,
        description: this.description
      });
      this.deleteSched(this.code);
    },
    getName() {
      if (this.code !== "") {
        const appointment = this.postponed.find(
          sched => sched.code === this.code
        );
        if (appointment !== undefined) {
          return appointment.name;
        }
      }
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
