<template>
  <div>
    <v-container class="my-10" grid-list-md>
      <H1>Postponed Appointments</H1>
      <br />
      <v-layout row wrap>
        <v-flex v-for="appointment in postponed" :key="appointment.code">
          <v-card class="mx-auto" max-width="344">
            <v-card-title>
              <div class="subheading">{{ appointment.name }}</div>
            </v-card-title>
            <v-card-text>
              <div class="grey--text">
                Description: {{ appointment.description }}
              </div>
              <div class="grey--text">Code: {{ appointment.code }}</div>
            </v-card-text>
            <v-card-actions>
              <v-layout row wrap justify-space-around class="pb-3">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      fab
                      depressed
                      dark
                      color="blue"
                      @click.stop="
                        enableDialog(appointment.code);
                        showEnableDialog = true;
                      "
                      v-on="on"
                    >
                      <v-icon>mdi-checkbox-marked-circle</v-icon>
                    </v-btn>
                  </template>
                  <span>Enable</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      fab
                      depressed
                      dark
                      color="blue-grey"
                      @click.stop="
                        updateDialog(appointment.code);
                        showUpdateDialog = true;
                      "
                      v-on="on"
                    >
                      <v-icon>mdi-pencil-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Update</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      fab
                      depressed
                      dark
                      color="red"
                      @click.stop="
                        deleteDialog(appointment.code);
                        showDeleteDialog = true;
                      "
                      v-on="on"
                    >
                      <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Delete</span>
                </v-tooltip>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <EnablePpdAppointmentDialog
      ref="EnablePpdAppointmentDialog"
      v-model="showEnableDialog"
    />
    <DeletePpdAppointmentDialog
      ref="DeletePpdAppointmentDialog"
      v-model="showDeleteDialog"
    />
    <UpdatePpdAppointmentDialog
      ref="UpdatePpdAppointmentDialog"
      v-model="showUpdateDialog"
    />
  </div>
</template>

<script>
import EnablePpdAppointmentDialog from "../components/EnablePpdAppointmentDialog.vue";
import DeletePpdAppointmentDialog from "../components/DeletePpdAppointmentDialog.vue";
import UpdatePpdAppointmentDialog from "../components/UpdatePpdAppointmentDialog.vue";

import { mapGetters } from "vuex";

export default {
  name: "PpdAppointments",
  data() {
    return {
      showEnableDialog: false,
      showDeleteDialog: false,
      showUpdateDialog: false
    };
  },

  components: {
    EnablePpdAppointmentDialog,
    DeletePpdAppointmentDialog,
    UpdatePpdAppointmentDialog
  },

  computed: {
    ...mapGetters(["getPpdAppointmentsList"]),
    postponed() {
      return this.getPpdAppointmentsList;
    }
  },

  methods: {
    enableDialog(code) {
      this.$refs.EnablePpdAppointmentDialog._setCode(code);
    },
    updateDialog(code) {
      this.$refs.UpdatePpdAppointmentDialog._setCode(code);
    },
    deleteDialog(code) {
      this.$refs.DeletePpdAppointmentDialog._setCode(code);
    }
  }
};
</script>
