<template>
  <v-app>
    <NavbarMenu />
    <v-main class="content">
      <router-view />
    </v-main>
  </v-app>
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
