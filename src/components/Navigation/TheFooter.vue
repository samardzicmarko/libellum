<template>
  <div class="fluid-container">
    <v-footer color="#398C80">
      <v-card id="footercard" flat tile color="#398C80" class="white--text text-center">
        <div class="row">
          <div class="col-12">
            <v-card-title id="contactUS" class="justify-center">Imate pitanja ili prijedloge?</v-card-title>
            <v-card-text class="justify-center">Javite nam se: info@libellum.net</v-card-text>
          </div>
        </div>
        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} —
          <strong>Libellum</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
#footercard {
  width: 100%;
}
#contactUS {
  text-align: center;
  display: block;
}
</style>
