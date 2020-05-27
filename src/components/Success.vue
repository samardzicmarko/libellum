<template>
  <div id="msg">
    <v-alert type="success">{{message}}</v-alert>
  </div>
</template>

<script>
export default {
  props: ["message"]
};
</script>

<style>
</style>