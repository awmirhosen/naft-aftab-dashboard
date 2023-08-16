<template>
  <div class=" bg-zinc-100 flex items-center p-2 text-md text-gray-400 rounded-md">
    <form class="w-full flex gap-2 items-center" @submit.prevent="submitSearch" >

      <button type="submit" class="bg-indigo-900 whitespace-nowrap rounded text-white py-3 px-5">
        جستجو
      </button>

      <div class="w-full flex">
        <input type="text" class="bg-zinc-100 w-full" placeholder="جستجو کنید..." v-model="searchInput">
        <div class="cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
          </svg>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>

import {ref} from "vue";
import axios from "../../axios/index.js";
import {useFormsStore} from "../../store/forms.js";
import {useRouter} from "vue-router";

const formStore = useFormsStore();

const searchInput = ref("");
const router = useRouter();

const submitSearch = () => {
  console.log(searchInput.value);
  axios.get(`/forms/?search=${searchInput.value}`).then(res => {
    console.log(res.data.result);
    formStore.searchedData = res.data.result;
    router.push("/admin/forms/search")
  }).catch(err => {
    console.log(err);
  })

}


</script>

<style scoped>
input:focus {
  outline: none;
}
</style>