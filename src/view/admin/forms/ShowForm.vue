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

        <div class="flex gap-4 items-center mt-2">
          <p class="text-xl">مدارک کسب و کار : </p>
          <div class="flex flex-wrap">
            <div v-for="docImages in formStore.singleFormData.business_document" class="p-2 border border-1 rounded">
              <img :src='imageBaseUrl+docImages.media_link' :alt="docImages.media_caption" class="h-36" />
              <p class="w-full text-center">{{ docImages.media_caption }}</p>
            </div>
          </div>
        </div>

        <div class="flex gap-4 items-center mt-2">
          <p class="text-xl">فایل محصولات : </p>
          <div class="flex flex-wrap">
            <div v-for="productImages in formStore.singleFormData.business_catalog" class="p-2 border border-1 rounded">
              <img :src='imageBaseUrl+productImages.media_link' :alt="productImages.media_caption" class="h-36" />
              <p class="w-full text-center">{{ productImages.media_caption }}</p>
            </div>
          </div>
        </div>

        <div class="flex justify-start w-full">
          <div class="p-5">
            <div class="px-5 py-2">

            </div>
          </div>
        </div>

        <div class="flex mt-4 gap-4">
          <div>
            <button class="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded" @click="confirmForm" v-if="formStore.singleFormData.form_status === '0' ">تایید فرم</button>
            <button v-else class="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded" @click="declineForm">رد کردن فرم</button>
          </div>
<!--          <button class="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded" @click="confirmForm">تایید فرم</button>-->
          <RouterLink to="/admin/forms">
            <button class="bg-zinc-600 text-white px-3 py-2 rounded" >بازگشت</button>
          </RouterLink>
        </div>

        <div class="w-full text-center my-2 text-blue-900 p-4 p-3 mt-4 rounded text-2xl">
          {{ message }}
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>

import {useFormsStore} from "../../../store/forms.js";
import {onBeforeMount, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import axios from "../../../axios/index.js";
import {useAuthStore} from "../../../store/auth.js";
import router from "../../../router/index.js";

const formStore = useFormsStore();
const route = useRoute();
const message  = ref("")



onBeforeMount(() => {
  formStore.fetchSingleFormData(route.params.form_id);
})

const imageBaseUrl = ref("https://demo.aftabor.com/uploads/")

const confirmForm = () => {
  axios.put("/forms/?action=update_form_status", {
    request_params: {
      form_id: formStore.singleFormData.form_id,
      form_status: 1,
      user_id: parseInt(formStore.singleFormData.user_id)
    }
  }).then(res => {
    message.value = "وضعیت فرم به حالت تاییده شده، تغییر پیدا کرد"

    formStore.formsData.forEach(item => {
      if (item.form_id == formStore.singleFormData.form_id ) {
        item.form_status = 1
        console.log(formStore.formsData)
      }
    })

    formStore.singleFormData.form_status = "1";
  }).catch(err => {
    console.log(err)
  })
}

const declineForm = () => {
  axios.put("/forms/?action=update_form_status", {
    request_params: {
      form_id: formStore.singleFormData.form_id,
      form_status: 0,
      user_id: parseInt(formStore.singleFormData.user_id)
    }
  }).then(res => {
    message.value = "وضعیت فرم به حالت عدم تایید تغییر پیدا کرد";

    formStore.formsData.forEach(item => {
      if (item.form_id == formStore.singleFormData.form_id ) {
        item.form_status = 0
        console.log(formStore.formsData)
      }
    })

    formStore.singleFormData.form_status = "0";
  }).catch(err => {
    if (err.response.data.code === 401) {
      localStorage.removeItem("token");
      router.push("/auth")
    }
  })
}




</script>

<style scoped>

</style>