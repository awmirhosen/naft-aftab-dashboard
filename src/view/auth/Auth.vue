<template>
  <div class="w-100 flex justify-center items-center h-screen">
    <Login v-if="authStore.authStatus === 'login'"/>
    <Signup v-else/>

    <!--    <Loader />-->
  </div>
</template>

<script setup>
import Login from "../../components/auth/Login.vue";
import Signup from "../../components/auth/Signup.vue";
import {useAuthStore} from "../../store/auth.js";

const authStore = useAuthStore();

</script>

<style scoped>

</style>