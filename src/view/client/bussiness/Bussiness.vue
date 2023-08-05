<template>
  <div class="p-5">
    <router-link to="/bussiness/add-form"
                 class=" border-4 border-indigo-900 border-dashed border hover:bg-zinc-100 cursor-pointer p-10 text-cenger flex justify-center items-center rounded text-indigo-900">
      <div class="flex flex-col justify-center w-full">
        <p class="w-full text-center text-3xl">برای پر کردن فرم کسب و کار اینجا کلیک کنید</p>
        <div class="w-full text-center flex justify-center mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-12 h-12">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
          </svg>
        </div>
      </div>
    </router-link>

    <div class="w-full">
      <p class="text-xl mt-5">مشاهده ی وضعیت فرم ها:</p>

      <div class="w-full text-center text-lg my-5 bg-blue-200 p-4 rounded " v-if="formStore.formsData === null">
        شما هنوز فرمی را ثبت نکردید
      </div>

      <div class="w-full mt-5 bg-zinc-100 rounded p-3" v-else>
        <table class="table-auto w-full text-center">
          <thead>
          <tr class="text-center">
            <th>نام کسب و کار</th>
            <th>نام صاحب کسب و کار</th>
            <th>وضعیت</th>
            <th>عملیات</th>
          </tr>
          </thead>
          <tbody class="mt-4">
          <tr v-for="formsData in formStore.formsData" class="mt-10">
            <td>{{ formsData.business_name }}</td>
            <td>{{ formsData.business_agent}}</td>
            <td>
              <div class="bg-amber-400 rounded text-white py-2" v-if="formsData.form_status == 0">در انتظار بررسی</div>
              <div class="bg-green-700 rounded text-white py-2" v-if="formsData.form_status == 1">تایید شده</div>
              <div class="bg-amber-400 rounded text-white py-2" v-if="formsData.form_status == 3">دارای نقص فنی</div>
            </td>
            <td>
              <div class="flex gap-2 justify-center items-center">
                <div class="text-white p-2 rounded">
                  <div class="bg-blue-600 text-white p-2 rounded">
                    ویرایش
                  </div>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup>
import {useFormsStore} from "../../../store/forms.js";

const formStore = useFormsStore();

const fetchForm = () => {
  if (localStorage.getItem("token") === null) {
    fetchForm();
    console.log("nayoomade")
  } else {
    formStore.fetchFormsData();
    console.log(localStorage.getItem("token"))
    console.log("oomad");
  }
}
fetchForm();

</script>

<style scoped>


</style>