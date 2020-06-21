<template>
  <div></div>
</template>

<script>
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
      participants: []
    };
  },

  methods: {
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
    }
  }
};
</script>
