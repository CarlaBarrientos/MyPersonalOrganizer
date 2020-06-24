import { assert } from "chai";
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Participants from "@/views/Participants.vue";
import Vuex from "vuex";
import mockParticipantStore from "./mockParticipant";
import actions from "@/store/actions.js";
import mutations from "@/store/mutations.js";
import getters from "@/store/getters.js";
let store;
describe("Participants Logic", () => {
  let localVue;
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
    const wrapper = shallowMount(Participants);
    wrapper.vm.$data.name = "";
    wrapper.vm.$data.contactNumber = "";
    const isValid = wrapper.vm._validateFields();
    assert.isFalse(isValid);
  });
  it("Validate Data with Correct Data", () => {
    const wrapper = shallowMount(Participants);
    wrapper.vm.$data.name = "TestValidate";
    wrapper.vm.$data.contactNumber = "70777777";
    const isValid = wrapper.vm._validateFields();
    assert.isTrue(isValid);
  });
  it("Do not Create New Participant with Missing Fields", () => {
    const wrapper = mount(Participants, {
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
    const wrapper = mount(Participants, {
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
    const wrapper = mount(Participants, {
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
    wrapper.vm.$data.participantId = idToUpdate;
    wrapper.vm.$data.name = "Updated";
    wrapper.vm.$data.contactNumber = "70777777";
    wrapper.vm.modifyParticipant();
    const updatedParticipant = wrapper.vm.$store.state.participants.find(
      participant => participant.participantId === idToUpdate
    ).name;
    assert.equal(updatedParticipant, "Updated");
  });
  it("Do not Add Participant to an Invalid Appointment", () => {
    const wrapper = mount(Participants, {
      store,
      localVue
    });
    let allAppointments = wrapper.vm.allAppointments;
    wrapper.vm.$data.participantId = "PART-5";
    wrapper.vm.$data.appointmentCode = "SCH-2";
    const expectedLength = allAppointments.find(
      appointment => appointment.code === "SCH-1"
    ).participants.length;
    wrapper.vm.pushParticipantToAppointment();
    assert.equal(
      expectedLength,
      allAppointments.find(appointment => appointment.code === "SCH-1")
        .participants.length
    );
  });
  it("Add Participant to an Appointment", () => {
    const wrapper = mount(Participants, {
      store,
      localVue
    });
    let allAppointments = wrapper.vm.allAppointments;
    wrapper.vm.$data.participantId = "PART-5";
    wrapper.vm.$data.appointmentCode = "SCH-1";
    const actualLength = allAppointments.find(
      appointment => appointment.code === "SCH-1"
    ).participants.length;
    wrapper.vm.pushParticipantToAppointment();
    assert.equal(
      actualLength + 1,
      allAppointments.find(appointment => appointment.code === "SCH-1")
        .participants.length
    );
  });
  it("Do not Remove Participant from Invalid Appointment", () => {
    const wrapper = mount(Participants, {
      store,
      localVue
    });
    let allAppointments = wrapper.vm.allAppointments;
    wrapper.vm.$data.participantId = "PART-5";
    wrapper.vm.$data.appointmentCode = "SCH-2";
    const expectedLength = allAppointments.find(
      appointment => appointment.code === "SCH-1"
    ).participants.length;
    wrapper.vm.removeParticipantFromAppointment();
    assert.equal(
      expectedLength,
      allAppointments.find(appointment => appointment.code === "SCH-1")
        .participants.length
    );
  });
  it("Remove Participant from Appointment", () => {
    const wrapper = mount(Participants, {
      store,
      localVue
    });
    let allAppointments = wrapper.vm.allAppointments;
    wrapper.vm.$data.participantId = "PART-5";
    wrapper.vm.$data.appointmentCode = "REC-1";
    wrapper.vm.pushParticipantToAppointment();
    const actualLength = allAppointments.find(
      appointment => appointment.code === "REC-1"
    ).participants.length;
    wrapper.vm.removeParticipantFromAppointment();
    assert.equal(
      actualLength - 1,
      allAppointments.find(appointment => appointment.code === "REC-1")
        .participants.length
    );
  });
  it("Delete Participant with no Future Appointment", () => {});
  it("Do not Delete Participant with a Future Appointment", () => {});
});
