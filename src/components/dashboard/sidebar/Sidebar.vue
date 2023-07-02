<template>
  <div class=" custom-shadow-1 relative w-80 overflow-x-hidden">
    <!--    avatar component-->
    <SidebarAvatar/>
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


const userRole = ref(2);


</script>


<style scoped>

</style>