<template>
  <div></div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Scheduling",
  data() {
    return {
      code: "",
      name: "",
      description: "",
      date: "",
      startHour: "",
      endHour: "",
      agendaId: "",
      participants: [],
      agendaStartHour: "",
      agendaEndHour: ""
    };
  },

  methods: {
    ...mapActions(["addSchedule"]),
    addNewSchedule() {
      if (this._validateData && this._validateHoursRange) {
        this.addSchedule({
          code: this.code,
          name: this.name,
          description: this.description,
          date: this.date,
          startHour: this.startHour,
          endHour: this.endHour,
          agendaId: this.agendaId
        });
      }
    },
    _validateData() {
      return (
        this.code !== "" &&
        this.name !== "" &&
        this.description !== "" &&
        this.date !== "" &&
        this.startHour !== "" &&
        this.endHour !== "" &&
        this.agendaId !== ""
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
    }
  }
};
</script>
