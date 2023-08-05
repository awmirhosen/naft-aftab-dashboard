<template>
  Home
</template>

<script setup>
import {onBeforeMount} from "vue";
import {useFormsStore} from "../store/forms.js";

onBeforeMount(() => {

  const formStore = useFormsStore();
  formStore.fetchSingleFormData();

})
</script>

<style scoped>

</style>