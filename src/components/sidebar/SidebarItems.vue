<template>
  <div class="mt-16 text-zinc-900">
    <!--      dashboard-->
    <router-link to="/admin" active-class="text-blue-500"
                 class=" mr-10 flex cursor-pointer transition-all hover:text-blue-500">
      <div class="flex gap-4">
        <i>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"/>
          </svg>
        </i>
        <p>داشبورد</p>
      </div>

    </router-link>
    <hr class="mt-4 border-zinc-200">
    <!--    users-->
    <router-link to="/users" class=" mr-10 flex cursor-pointer transition-all hover:text-blue-500 mt-4" active-class="text-blue-500">
      <div class="flex gap-4">
        <i>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
          </svg>

        </i>
        <p>کاربران</p>
      </div>
    </router-link>
    <hr class="mt-4 border-zinc-200">
    <!--    forms-->
    <router-link to="/admin/forms" class=" mr-10 flex cursor-pointer transition-all hover:text-blue-500 mt-4" active-class="text-blue-500">
      <div class="flex gap-4">
        <i>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/>
          </svg>
        </i>
        <p>فرم ها</p>
      </div>
    </router-link>
    <hr class="mt-4 border-zinc-200">
    <!----- messages ------------>
    <router-link to="/admin/messages" class=" mr-10 flex cursor-pointer transition-all hover:text-blue-500 mt-4" active-class="text-blue-500">
      <div class="flex gap-4">
        <i>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
          </svg>
        </i>
        <p>پیام ها</p>
      </div>
    </router-link>
    <hr class="mt-4 border-zinc-200">
    <!--      logout-->
    <div class=" mr-10 mt-4 text-red-600 flex cursor-pointer transition-all hover:text-red-800" @click="logout">
      <div class="flex gap-4">
        <i>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd"
                  d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                  clip-rule="evenodd"/>
            <path fill-rule="evenodd"
                  d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
                  clip-rule="evenodd"/>
          </svg>
        </i>
        <p>خروج از حساب</p>
      </div>
    </div>

  </div>
</template>

<script setup>


import {ref} from "vue";
import {useAuthStore} from "../../store/auth.js";
import {useRouter} from "vue-router";
// items flag for oppening and closing users item
const usersItemFlag = ref(false)
const usersItemDropdown = ref(null);

const router = useRouter();

const authStore = useAuthStore();

// users toggle function
const usersSidebarToggle = () => {
  console.log(usersItemDropdown.value.style);
  if (usersItemFlag.value === true) {
    usersItemFlag.value = false;
    usersItemDropdown.value.style.transform = "rotateZ(0deg)";
    return;
  }
  if (usersItemFlag.value === false) {
    usersItemFlag.value = true;
    usersItemDropdown.value.style.transform = "rotateZ(180deg)";
  }
}

const logout = () => {
  authStore.stepLogin = 1;
  localStorage.removeItem("token");
  clearTimeout(authStore.tokenTimer);
  router.push("/auth")
}



</script>

<style scoped>

.bg-dark-custom {
  background: #191919;
}

.v-enter-active, .v-leave-active {
  transition: opacity linear 150ms;
}

.v-enter-from, .v-leave-to {
  opacity: 0;
}

</style>