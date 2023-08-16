<template>
  Home
</template>

<script setup>
import {onBeforeMount} from "vue";
import {useAuthStore} from "../store/auth.js";
import {useRouter} from "vue-router";


const authStore = useAuthStore();

onBeforeMount(() => {

  const router = useRouter();

  authStore.checkAuthToken();

  router.push("/bussiness")



})
</script>

<style scoped>

</style>