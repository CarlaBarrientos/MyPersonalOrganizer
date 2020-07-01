import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import PostponeDialog from "@/components/PostponeAppointmentDialog.vue";
import EnablePpdAppointmentDialog from "@/components/EnablePpdAppointmentDialog.vue";
import DeletePpdAppointmentDialog from "@/components/DeletePpdAppointmentDialog.vue";
import UpdatePpdAppointmentDialog from "@/components/UpdatePpdAppointmentDialog.vue";

import Vuex from "vuex";

import actions from "@/store/actions.js";
import mutations from "@/store/mutations.js";
import getters from "@/store/getters.js";
import mockPostponing from "./mockPostponing";

describe("Postponing appointmets module", () => {
  let localVue;
  let store;

  beforeEach(() => {
    global.alert = message => {
      console.log(message);
    };
    localVue = createLocalVue();
    localVue.use(Vuex);

    store = new Vuex.Store({
      state: mockPostponing,
      actions,
      mutations,
      getters
    });
  });

  it("Verify if an appointment was successfuly postponed", () => {
    const wrapper = mount(PostponeDialog, {
      store,
      localVue
    });

    const ppdAppointment = {
      code: "sched-1",
      name: "Testing",
      description: "I am testing"
    };
    const expectedPpdCode = "schedPostponed-4";

    wrapper.vm.$data.code = ppdAppointment.code;
    wrapper.vm.$data.name = ppdAppointment.name;
    wrapper.vm.$data.description = ppdAppointment.description;
    wrapper.vm.postponeAppointment();
    const [
      appointmentToFound
    ] = wrapper.vm.$store.state.postponedAppointments.filter(
      app => app.code === expectedPpdCode
    );
    //console.log("Probando 1: " + JSON.stringify(wrapper.vm.$store.state.postponedAppointments));

    assert.equal(expectedPpdCode, appointmentToFound.code);
    assert.equal(ppdAppointment.name, appointmentToFound.name);
    assert.equal(ppdAppointment.description, appointmentToFound.description);
  });

  it("Update a postponed appointment", () => {
    const wrapper = mount(UpdatePpdAppointmentDialog, {
      store,
      localVue
    });

    const ppdAppointment = {
      code: "schedPostponed-1",
      name: "Updating",
      description: "Checking if it was updated"
    };

    wrapper.vm.$data.code = ppdAppointment.code;
    wrapper.vm.$data.name = ppdAppointment.name;
    wrapper.vm.$data.description = ppdAppointment.description;
    wrapper.vm.updatePostponed();

    const [
      appointmentToFound
    ] = wrapper.vm.$store.state.postponedAppointments.filter(
      app => app.code === ppdAppointment.code
    );
    //console.log("Probando 2: " + JSON.stringify(wrapper.vm.$store.state.postponedAppointments));

    assert.equal(ppdAppointment.code, appointmentToFound.code);
    assert.equal(ppdAppointment.name, appointmentToFound.name);
    assert.equal(ppdAppointment.description, appointmentToFound.description);
  });

  it("Delete a postponed appointment", () => {
    const wrapper = mount(DeletePpdAppointmentDialog, {
      store,
      localVue
    });

    const codeToDelete = "schedPostponed-2";
    wrapper.vm.deletePostponed(codeToDelete);

    const [
      appointmentToFound
    ] = wrapper.vm.$store.state.postponedAppointments.filter(
      app => app.code === codeToDelete
    );

    //console.log("Probando 3: " + JSON.stringify(wrapper.vm.$store.state.postponedAppointments));
    assert.isUndefined(appointmentToFound);
  });

  it("Validate data when all fields are filled correctly.", () => {
    const wrapper = mount(EnablePpdAppointmentDialog, {
      store,
      localVue
    });

    const appointmentToEnable = {
      code: "schedPostponed-3",
      name: "University",
      description: "I need to go to my university",
      date: "2020-06-24",
      startHour: "14:00",
      endHour: "14:30",
      agendaName: "Work"
    };
    wrapper.vm.$data.code = appointmentToEnable.code;
    wrapper.vm.$data.name = appointmentToEnable.name;
    wrapper.vm.$data.description = appointmentToEnable.description;
    wrapper.vm.$data.date = appointmentToEnable.date;
    wrapper.vm.$data.startHour = appointmentToEnable.startHour;
    wrapper.vm.$data.endHour = appointmentToEnable.endHour;
    wrapper.vm.$data.agendaName = appointmentToEnable.agendaName;
    const boolExpected = wrapper.vm._validateData();

    //console.log("Probando 4: " + JSON.stringify(wrapper.vm.$store.state.postponedAppointments));
    assert.isTrue(boolExpected);
  });

  it("Verify in the specified agenda if the postponed appointment was enabled correctly", () => {
    const wrapper = mount(EnablePpdAppointmentDialog, {
      store,
      localVue
    });

    const appointmentToEnable = {
      code: "schedPostponed-4",
      name: "Testing",
      description: "I am testing",
      date: "2020-06-24",
      startHour: "15:00",
      endHour: "16:00",
      agendaName: "Work3"
    };
    const expectedAgendaId = "ANG-3";
    const expectedschedId = "sched-4";
    const expectedCode = wrapper.vm._selfGenerateCode();

    wrapper.vm.$data.code = appointmentToEnable.code;
    wrapper.vm.$data.name = appointmentToEnable.name;
    wrapper.vm.$data.description = appointmentToEnable.description;
    wrapper.vm.$data.date = appointmentToEnable.date;
    wrapper.vm.$data.startHour = appointmentToEnable.startHour;
    wrapper.vm.$data.endHour = appointmentToEnable.endHour;
    wrapper.vm.$data.agendaName = appointmentToEnable.agendaName;
    wrapper.vm.addNewSchedule();

    const [
      appointmentToFound
    ] = wrapper.vm.$store.state.scheduledAppointments.filter(
      app => app.code === expectedCode
    );
    //console.log("Probando 5: " + JSON.stringify(wrapper.vm.$store.state.postponedAppointments));
    //console.log("Probando 5.1: " + JSON.stringify(wrapper.vm.$store.state.scheduledAppointments));

    assert.equal(expectedschedId, appointmentToFound.code);
    assert.equal(appointmentToEnable.name, appointmentToFound.name);
    assert.equal(
      appointmentToEnable.description,
      appointmentToFound.description
    );
    assert.equal(appointmentToEnable.date, appointmentToFound.date);
    assert.equal(appointmentToEnable.startHour, appointmentToFound.startHour);
    assert.equal(appointmentToEnable.endHour, appointmentToFound.endHour);
    assert.equal(expectedAgendaId, appointmentToFound.agendaId);
  });
});
