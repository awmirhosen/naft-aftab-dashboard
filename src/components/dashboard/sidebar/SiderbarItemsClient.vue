<template>
  <div class="mt-16 text-zinc-900">
    <!--      dashboard-->
    <div class=" mr-10 flex cursor-pointer transition-all hover:text-blue-500">
      <router-link to="/bussiness" active-class="text-blue-600" class="flex gap-4">
        <i>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
          </svg>
        </i>
        <p>کسب و کار</p>
      </router-link>
    </div>
    <hr class="mt-4 border-zinc-200">
    <!--    users-->
    <div class=" mr-10 flex cursor-pointer transition-all hover:text-blue-500 mt-4">
      <div class="flex gap-4">
        <i>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        </i>
        <p>پیام ها</p>
      </div>

    </div>
    <hr class="mt-4 border-zinc-200">
    <!--    forms-->

    <!--      logout-->
    <div class=" mr-10 mt-4 text-blue-800 flex cursor-pointer transition-all hover:text-blue-500">
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
// items flag for oppening and closing users item
const usersItemFlag = ref(false)
const usersItemDropdown = ref(null);
// users toggle function
const usersSidebarToggle = () => {
  console.log(usersItemDropdown.value.style);
  if (usersItemFlag.value === true) {
    usersItemFlag.value = false;
    usersItemDropdown.value.style.transform = "rotateZ(0deg)"
    return;
  }
  if (usersItemFlag.value === false) {
    usersItemFlag.value = true;
    usersItemDropdown.value.style.transform = "rotateZ(180deg)"
  }
}

// items flag for oppening and closing product item
const ProducstItemFlag = ref(false)
const ProductsItemDropdown = ref(null);
// users toggle function
const productSidebarToggle = () => {
  console.log(ProductsItemDropdown.value.style);
  if (ProducstItemFlag.value === true) {
    ProducstItemFlag.value = false;
    ProductsItemDropdown.value.style.transform = "rotateZ(0deg)"
    return;
  }
  if (ProducstItemFlag.value === false) {
    ProducstItemFlag.value = true;
    ProductsItemDropdown.value.style.transform = "rotateZ(180deg)"
  }
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