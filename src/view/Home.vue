<template>
  <div class="w-full h-screen flex justify-center items-center absolute z-10 right-0 bg-white" style="z-index: 10;">
    <div class="text-3xl">
      در حال دریافت اطلاعات...
    </div>
  </div>
</template>

<script setup>
import {useAuthStore} from "../store/auth.js";
import {useRouter} from "vue-router";
import {onBeforeMount} from "vue";


const authStore = useAuthStore();

const router = useRouter();


localStorage.removeItem("token")
router.push("/auth")



if (localStorage.getItem("user_role") === '1') {
  router.push("/admin")
}else {
  router.push("/bussiness")
}


</script>

<style scoped>

</style>