<template>
  <div></div>
</template>
<script>
export default {
  name: "Participants",
  data() {
    return {
      name: "",
      contactNumber: ""
    };
  },
  methods: {
    _validateFields() {
      return this.name !== "" && this.contactNumber !== "";
    }
  }
};
</script>
