<template>
  <div>
    <v-app-bar color="blue" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="text-capitalize white--text"
        >My Personal Organizer</v-toolbar-title
      >
      <v-icon x-large color="black">mdi-calendar-clock</v-icon>
    </v-app-bar>

    <v-navigation-drawer
      class="light-blue darken-4"
      v-model="drawer"
      app
      temporary
    >
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            color="white"
            :to="link.route"
            :class="`pa-3 link ${link.text}`"
          >
            <v-list-item-title>{{ link.text }}</v-list-item-title>
            <v-icon color="white">{{ link.icon }}</v-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  name: "NavbarMenu",
  data() {
    return {
      drawer: false,
      links: [
        { text: "All Appointments", route: "/", icon: "mdi-alarm" },
        { text: "Agendas", route: "/agendas", icon: "mdi-calendar-star" },
        {
          text: "Scheduled",
          route: "/appointments",
          icon: "mdi-calendar-check"
        },
        { text: "Recursive", route: "/recursive", icon: "mdi-calendar-month" },
        { text: "Postponed", route: "/postponed", icon: "mdi-calendar-remove" },
        {
          text: "Participants",
          route: "/participants",
          icon: "mdi-account-supervisor"
        }
      ]
    };
  }
};
</script>
<style>
.link.Appointments {
  border-left: 4px solid #546e7a;
}
.link.Agendas {
  border-left: 4px solid #ffab00;
}
.link.Scheduled {
  border-left: 4px solid #ffb300;
}
.link.Recursive {
  border-left: 4px solid #ffd54f;
}
.link.Postponed {
  border-left: 4px solid #ffecb3;
}
.link.Participants {
  border-left: 4px solid #fff8e1;
}
</style>
