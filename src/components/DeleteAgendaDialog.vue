<template>
  <div>
    <v-dialog persistent max-width="600px" v-model="dialog">
      <v-card>
        <v-card-text>
          <span class="headline"
            >Are you sure you want to delete {{ getName() }} Agenda?</span
          >
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.stop="dialog = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="deleteAgend(agendaId)"
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
  name: "DeleteAgendaDialog",
  data() {
    return {
      name: "",
      description: "",
      startHour: "",
      endHour: "",
      agendaId: ""
    };
  },
  props: {
    value: Boolean
  },
  computed: {
    ...mapGetters(["getAgendaList"]),
    ...mapGetters(["getScheduledList"]),
    agendas() {
      return this.getAgendaList;
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
    ...mapActions(["deleteAgenda"]),
    deleteAgend(codeToDelete) {
      if (!this.hasAppointments(codeToDelete)) {
        this.deleteAgenda(codeToDelete);
        this.dialog = false;
      } else {
        alert("Cannot delete this Agenda");
        this.dialog = false;
      }
    },
    _setCode(agendaId) {
      this.agendaId = agendaId;
      const agenda = this.agendas.find(
        agend => agend.agendaId === this.agendaId
      );
      if (agenda !== undefined) {
        this.name = agenda.name;
        this.description = agenda.description;
        this.startHour = agenda.agendaStartHour;
        this.endHour = agenda.agendaEndHour;
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
