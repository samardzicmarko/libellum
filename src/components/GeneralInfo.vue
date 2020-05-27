<template>
  <v-container>
    <v-form>
      <v-text-field
        v-on:change="sendData"
        v-model="info.ime"
        label="Ime i Prezime ili naizv Firme/Obrta"
        :rules="[rules.required, rules.ime]"
      ></v-text-field>
      <v-text-field
        v-on:change="sendData"
        v-model="info.email"
        label="E-mail"
        required
        :rules="[rules.required, rules.email]"
      ></v-text-field>
      <v-text-field v-model="info.oib" label="OIB" :rules="[rules.required,rules.oibID]"></v-text-field>
      <v-text-field
        v-on:change="sendData"
        v-model="info.ulica"
        maxlength="40"
        label="Adresa"
        :rules="[rules.required, rules.adresa]"
        required
      ></v-text-field>
      <v-text-field v-model="info.grad" label="Grad" required :rules="[rules.required, rules.grad]"></v-text-field>
      <v-text-field
        v-on:change="sendData"
        v-model="info.zip"
        label="Poštanski broj"
        required
        :rules="[rules.required, rules.zip]"
      ></v-text-field>
      <v-text-field
        v-on:change="sendData"
        v-model="info.mobitel"
        label="Broj mobitela"
        required
        :rules="[rules.required, rules.mobitel]"
      ></v-text-field>
    </v-form>
  </v-container>
</template>

<script>
const oib = require("oib.js");

export default {
  name: "generalInfo",
  props: {
    data: Object
  },

  data() {
    return {
      info: {
        ime: "",
        email: "",
        oibID: "",
        ulica: "",
        grad: "",
        zip: "",
        mobitel: ""
      },
      rules: {
        required: value => !!value || "Ovo polje je obavezno.",
        counter: value => value.length <= 40 || "Max 20 characters",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return (
            pattern.test(value) || "Molimo unesite ispravnu e-mail adresu."
          );
        },
        oibID: value => {
          return oib.validate(value) || "Neispravan OIB";
        }
      }
    };
  },
  methods: {
    sendData() {
      console.log("ovo je");
      this.$emit("dataSent", this.info);
    }
  }
};
</script>
<style scoped>
.container {
  padding-bottom: 0;
}
</style>