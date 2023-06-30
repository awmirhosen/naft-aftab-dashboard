<template>

  <div class="w-11/12 mx-auto">
    <!--  dashboard header-->
    <DashboardHeader/>
    <!--    main content-->
    <div class="w-full mt-4">

      <Forms />

    </div>

  </div>

</template>

<script setup>

import DashboardHeader from "../components/dashboard/main/DashboardHeader.vue";
import Forms from "../components/dashboard/main/client/forms/Forms.vue";
</script>

<style scoped>

</style>