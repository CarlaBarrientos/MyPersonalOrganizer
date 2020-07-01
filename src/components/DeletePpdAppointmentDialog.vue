<template>
  <div>
    <v-dialog persistent max-width="600px" v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline"
            >Are you sure you want to delete "{{ getName() }}" postponed
            appointment?</span
          >
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.stop="dialog = false"
            >Cancel</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            @click="
              deletePpdAppointment(code);
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
  name: "DeletePpdAppointmentDialog",
  data() {
    return {
      code: ""
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
    ...mapActions(["deletePpdAppointment"]),
    deletePostponed(codeToDelete) {
      this.deletePpdAppointment(codeToDelete);
      //this.dialog = false;
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
    }
  }
};
</script>
