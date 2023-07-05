<template>
  <div v-if="layout === 2">
    <Login />
  </div>
  <div class="flex min-h-screen relative" v-if="layout === 1" dir="rtl">
    <Sidebar/>
    <!--  main content-->
    <div class="w-full">
      <!--    header-->
      <RouterView></RouterView>
      <!--    content-->
    </div>
  </div>
</template>

<script setup>
import Sidebar from "./components/sidebar/Sidebar.vue";
import {useRoute} from "vue-router";
import {ref, watch} from "vue";
import Login from "./view/auth/Auth.vue";

const route = useRoute();
const layout = ref(1)

watch(route, () => {
  switch (route.name) {
    case "auth":
      layout.value = 2;
      break;
    default:
      layout.value = 1;
      break;
  }


})


</script>

<style>

</style>