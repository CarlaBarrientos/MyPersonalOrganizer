import { assert } from "chai";
import { shallowMount } from "@vue/test-utils";
import Scheduling from "@/views/Scheduling.vue";

describe("Scheduling appointmets/meetings module", () => {
  it("Validate data when fields are empty.", () => {
    const wrapper = shallowMount(Scheduling);
    const invalidData = wrapper.vm._validateData();
    assert.isFalse(invalidData);
  });
  it("Validate data when all fields are filled.", () => {
    const wrapper = shallowMount(Scheduling);

    wrapper.vm.$data.code = "1";
    wrapper.vm.$data.name = "presentation";
    wrapper.vm.$data.description = "final project presentation";
    wrapper.vm.$data.date = "2020-06-21";
    wrapper.vm.$data.startHour = "10:00";
    wrapper.vm.$data.endHour = "11:00";
    wrapper.vm.$data.agendaId = "1";

    const validData = wrapper.vm._validateData();
    assert.isTrue(validData);
  });
  it("Validate that the begin/end hours are within the agenda's hours range.", () => {
    const wrapper = shallowMount(Scheduling);

    wrapper.vm.$data.code = "1";
    wrapper.vm.$data.name = "presentation";
    wrapper.vm.$data.description = "final project presentation";
    wrapper.vm.$data.date = "2020-06-21";
    wrapper.vm.$data.startHour = "10:00";
    wrapper.vm.$data.endHour = "12:00";
    wrapper.vm.$data.agendaId = "1";

    wrapper.vm.$data.agendaStartHour = "10:00";
    wrapper.vm.$data.agendaEndHour = "13:00";

    const validRange = wrapper.vm._validateHoursRange();
    assert.isTrue(validRange);
  });
  it("Add a new appointment/meeting validating data.", () => {});
  it("Update a scheduled appointment/meeting.", () => {});
  it("Delete a scheduled appontment/meeting that is not scheduled for today.", () => {});
});
