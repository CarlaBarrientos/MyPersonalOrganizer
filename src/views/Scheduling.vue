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
    ...mapActions(["addSchedule", "modifySchedule", "deleteSched"]),
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
    updateSchedule() {
      if (this._validateData && this._validateHoursRange) {
        this.modifySchedule({
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
    deleteSchedule() {
      if (this._validateDate()) {
        this.deleteSched(this.code);
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
    },
    _validateDate(appointmentDate) {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();

      const currentDate = `${yyyy}-${mm}-${dd}`;

      return appointmentDate !== currentDate;
    }
  }
};
</script>
