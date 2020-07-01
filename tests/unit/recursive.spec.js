import { assert } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import CreateRecursiveDialog from "@/components/CreateRecursiveDialog.vue";
import DeleteRecursiveDialog from "@/components/DeleteRecursiveDialog.vue";

import Vuex from "vuex";

import actions from "@/store/actions.js";
import mutations from "@/store/mutations.js";
import getters from "@/store/getters.js";
import mockRecursive from "./mockRecursive";

describe("Recursive appointmets/meetings module", () => {
  let localVue;
  let store;

  beforeEach(() => {
    global.alert = message => {
      console.log(message);
    };
    localVue = createLocalVue();
    localVue.use(Vuex);

    store = new Vuex.Store({
      state: mockRecursive,
      actions,
      mutations,
      getters
    });
  });
  it("Validate empty data.", () => {
    const wrapper = mount(CreateRecursiveDialog, {
      store,
      localVue
    });
    const invalidData = wrapper.vm._validateData();
    assert.isFalse(invalidData);
  });
  it("Validate filled data", () => {
    const wrapper = mount(CreateRecursiveDialog, {
      store,
      localVue
    });

    wrapper.vm.$data.name = "Test";
    wrapper.vm.$data.description = "Trying our description";
    wrapper.vm.$data.begindate = "2020-06-28";
    wrapper.vm.$data.enddate = "2020-06-30";
    wrapper.vm.$data.startHour = "10:00";
    wrapper.vm.$data.endHour = "11:00";
    wrapper.vm.$data.agendaName = "Work";

    const validData = wrapper.vm._validateData();
    assert.isTrue(validData);
  });
  it("Add new recursive appointment", () => {
    const wrapper = mount(CreateRecursiveDialog, {
      store,
      localVue
    });

    wrapper.vm.$data.name = "Test";
    wrapper.vm.$data.description = "Trying our description";
    wrapper.vm.$data.begindate = "2020-06-28";
    wrapper.vm.$data.enddate = "2020-06-30";
    wrapper.vm.$data.startHour = "10:00";
    wrapper.vm.$data.endHour = "11:00";
    wrapper.vm.$data.agendaName = "Work";
    wrapper.vm.$data.repeatId = "Daily";
    wrapper.vm.$data.each = "";

    const expectedLength = wrapper.vm.$store.state.recursiveAppointments.length;
    const expectedLengthSched =
      wrapper.vm.$store.state.scheduledAppointments.length;
    wrapper.vm.addNewRecursive();
    assert.equal(
      wrapper.vm.$store.state.recursiveAppointments.length,
      expectedLength + 1
    );
    assert.equal(
      wrapper.vm.$store.state.scheduledAppointments.length,
      expectedLengthSched + 3
    );
  });
  it("Delete recursive appointment.", () => {
    const wrapper = mount(DeleteRecursiveDialog, {
      store,
      localVue
    });

    const expectedLength =
      wrapper.vm.$store.state.recursiveAppointments.length - 1;
    const expectedLengthSched =
      wrapper.vm.$store.state.scheduledAppointments.length - 3;
    wrapper.vm.deleteRecur("recursive-2");
    assert.equal(
      expectedLength,
      wrapper.vm.$store.state.recursiveAppointments.length
    );
    assert.equal(
      expectedLengthSched,
      wrapper.vm.$store.state.scheduledAppointments.length
    );
  });
});
