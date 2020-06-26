import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Participants from "../views/Participants.vue";
import Scheduling from "../views/Scheduling.vue";
import PostponedAppointments from "../views/PpdAppointments.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/participants",
    name: "Participants",
    component: Participants
  },
  {
    path: "/appointments",
    name: "Scheduling",
    component: Scheduling
  },
  {
    path: "/postponed",
    name: "Postponed",
    component: PostponedAppointments
  }
];

const router = new VueRouter({
  routes
});

export default router;
