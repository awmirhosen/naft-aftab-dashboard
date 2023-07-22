<template>
  <div v-if="layout === 2">
    <Login />
  </div>
  <div class="flex min-h-screen relative" v-if="layout === 1" dir="rtl">
    <Sidebar class="absolute md:relative md:block bg-white z-10"
             :class="authStore.sidebarFlag ? 'block' : 'hidden' "
    />
    <!--  main content-->
    <div class="w-full">
      <div class="absolute right-2 top-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8" @click="openSidebar">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
        </svg>
      </div>
      <!--header-->
      <div class="mt-5">
        <RouterView></RouterView>
      </div>
      <!--content-->
    </div>
  </div>
</template>

<script setup>
import Sidebar from "./components/sidebar/Sidebar.vue";
import {useRoute} from "vue-router";
import {ref, watch} from "vue";
import Login from "./view/auth/Auth.vue";
import {useAuthStore} from "./store/auth.js";

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

const authStore = useAuthStore();

const openSidebar = () => {
  authStore.sidebarFlag = true;
}


</script>

<style>

</style>