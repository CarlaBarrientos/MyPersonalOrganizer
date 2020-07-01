<template>
  <div id="app">
    <v-app>
      <NavbarMenu />
      <v-main class="content">
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>
<script>
import NavbarMenu from "@/components/NavbarMenu";
export default {
  name: "App",
  components: { NavbarMenu },
  data: () => ({
    //
  })
};
</script>
