//import { assert } from "chai";
import { createLocalVue } from "@vue/test-utils"; //shallowMount, mount
//import PpdAppointments from "@/views/PpdAppointments";

//import store from "@/store";
import Vuex from "vuex";

describe("Postponing appointmets module", () => {
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
  });

  it("Verify if an appointment was successfuly postponed", () => {
    //
  });

  it("Verify if the postponed appointment has only name and description", () => {
    //
  });

  it("Update a postponed appointment", () => {
    //
  });

  it("Delete a postponed appointment", () => {
    //
  });

  it("When enabling an appointment throw warning msg if the requiered fields are empty.", () => {
    //
  });

  it("Validate data when all fields are filled correctly.", () => {
    //
  });

  it("Verify in the specified agenda if the postponed appointment was enabled correctly", () => {
    //
  });
});