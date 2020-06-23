<template>
  <div></div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PpdAppointments",
  data() {
    return {
      agendaStartHour: "",
      agendaEndHour: "",
      scheduledAppointments: {
        code: "",
        name: "",
        description: "",
        date: "",
        startHour: "",
        endHour: "",
        agendaId: "",
        participants: []
      },
      postponedAppointment: {
        name: "",
        description: ""
      }
    };
  },

  methods: {
    //...mapActions(["addSchedule", "modifySchedule", "deleteSched"]),
    ...mapActions([
      "PostponeAppointment",
      "EnablePpdAppointment",
      "EditPpdAppointment",
      "DeletePpdAppointment"
    ]),
    postponeAppointment() {
      if (this._validateData) {
        this.addPpdAppointment({
          code: this.postponedAppointment.code,
          name: this.postponedAppointment.name,
          description: this.postponedAppointment.description
        });
      }
    },
    updatePostponedAppointment() {
      if (this._validateData) {
        this.modifyPpdAppointment({
          name: this.name,
          description: this.description,
          date: this.date,
          startHour: this.startHour,
          endHour: this.endHour,
          agendaId: this.agendaId
        });
      }
    },
    deletePostponedAppointment() {
      if (this._validateDate()) {
        this.deletePpdAppointment(this.postponedAppointment.code);
      }
    },
    _validateData() {
      return (
        this.scheduledAppointments.code !== "" &&
        this.scheduledAppointments.name !== "" &&
        this.scheduledAppointments.description !== "" &&
        this.scheduledAppointments.date !== "" &&
        this.scheduledAppointments.startHour !== "" &&
        this.scheduledAppointments.endHour !== "" &&
        this.scheduledAppointments.agendaId !== ""
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
