<template>
  <div>
    <v-toolbar color="#398C80">
      <router-link to="/">
        <v-toolbar-title id="brandName">Računko</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
};
</script>

<style>
#brandName {
  color: white;
  font-family: "Roboto";
  font-size: 20px;
  font-weight: 400;
}
</style>
