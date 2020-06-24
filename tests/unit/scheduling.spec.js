import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import CreateScheduleDialog from "@/components/CreateScheduleDialog.vue";
import DeleteScheduleDialog from "@/components/DeleteScheduleDialog.vue";
import UpdateScheduleDialog from "@/components/UpdateScheduleDialog.vue";

import Vuex from "vuex";

import actions from "@/store/actions.js";
import mutations from "@/store/mutations.js";
import getters from "@/store/getters.js";
import mockScheduling from "./mockScheduling";

describe("Scheduling appointmets/meetings module", () => {
  let localVue;
  let store;

  beforeEach(() => {
    global.alert = message => {
      console.log(message);
    };
    localVue = createLocalVue();
    localVue.use(Vuex);

    store = new Vuex.Store({
      state: mockScheduling,
      actions,
      mutations,
      getters
    });
  });
  it("Validate data when fields are empty.", () => {
    const wrapper = mount(CreateScheduleDialog, {
      store,
      localVue
    });
    const invalidData = wrapper.vm._validateData();
    assert.isFalse(invalidData);
  });
  it("Validate data when all fields are filled.", () => {
    const wrapper = mount(CreateScheduleDialog, {
      store,
      localVue
    });

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
    const wrapper = mount(CreateScheduleDialog, {
      store,
      localVue
    });

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
    const wrapper = mount(CreateScheduleDialog, {
      store,
      localVue
    });

    wrapper.vm.$data.name = "presentation";
    wrapper.vm.$data.description = "final project presentation";
    wrapper.vm.$data.date = "2020-06-21";
    wrapper.vm.$data.startHour = "10:00";
    wrapper.vm.$data.endHour = "12:00";
    wrapper.vm.$data.agendaId = "1";
    wrapper.vm.$data.agendaStartHour = "10:00";
    wrapper.vm.$data.agendaEndHour = "13:00";

    const expectedLength = wrapper.vm.$store.state.scheduledAppointments.length;
    wrapper.vm.addNewSchedule();
    assert.equal(
      wrapper.vm.$store.state.scheduledAppointments.length,
      expectedLength + 1
    );
  });
  it("Update a scheduled appointment/meeting.", () => {
    const wrapper = mount(UpdateScheduleDialog, {
      store,
      localVue
    });

    let expectedName = "Dentist";
    let expectedDate = "2020-06-12";
    let expectedAgendaId = "1";

    const actualScheduled = wrapper.vm.$store.state.scheduledAppointments.find(
      schedule => schedule.code === "sched-1"
    );

    assert.equal(actualScheduled.name, expectedName);
    assert.equal(actualScheduled.date, expectedDate);
    assert.equal(actualScheduled.agendaId, expectedAgendaId);

    wrapper.vm.$data.code = "sched-1";
    wrapper.vm.$data.name = "presentation";
    wrapper.vm.$data.description = "I need to go to dentist";
    wrapper.vm.$data.date = "2020-06-22";
    wrapper.vm.$data.startHour = "10:00";
    wrapper.vm.$data.endHour = "11:00";
    wrapper.vm.$data.agendaId = "3";
    wrapper.vm.$data.agendaStartHour = "10:00";
    wrapper.vm.$data.agendaEndHour = "13:00";

    wrapper.vm.updateSchedule();

    expectedName = "presentation";
    expectedDate = "2020-06-22";
    expectedAgendaId = "3";

    const updatedScheduled = wrapper.vm.$store.state.scheduledAppointments.find(
      schedule => schedule.code === "sched-1"
    );

    assert.equal(updatedScheduled.name, expectedName);
    assert.equal(updatedScheduled.date, expectedDate);
    assert.equal(updatedScheduled.agendaId, expectedAgendaId);
  });
  it("Validate the current date before deleting.", () => {
    const wrapper = mount(DeleteScheduleDialog, {
      store,
      localVue
    });
    //const invalidDate = wrapper.vm._validateDate("2020-06-24");
    //assert.isFalse(invalidDate);
    const validDate = wrapper.vm._validateDate("2020-06-22");
    assert.isTrue(validDate);
  });
  it("Delete a scheduled appontment/meeting that is not scheduled for today.", () => {
    const wrapper = mount(DeleteScheduleDialog, {
      store,
      localVue
    });

    const expectedLength =
      wrapper.vm.$store.state.scheduledAppointments.length - 1;
    wrapper.vm.deleteSchedule("sched-1");
    assert.equal(
      expectedLength,
      wrapper.vm.$store.state.scheduledAppointments.length
    );
  });
});
