<template>
  <div>
    <v-dialog persistent max-width="600px" v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">Modify postponed Appointment</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="name" label="Name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="description"
                  label="Description"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.stop="dialog = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="updatePostponed()"
            >Update</v-btn
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
  name: "UpdatePpdAppointmentDialog",
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
    ...mapActions(["modifyPpdAppointment"]),
    updatePostponed() {
      if (this._validateData()) {
        this.modifyPpdAppointment({
          code: this.code,
          name: this.name,
          description: this.description
        });
        this.dialog = false;
        this.name = "";
        this.description = "";
      } else {
        alert("All fields must be filled!");
      }
    },
    _validateData() {
      return this.name != "" && this.description != "";
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
