<template>
  <div>
    <v-dialog persistent max-width="600px" v-model="dialog">
      <v-card>
        <v-card-text>
          <span class="headline"
            >Are you sure you want to delete {{ getName() }} recursive
            appointment?</span
          >
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.stop="dialog = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="deleteRecur(code)"
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
  name: "DeleteRecursiveDialog",
  data() {
    return {
      name: "",
      description: "",
      startHour: "",
      endHour: "",
      code: ""
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
    ...mapActions(["deleteRecursive"]),
    ...mapActions(["deleteSched"]),
    deleteRecur(codeToDelete) {
      let self = this;
      this.deleteRecursive(codeToDelete);
      this.dialog = false;
      const agenda = this.scheduled.filter(
        sched => sched.code.split("-")[2] === codeToDelete.split("-")[1]
      );
      agenda.forEach(function(date) {
        self.deleteSched(date.code);
      });
    },
    _setCode(code) {
      this.code = code;
      const agenda = this.agendas.find(agend => agend.code === this.code);
      if (agenda !== undefined) {
        this.name = agenda.name;
        this.description = agenda.description;
        this.startHour = agenda.startHour;
        this.endHour = agenda.endHour;
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
