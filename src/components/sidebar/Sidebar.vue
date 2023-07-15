<template>
  <div class=" custom-shadow-1 w-80 overflow-x-hidden h-screen">

    <div class="absolute left-0 top-2 left-2 block md:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-red-500" @click="() => authStore.sidebarFlag = false ">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>

    <!--    avatar component-->
    <SidebarAvatarAdmin v-if="userRole === 1" />
    <SidebarAvatar v-if="userRole === 2" />
    <!--    links and dropdowns-->

    <!--    link for admin-->
    <SidebarItems v-if="userRole === 1"/>
    <!--    links for client-->
    <SiderbarItemsClient v-if="userRole === 2" />

  </div>
</template>

<script setup>
import SidebarAvatar from "./SidebarAvatar.vue";
import RoundedDesignTop from "./RoundedDesignTop.vue";
import SidebarItems from "./SidebarItems.vue";
import {ref} from "vue";
import SiderbarItemsClient from "./SiderbarItemsClient.vue";
import SidebarAvatarAdmin from "./SidebarAvatarAdmin.vue";
import {useAuthStore} from "../../store/auth.js";


const userRole = ref(2);

const authStore = useAuthStore();


</script>


<style scoped>

</style>