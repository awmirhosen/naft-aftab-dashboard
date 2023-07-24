<template>
  <div class="p-5 w-full">
    <p class="text-xl mb-3">درخواست های کاربران</p>
    <div class="w-full flex justify-center gap-5">
      <div class="p-5 w-full bg-blue-200 shadow-md h-24 flex justify-center items-center rounded">
        <p>{{ formStore.formsData.length }} فرم ثبت شده</p>
      </div>
      <div class="p-5 w-full bg-amber-200 shadow-md h-24 flex justify-center items-center rounded">
        <p>{{ waitingCount }} فرم در انتظار بررسی هستند</p>
      </div>
      <div class="p-5 w-full bg-green-200 shadow-md h-24 flex justify-center items-center rounded">
        <p>0 فرم مورد بررسی شما قرار گرفته اند</p>
      </div>
      <div class="p-5 w-full bg-red-300 shadow-md h-24 flex justify-center items-center rounded">
        <p> 0 فرم دارای نقص فنی میباشند</p>
      </div>
    </div>
  </div>
  <div class="p-5 m-10 w-10/12 mx-auto rounded shadow-md bg-zinc-100">
    <div class="w-full flex justify-start text-xl gap-5">
      <div>
        <div class="bg-indigo-900 text-white mb-3 p-3 rounded text-center inline-block mt-1 cursor-pointer">
          <p>نوشتن پیام جدید</p>
        </div>
      <div>
        اخرین پیام ارسال شده توسط تیم مدیریت
      </div>
      </div>
    </div>
    <div class="flex mt-5 gap-3 items-center">
      <div>
        <img src="../../../public/images/ui/admin_icon.svg" width="40" alt="avatar admin">
      </div>
      <div class="p-5 inline-block bg-indigo-900 text-white rounded-xl flex">
        با استفاده از قسمت بارگذاری فایل در فورم شما میتوانید فایل های مورد نیاز خود در قسمت های مشخص شده را همراه با عنوان وارد کنید
      </div>
    </div>
    <div class="mt-2 mr-14">
      <p>تاریخ : 12 اسفند 1402</p>
      <p >ساعت : 21:30</p>
    </div>
  </div>
</template>

<script setup>

/// import pinia store
import {ref} from "vue";

const formStore = useFormsStore();
/// fetch form data from pinia store
formStore.fetchFormsData();

import {useFormsStore} from "../../store/forms.js";

const waitingCount = ref(0)

formStore.formsData.forEach(item => {
  if (item.form_status == 0) {
    waitingCount.value++;
  }
})





</script>

<style scoped>

</style>