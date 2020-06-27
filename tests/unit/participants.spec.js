import { assert } from "chai";
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import CreateParticipantsDialog from "@/components/CreateParticipantsDialog.vue";
import DeleteParticipantsDialog from "@/components/DeleteParticipantsDialog.vue";
import UpdateParticipantsDialog from "@/components/UpdateParticipantsDialog.vue";
import AddParticipantDialog from "@/components/AddParticipantDialog.vue";
import DeleteParticipantsFromAppointment from "@/components/DeleteParticipantsFromAppointment.vue";
import Vuex from "vuex";
import mockParticipantStore from "./mockParticipant";
import actions from "@/store/actions.js";
import mutations from "@/store/mutations.js";
import getters from "@/store/getters.js";

describe("Participants Logic", () => {
  let localVue;
  let store;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    global.alert = message => {
      console.log(message);
    };
    store = new Vuex.Store({
      state: mockParticipantStore,
      actions,
      mutations,
      getters,
      modules: {}
    });
  });
  it("Validate Data with Missing Fields", () => {
    const wrapper = shallowMount(CreateParticipantsDialog);
    wrapper.vm.$data.name = "";
    wrapper.vm.$data.contactNumber = "";
    const isValid = wrapper.vm._validateFields();
    assert.isFalse(isValid);
  });
  it("Validate Data with Correct Data", () => {
    const wrapper = shallowMount(CreateParticipantsDialog);
    wrapper.vm.$data.name = "TestValidate";
    wrapper.vm.$data.contactNumber = "70777777";
    const isValid = wrapper.vm._validateFields();
    assert.isTrue(isValid);
  });
  it("Do not Create New Participant with Missing Fields", () => {
    const wrapper = mount(CreateParticipantsDialog, {
      store,
      localVue
    });
    wrapper.vm.$data.name = "";
    wrapper.vm.$data.contactNumber = "";
    const initialLength = wrapper.vm.$store.state.participants.length;
    wrapper.vm.createNewParticipant();
    assert.equal(initialLength, wrapper.vm.$store.state.participants.length);
  });
  it("Create New Participant with Correct Data", () => {
    const wrapper = mount(CreateParticipantsDialog, {
      store,
      localVue
    });
    wrapper.vm.$data.name = "TestCreate";
    wrapper.vm.$data.contactNumber = "70777777";
    const initialLength = wrapper.vm.$store.state.participants.length;
    wrapper.vm.createNewParticipant();
    assert.equal(
      initialLength + 1,
      wrapper.vm.$store.state.participants.length
    );
  });
  it("Update Participant", () => {
    const wrapper = mount(UpdateParticipantsDialog, {
      store,
      localVue
    });
    const idToUpdate = wrapper.vm.$store.state.participants.find(
      participant => participant.name === "TestUpdate"
    ).participantId;
    const oldParticipant = wrapper.vm.$store.state.participants.find(
      participant => participant.participantId === idToUpdate
    ).name;
    assert.equal(oldParticipant, "TestUpdate");
    wrapper.vm.$data.name = "Updated";
    wrapper.vm.$data.contactNumber = "70777777";
    wrapper.vm.modifyParticipant(idToUpdate);
    const updatedParticipant = wrapper.vm.$store.state.participants.find(
      participant => participant.participantId === idToUpdate
    ).name;
    assert.equal(updatedParticipant, "Updated");
  });
  it("Add Participant to an Appointment", () => {
    const wrapper = mount(AddParticipantDialog, {
      store,
      localVue
    });
    let allAppointments = wrapper.vm.allAppointments;
    const participantId = "PART-10";
    const code = "SCH-1";
    wrapper.vm.code = code;
    const actualLength = allAppointments.find(
      appointment => appointment.code === code
    ).participants.length;
    wrapper.vm.pushParticipantToAppointment(participantId);
    assert.equal(
      actualLength + 1,
      allAppointments.find(appointment => appointment.code === code)
        .participants.length
    );
  });
  it("Remove Participant from Appointment", () => {
    const wrapper = mount(DeleteParticipantsFromAppointment, {
      store,
      localVue
    });
    let allAppointments = wrapper.vm.allAppointments;
    const participantId = "PART-7";
    const code = "REC-1";
    const actualLength = allAppointments.find(
      appointment => appointment.code === code
    ).participants.length;
    wrapper.vm.removeParticipantFromAppointment(participantId, code);
    assert.equal(
      actualLength - 1,
      allAppointments.find(appointment => appointment.code === code)
        .participants.length
    );
  });
  it("Delete Participant with no Future Appointment", () => {
    const wrapper = mount(DeleteParticipantsDialog, {
      store,
      localVue
    });
    const actualLength = wrapper.vm.$store.state.participants.length;
    const participantId = "PART-8";
    wrapper.vm.removeParticipant(participantId);
    assert.equal(actualLength - 1, wrapper.vm.$store.state.participants.length);
  });
  it("Do not Delete Participant with a Future Appointment", () => {
    const wrapper = mount(DeleteParticipantsDialog, {
      store,
      localVue
    });
    const participantId = "PART-6";
    const actualLength = wrapper.vm.$store.state.participants.length;
    wrapper.vm.removeParticipant(participantId);
    assert.equal(actualLength, wrapper.vm.$store.state.participants.length);
  });
});
