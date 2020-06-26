import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils"; //shallowMount, mount
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
      name: "Dentist",
      description: "I need to go to dentist"
    };

    wrapper.vm.$data.code = ppdAppointment.code;
    wrapper.vm.$data.name = ppdAppointment.name;
    wrapper.vm.$data.description = ppdAppointment.description;
    wrapper.vm.postponeAppointment();

    const [
      appointmentToFound
    ] = wrapper.vm.$store.state.postponedAppointments.filter(
      app => app.code === ppdAppointment.code
    );
    //console.log("Probando: " + appointmentToFound.code);

    assert.equal(ppdAppointment.code, appointmentToFound.code);
    assert.equal(ppdAppointment.name, appointmentToFound.name);
    assert.equal(ppdAppointment.description, appointmentToFound.description);
  });

  it("Update a postponed appointment", () => {
    const wrapper = mount(UpdatePpdAppointmentDialog, {
      store,
      localVue
    });

    const ppdAppointment = {
      code: "sched-5",
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
    //console.log("Probando 2: " + appointmentToFound.name);

    assert.equal(ppdAppointment.code, appointmentToFound.code);
    assert.equal(ppdAppointment.name, appointmentToFound.name);
    assert.equal(ppdAppointment.description, appointmentToFound.description);
  });

  it("Delete a postponed appointment", () => {
    const wrapper = mount(DeletePpdAppointmentDialog, {
      store,
      localVue
    });

    const codeToDelete = "sched-6";
    wrapper.vm.deletePostponed(codeToDelete);

    const [
      appointmentToFound
    ] = wrapper.vm.$store.state.postponedAppointments.filter(
      app => app.code === codeToDelete
    );

    assert.isUndefined(appointmentToFound);
  });

  it("When enabling an appointment throw warning msg if the requiered fields are empty.", () => {
    //
  });

  it("Validate data when all fields are filled correctly.", () => {
    const wrapper = mount(EnablePpdAppointmentDialog, {
      store,
      localVue
    });

    const appointmentToEnable = {
      code: "sched-6",
      name: "University",
      description: "I need to go to my university",
      date: "2020-06-24",
      startHour: "14:00",
      endHour: "14:30",
      agendaId: "ANG-001"
    };
    wrapper.vm.$data.code = appointmentToEnable.code;
    wrapper.vm.$data.name = appointmentToEnable.name;
    wrapper.vm.$data.description = appointmentToEnable.description;
    wrapper.vm.$data.date = appointmentToEnable.date;
    wrapper.vm.$data.startHour = appointmentToEnable.startHour;
    wrapper.vm.$data.endHour = appointmentToEnable.endHour;
    wrapper.vm.$data.agendaId = appointmentToEnable.agendaId;
    const boolExpected = wrapper.vm._validateData();

    assert.isTrue(boolExpected);
  });

  it("Verify in the specified agenda if the postponed appointment was enabled correctly", () => {
    const wrapper = mount(EnablePpdAppointmentDialog, {
      store,
      localVue
    });

    const appointmentToEnable = {
      code: "sched-5",
      name: "Dentist",
      description: "I need to go to dentist",
      date: "2020-06-24",
      startHour: "12:00",
      endHour: "13:00",
      agendaId: "ANG-001"
    };
    wrapper.vm.$data.code = appointmentToEnable.code;
    wrapper.vm.$data.name = appointmentToEnable.name;
    wrapper.vm.$data.description = appointmentToEnable.description;
    wrapper.vm.$data.date = appointmentToEnable.date;
    wrapper.vm.$data.startHour = appointmentToEnable.startHour;
    wrapper.vm.$data.endHour = appointmentToEnable.endHour;
    wrapper.vm.$data.agendaId = appointmentToEnable.agendaId;
    wrapper.vm.addNewSchedule();

    const [
      appointmentToFound
    ] = wrapper.vm.$store.state.scheduledAppointments.filter(
      app => app.code === appointmentToEnable.code
    );
    //console.log("OBJ: " + JSON.stringify([wrapper.vm.$store.state.scheduledAppointments]));
    //console.log("Probando AQUI: " + appointmentToFound.code);

    assert.equal(appointmentToEnable.code, appointmentToFound.code);
    assert.equal(appointmentToEnable.name, appointmentToFound.name);
    assert.equal(
      appointmentToEnable.description,
      appointmentToFound.description
    );
    assert.equal(appointmentToEnable.date, appointmentToFound.date);
    assert.equal(appointmentToEnable.startHour, appointmentToFound.startHour);
    assert.equal(appointmentToEnable.endHour, appointmentToFound.endHour);
    assert.equal(appointmentToEnable.agendaId, appointmentToFound.agendaId);
  });
});
