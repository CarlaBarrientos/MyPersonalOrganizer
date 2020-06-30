/* eslint-disable prettier/prettier */
<template>
  <div>
    <v-container class="my-10" grid-list-md>
      <H1>Agendas</H1>
      <br />
      <v-layout row wrap>
        <v-flex md3 class="pl-5 pt-4">
          <v-btn
            id="btn-add-agenda"
            long
            outlined
            class="text-capitalize"
            color="blue-grey darken-2"
            width="150px"
            @click.stop="showCreateDialog = true"
          >
            <v-icon left small>mdi-plus-circle-outline</v-icon>
            <span class="caption">Add New</span>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-space-around>
        <v-flex v-for="agenda in agendas" :key="agenda.code">
          <v-card class="mx-auto" max-width="344">
            <v-card-title>
              <div class="subheading">{{ agenda.name }}</div>
            </v-card-title>
            <v-card-text>
              <div class="grey--text">Agenda: {{ agenda.agendaId }}</div>
              <div class="grey--text">
                Description: {{ agenda.description }}
              </div>
              <div class="grey--text">Start hour: {{ agenda.startHour }}</div>
              <div class="grey--text">End hour: {{ agenda.endHour }}</div>
              <div class="grey--text">Appointments:</div>
              <div
                v-for="appointment in agenda.appointments"
                :key="appointment.code"
              >
                <v-chip small outlined color="grey" text-color="grey">
                  {{ appointment.name }}
                </v-chip>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-layout row wrap justify-space-around class="pb-3">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      fab
                      depressed
                      dark
                      color="red"
                      @click.stop="
                        deleteDialog(agenda.agendaId);
                        showDeleteDialog = true;
                      "
                      v-on="on"
                    >
                      <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Delete</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      fab
                      depressed
                      dark
                      color="indigo"
                      @click.stop="
                        updateDialog(agenda.agendaId);
                        showUpdateDialog = true;
                      "
                      v-on="on"
                    >
                      <v-icon>mdi-pencil-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Update</span>
                </v-tooltip>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <CreateAgendaDialog v-model="showCreateDialog" />
    <DeleteAgendaDialog ref="DeleteAgendaDialog" v-model="showDeleteDialog" />
    <UpdateAgendaDialog ref="UpdateAgendaDialog" v-model="showUpdateDialog" />
  </div>
</template>

<script>
import CreateAgendaDialog from "../components/CreateAgendaDialog.vue";
import DeleteAgendaDialog from "../components/DeleteAgendaDialog.vue";
import UpdateAgendaDialog from "../components/UpdateAgendaDialog.vue";

import { mapGetters } from "vuex";

export default {
  name: "Agenda",
  data() {
    return {
      showCreateDialog: false,
      showDeleteDialog: false,
      showUpdateDialog: false
    };
  },

  components: {
    CreateAgendaDialog,
    DeleteAgendaDialog,
    UpdateAgendaDialog
  },

  computed: {
    ...mapGetters(["getAgendas"]),
    agendas() {
      return this.getAgendas;
    }
  },

  methods: {
    addDialog(code) {
      this.$refs.AddParticipantDialog._setCode(code);
    },
    updateDialog(code) {
      this.$refs.UpdateAgendaDialog._setCode(code);
    },
    deleteDialog(code) {
      this.$refs.DeleteAgendaDialog._setCode(code);
    }
  }
};
</script>
