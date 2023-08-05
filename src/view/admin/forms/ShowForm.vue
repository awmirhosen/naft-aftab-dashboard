<template>
  <div class="w-full p-5 my-10">
    <div>
      <h2 class="text-3xl text-blue-900">مشاهده و تغییر وضعیت فرم</h2>

      <div class="mt-5">

        <div class="flex gap-4 items-center">
          <p class="text-xl">نام صاحب کسب و کار : </p>
          <p>{{ formStore.singleFormData.business_agent }}</p>
        </div>

        <div class="flex gap-4 items-center mt-2">
          <p class="text-xl"> عنوان کسب و کار : </p>
          <p>{{ formStore.singleFormData.business_name }}</p>
        </div>

        <div class="flex gap-4 items-center mt-2">
          <p class="text-xl"> ایمیل کسب و کار : </p>
          <p>{{ formStore.singleFormData.business_email }}</p>
        </div>

        <div class="flex gap-4 items-center mt-2">
          <p class="text-xl"> جنسیت : </p>
          <p v-if="formStore.singleFormData.agent_gender === 'male' " >مذکر</p>
          <p v-if="formStore.singleFormData.agent_gender === 'female' " >مونث</p>
        </div>

        <div class="flex gap-4 items-center mt-2">
          <p class="text-xl"> استان : </p>
          <p>{{ formStore.singleFormData.business_state }}</p>
        </div>

        <div class="flex gap-4 items-center mt-2">
          <p class="text-xl"> شهر : </p>
          <p>{{ formStore.singleFormData.business_city }}</p>
        </div>

        <div class="flex gap-4 items-center mt-2">
          <p class="text-xl">آدرس : </p>
          <p>{{ formStore.singleFormData.business_address }}</p>
        </div>

        <div class="flex gap-4 items-center mt-2">
          <p class="text-xl">فکس : </p>
          <p>{{ formStore.singleFormData.business_fax }}</p>
        </div>

        <div class="flex gap-4 items-center mt-2">
          <p class="text-xl">کد پستی : </p>
          <p>{{ formStore.singleFormData.business_postal_code }}</p>
        </div>

        <div class="flex gap-4 items-center mt-2">
          <p class="text-xl">تلفن ثابت : </p>
          <p>{{ formStore.singleFormData.business_tel }}</p>
        </div>

        <div class="flex gap-4 items-center mt-2">
          <p class="text-xl">نوع کسب و کار : </p>
          <p v-if="formStore.singleFormData.business_type === 'product' ">محصول</p>
          <p v-else>خدمات</p>
        </div>

        <div class="flex gap-4 items-center mt-2">
          <p class="text-xl">زیر مجموعه کسب و کار : </p>
          <p>تکنولوژی</p>
        </div>

        <div class="flex gap-4 items-center mt-2">
          <p class="text-xl">نمونه خدمات / محصولات : </p>
          <div class="flex flex-wrap gap-2">
            <p class="px-3 py-1 border border-2 rounded" v-for="property in formStore.singleFormData.business_property">
              {{property}}
            </p>
          </div>
        </div>

        <div class="flex mt-4 gap-4">
          <button class="bg-red-600 text-white px-3 py-2 rounded">رد کردن فرم</button>
          <button class="bg-green-600 text-white px-3 py-2 rounded" @click="confirmForm">تایید فرم</button>
          <button class="bg-amber-400 text-white px-3 py-2 rounded" @click="declineDoc">نقص مدارک</button>
          <button class="bg-zinc-600 text-white px-3 py-2 rounded">بازگشت</button>
        </div>

        <div class="w-full text-center my-2 bg-indigo-900 text-white">
          {{ message }}
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>

import {useFormsStore} from "../../../store/forms.js";
import {onBeforeMount, ref} from "vue";
import {useRoute} from "vue-router";
import {axios} from "../../../axios/index.js";

const formStore = useFormsStore();
const route = useRoute();
const message  = ref("")

onBeforeMount(() => {
  formStore.fetchSingleFormData(route.params.form_id);
})

const confirmForm = () => {
  axios.put("/forms", {
    request_params: {
      form_id: formStore.singleFormData.form_id,
      form_status: 1,
    }
  }).then(res => {
    message.value = "وضعیت فرم به حالت تاییده شده، تغییر پیدا کرد"
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}

const declineDoc = () => {
  axios.put("/forms", {
    request_params: {
      form_id: formStore.singleFormData.form_id,
      form_status: 1,
    }
  }).then(res => {
    message.value = "وضعیت فرم به حالت دارای نقص فنی تغییر پیدا کرد"
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}





</script>

<style scoped>

</style>