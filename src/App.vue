<template>
  <v-container-fluid>
    <TheHeader />

    <v-app
      style=" background: #398C80;
    background: -webkit-linear-gradient(to right, #44A08D, #4AA585, #69BC84);
    background: linear-gradient(to right, #44A08D,#4AA585,#69BC84);"
    >
      <v-row>
        <v-col class="col-12">
          <router-view />
        </v-col>
      </v-row>
    </v-app>
    <div>
      <TheFooter id="footer" />
    </div>
  </v-container-fluid>
</template>
<script>
import TheHeader from "./components/Navigation/TheHeader.vue";
import TheFooter from "./components/Navigation/TheFooter.vue";

export default {
  components: {
    TheHeader,
    TheFooter
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
