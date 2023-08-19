<template>
  <div class=" bg-zinc-100 flex items-center p-2 text-md text-gray-400 rounded-md">
    <form class="w-full flex gap-2 items-center" @submit.prevent="submitSearch" >



      <div class="w-full flex">
        <input type="text" class="bg-zinc-100 w-full" placeholder="جستجو کنید..." v-model="searchInput">
        <div class="cursor-pointer">
          <button type="submit" class="bg-indigo-900 whitespace-nowrap rounded text-white py-3 px-5 w-24 text-center flex justify-center">
            <p v-if="!searchStatus">جستجو</p>
            <Loader v-else />
          </button>
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
import Loader from "./Loader.vue";

const formStore = useFormsStore();

const searchInput = ref("");
const router = useRouter();

const searchStatus = ref(false);

const submitSearch = () => {

  searchStatus.value = true;

  console.log(searchInput.value);
  axios.get(`/forms/?search=${searchInput.value}`).then(res => {
    console.log(res.data.result);
    formStore.searchedData = res.data.result;

    searchStatus.value = false;

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