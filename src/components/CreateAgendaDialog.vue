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
                <v-text-field
                  id="agenda-name"
                  v-model="name"
                  label="Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  id="agenda-desc"
                  v-model="description"
                  label="Description"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-menu :close-on-content-click="false" width="30">
                  <template v-slot:activator="{ on }">
                    <v-row justify="center">
                      <v-col>
                        <v-text-field
                          id="agenda-start-hour"
                          v-model="startHour"
                          label="Start Hour"
                          v-on="on"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </template>
                  <v-time-picker
                    format="24hr"
                    v-model="startHour"
                    v-on="on"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="3">
                <v-menu :close-on-content-click="false" width="30">
                  <template v-slot:activator="{ on }">
                    <v-row justify="center">
                      <v-col>
                        <v-text-field
                          id="agenda-end-hour"
                          v-model="endHour"
                          label="End Hour"
                          v-on="on"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </template>
                  <v-time-picker
                    format="24hr"
                    v-model="endHour"
                    v-on="on"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.stop="dialog = false"
            >Cancel</v-btn
          >
          <v-btn
            id="save-agenda"
            color="blue darken-1"
            text
            @click="addNewAgenda()"
            >Save</v-btn
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
  name: "CreateAgendaDialog",
  data() {
    return {
      on: "",
      name: "",
      description: "",
      startHour: "",
      endHour: "",
      appointments: []
    };
  },
  props: {
    value: Boolean
  },
  computed: {
    ...mapGetters(["getAgendas"]),
    agendas() {
      return this.getAgendas;
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
            startHour: this.startHour,
            endHour: this.endHour,
            appointments: this.appointments
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
      if (
        (this.startHour.length === 4 || this.startHour.length === 5) &&
        (this.startHour.indexOf(":") === 1 ||
          this.startHour.indexOf(":") === 2) &&
        (this.endHour.length === 4 || this.endHour.length === 5) &&
        (this.endHour.indexOf(":") === 1 || this.endHour.indexOf(":") === 2)
      ) {
        const startAgenda = parseInt(this.startHour.split(":")[0]);
        const endAgenda = parseInt(this.endHour.split(":")[0]);
        return startAgenda < endAgenda;
      } else {
        alert("The hour format is not valid!");
      }
    },
    _selfGenerateCode() {
      if (this.agendas.length === 0) {
        return "AGN-" + 1;
      } else {
        const { agendaId } = this.agendas[Object.keys(this.agendas).length - 1];
        const newNumber = parseInt(agendaId.split("-")[1]) + 1;
        return "AGN-" + newNumber;
      }
    }
  }
};
</script>
