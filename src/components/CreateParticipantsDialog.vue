<template>
  <div>
    <v-dialog persistent max-width="600px" v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">Create New Participant</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  prepend-icon="mdi-account"
                  label="Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="contactNumber"
                  prepend-icon="mdi-cellphone"
                  label="Contact Number"
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
          <v-btn color="blue darken-1" text @click="createNewParticipant()"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CreateParticipantsDialog",
  data() {
    return {
      participantId: "",
      name: "",
      contactNumber: ""
    };
  },
  props: {
    value: Boolean
  },
  computed: {
    ...mapGetters(["getParticipantsList"]),
    participants() {
      return this.getParticipantsList;
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
    ...mapActions(["createParticipant"]),
    createNewParticipant() {
      if (this._validateFields()) {
        this.createParticipant({
          participantId: this._calculateID(),
          name: this.name,
          contactNumber: this.contactNumber
        });
        this.dialog = false;
        this.name = "";
        this.contactNumber = "";
      } else {
        alert("Verify Input Fields");
      }
    },
    _validateFields() {
      return this.name !== "" && this.contactNumber !== "";
    },
    _calculateID() {
      if (this.participants.length === 0) {
        return "PART-" + 1;
      } else {
        const participantId = this.participants[this.participants.length - 1]
          .participantId;
        const newNumber = parseInt(participantId.split("-")[1]) + 1;
        return "PART-" + newNumber;
      }
    }
  }
};
</script>
