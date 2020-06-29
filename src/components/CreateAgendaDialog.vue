<template>
  <div>
    <v-dialog persistent max-width="600px" v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">Add New Agenda</span>
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
              <v-col cols="3">
                <v-text-field
                  v-model="startHour"
                  label="Start Hour"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="endHour" label="End Hour"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.stop="dialog = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="addNewAgenda()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "CreateAgendaDialog",
  data() {
    return {
      name: "",
      description: "",
      startHour: "",
      endHour: ""
    };
  },
  props: {
    value: Boolean
  },
  computed: {
    ...mapGetters(["getAgendaList"]),
    agendas() {
      return this.getAgendaList;
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
    ...mapActions(["addAgenda"]),
    addNewAgenda() {
      if (this._validateData()) {
        if (this._validateHoursRange()) {
          this.addAgenda({
            agendaId: this._selfGenerateCode(),
            name: this.name,
            description: this.description,
            agendaStartHour: this.startHour,
            agendaEndHour: this.endHour
          });
          this.dialog = false;
          this.name = "";
          this.description = "";
          this.startHour = "";
          this.endHour = "";
        } else {
          alert("The End hour should be greater than the Start hour.");
        }
      } else {
        alert("All fields must be filled!");
      }
    },
    _validateData() {
      return (
        this.name != "" &&
        this.description != "" &&
        this.startHour != "" &&
        this.endHour != ""
      );
    },
    _validateHoursRange() {
      const startAgenda = parseInt(this.startHour.split(":")[0]);
      const endAgenda = parseInt(this.endHour.split(":")[0]);
      return startAgenda < endAgenda;
    },
    _selfGenerateCode() {
      const { agendaId } = this.agendas[Object.keys(this.agendas).length - 1];
      const newNumber = parseInt(agendaId.split("-")[1]) + 1;
      return "AGN-" + newNumber;
    }
  }
};
</script>
