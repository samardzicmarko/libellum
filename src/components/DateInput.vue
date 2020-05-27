<template>
  <v-container>
    <v-row>
      <v-menu
        class="dateInput"
        ref="menu1"
        v-model="menu1"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
        v-on:change="passDate"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-on:change="passDate"
            class="dateInput"
            v-model="dateFormatted"
            label="Datum"
            :hint="hint"
            persistent-hint
            @blur="date = parseDate(dateFormatted)"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-on:change="passDate"
          v-model="date"
          no-title
          @input="menu1 = false"
        ></v-date-picker>
      </v-menu>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["hint"],
  data: (vm) => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    hintMessage: "test",
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    /* eslint-disable */
    date(val) {
      console.log("watch");
      this.dateFormatted = this.formatDate(this.date);
    },
    /* eslint-enable */
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${day.padStart(2, "0")}-${month.padStart(2, "0")}`;
    },
    passDate() {
      this.$emit("dateSent", this.formatDate(this.date));
    },
  },
  mounted() {
    this.passDate();
  },
};
</script>
<style></style>
