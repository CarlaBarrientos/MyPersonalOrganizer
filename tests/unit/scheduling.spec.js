import { assert } from "chai";
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Scheduling from "@/views/Scheduling.vue";

import store from "@/store";
import Vuex from "vuex";

describe("Scheduling appointmets/meetings module", () => {
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
  });
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
  it("Add a new appointment/meeting validating data.", () => {
    const wrapper = mount(Scheduling, {
      store,
      localVue
    });

    wrapper.vm.$data.code = "1";
    wrapper.vm.$data.name = "presentation";
    wrapper.vm.$data.description = "final project presentation";
    wrapper.vm.$data.date = "2020-06-21";
    wrapper.vm.$data.startHour = "10:00";
    wrapper.vm.$data.endHour = "12:00";
    wrapper.vm.$data.agendaId = "1";

    const expectedLength = wrapper.vm.$store.state.scheduledAppointments.length;
    wrapper.vm.addNewSchedule();
    assert.equal(
      wrapper.vm.$store.state.scheduledAppointments.length,
      expectedLength + 1
    );
  });
  it("Update a scheduled appointment/meeting.", () => {
    const wrapper = mount(Scheduling, {
      store,
      localVue
    });

    let expectedName = "presentation";
    let expectedDate = "2020-06-21";
    let expectedAgendaId = "1";

    const actualScheduled = wrapper.vm.$store.state.scheduledAppointments.find(
      schedule => schedule.code === "1"
    );

    assert.equal(actualScheduled.name, expectedName);
    assert.equal(actualScheduled.date, expectedDate);
    assert.equal(actualScheduled.agendaId, expectedAgendaId);

    wrapper.vm.$data.code = "1";
    wrapper.vm.$data.name = "presentation2";
    wrapper.vm.$data.description = "final project presentation";
    wrapper.vm.$data.date = "2020-06-22";
    wrapper.vm.$data.startHour = "10:00";
    wrapper.vm.$data.endHour = "12:00";
    wrapper.vm.$data.agendaId = "3";

    wrapper.vm.updateSchedule();

    expectedName = "presentation2";
    expectedDate = "2020-06-22";
    expectedAgendaId = "3";

    const updatedScheduled = wrapper.vm.$store.state.scheduledAppointments.find(
      schedule => schedule.code === "1"
    );

    assert.equal(updatedScheduled.name, expectedName);
    assert.equal(updatedScheduled.date, expectedDate);
    assert.equal(updatedScheduled.agendaId, expectedAgendaId);
  });
  it("Delete a scheduled appontment/meeting that is not scheduled for today.", () => {
    const wrapper = mount(Scheduling, {
      store,
      localVue
    });

    const expectedLength = 0;
    wrapper.vm.$data.code = "1";
    wrapper.vm.deleteSchedule();
    assert.equal(
      expectedLength,
      wrapper.vm.$store.state.scheduledAppointments.length
    );
  });
});
