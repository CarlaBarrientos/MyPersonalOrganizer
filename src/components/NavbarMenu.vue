<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="text-capitalize grey--text"
        >My Personal Organizer</v-toolbar-title
      >
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-title>{{ link.text }}</v-list-item-title>
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
        { text: "Appointments", route: "/" },
        { text: "Agendas", route: "/agendas" },
        { text: "Scheduled", route: "/appointments" },
        { text: "Recursive", route: "/recursive" },
        { text: "Postponed", route: "/postponed" },
        { text: "Participants", route: "/participants" }
      ]
    };
  }
};
</script>
