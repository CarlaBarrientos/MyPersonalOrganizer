<template>
  <div>
    <v-dialog persistent max-width="600px" v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">Update Participant</span>
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
          <v-btn
            color="blue darken-1"
            text
            @click="modifyParticipant(participantId)"
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
  name: "UpdateParticipantsDialog",
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
    ...mapActions(["updateParticipant"]),
    modifyParticipant(participantId) {
      if (this._participantExists(participantId)) {
        if (this._validateFields()) {
          this.updateParticipant({
            participantId: participantId,
            name: this.name,
            contactNumber: this.contactNumber
          });
          this.dialog = false;
        } else {
          alert("Verify Input Fields");
        }
      } else {
        alert("Invalid Participant Id");
      }
    },
    _participantExists(participantId) {
      let exists = false;
      if (participantId !== "") {
        this.participants.forEach(participant => {
          if (participant.participantId === participantId) {
            exists = true;
          }
        });
      }
      return exists;
    },
    _validateFields() {
      return this.name !== "" && this.contactNumber !== "";
    },
    setId(participantId) {
      this.participantId = participantId;
      this.participants.forEach(participant => {
        if (participant.participantId === participantId) {
          this.name = participant.name;
          this.contactNumber = participant.contactNumber;
        }
      });
    }
  }
};
</script>
