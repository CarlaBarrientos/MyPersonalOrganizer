import { assert } from "chai";
import { shallowMount } from "@vue/test-utils";
import Participants from "@/components/Participants.vue";

describe("Participants Logic", () => {
  it("Validate Data with Empty Fields", () => {
    const wrapper = shallowMount(Participants);
    wrapper.vm.$data.name = "";
    wrapper.vm.$data.contactNumber = "";
    const isValid = wrapper.vm._validateFields();
    assert.isFalse(isValid);
  });
  it("Validate Data with Correct Data", () => {
    const wrapper = shallowMount(Participants);
    wrapper.vm.$data.name = "Test";
    wrapper.vm.$data.contactNumber = "70777777";
    const isValid = wrapper.vm._validateFields();
    assert.isTrue(isValid);
  });
  it("Create New Participant", () => {
    
  });
  it("Edit Participant", () => {

  });
  it("Add Participant to an Appointment", () => {

  });
  it("Remove Participant from Appointment", () => {

  });
  it("Delete Participant with no Future Appointment", () => {

  });
  it("Delete Participant with a Future Appointment", () => {

  });
});