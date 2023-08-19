<template>
  <div class="p-5">
    <div class="w-full">

      <p class="text-xl">فرم ها</p>

      <div class="flex justify-between items-center mt-5">

        <div class="flex justify-between">
          <Searchbox />
        </div>

      </div>

      <a :href="excelLink" ref="excelDownloadElement">

      </a>

      <div class="mt-5 w-full flex gap-4 flex-col md:flex-row">

        <div class="flex flex-col w-full">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div class="overflow-hidden">

                <div class="w-full mt-5 bg-zinc-100 rounded p-3">
                <div class="w-full mt-5 bg-zaxiosinc-100 rounded p-3">


                  <table class="table-auto w-full">
                    <thead>
                    <tr>
                      <th>نام کسب و کار</th>
                      <th>نام صاحب کسب و کار</th>
                      <th>تلفن همراه</th>
                      <th>وضعیت</th>
                      <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="formsData in formStore.formsData" class="my-4">
                      <td class="text-center">{{ formsData.business_name }}</td>
                      <td class="text-center">{{ formsData.business_agent}}</td>
                      <td class="text-center">{{ formsData.business_mobile}}</td>
                      <td>
                        <div class="bg-red-600 rounded text-white py-2 text-center hover:bg-red-500 cursor-not-allowed" v-if="formsData.form_status == 0">تایید نشده</div>
                        <div class="bg-green-600 rounded text-white py-2 text-center hover:bg-green-500 cursor-not-allowed" v-if="formsData.form_status == 1">تایید شده</div>
                        <div class="bg-red-600 rounded text-white py-2 text-center hover:bg-red-500 cursor-not-allowed" v-if="formsData.form_status == 3">دارای نقص فنی</div>
                        <div class="bg-amber-600 rounded text-white py-2 text-center hover:bg-amber-500 cursor-not-allowed" v-if="formsData.form_status == 2">در انتظار بررسی</div>
                      </td>
                      <td>
                        <div class="flex gap-2 justify-center items-center ">
                          <div class="text-white p-2 rounded">
                            <div class="bg-blue-600 text-white p-2 rounded text-center cursor-pointer hover:bg-blue-700 cursor-pointer" @click="showForm(formsData.form_id)">
                              مشاهده
                            </div>
                          </div>

                          <div class="text-white p-2 rounded">
                            <div class="bg-red-600 text-white p-2 rounded text-center cursor-pointer hover:bg-red-700 cursor-pointer" @click="deleteForm(formsData.form_id)">
                              حذف
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
          </div>
        </div>
      </div>

        <div class="w-80 mt-7 mx-auto">
          <div class="w-full rounded px-2 py-5 border border-1">
            <div>
              <p class="mb-2">تاریخ مورد نظر را وارد کنید</p>
              <DatePicker v-model="date" clearable></DatePicker>
              <p class="text-center text-red-500">{{ dateError }}</p>
              <button @click="backAllForms" class="w-full py-2 mt-4 bg-red-600 rounded text-white" type="button" v-if="dateStatus" >پاک کردن</button>
              <button @click="filterFormByDate" class="w-full py-2 mt-4 bg-indigo-900 rounded text-white" type="button" v-else >اعمال تاریخ</button>
            </div>

            <div class="w-full mt-4">
<!--              <p class="mb-1">دریافت اکسل </p>-->
              <div class="w-full mt-2 text-center bg-green-600 hover:bg-green-700 text-white inline-block py-2 cursor-pointer rounded" @click="reciveExel">
                دریافت اکسل
              </div>
            </div>

            <div class="w-full mt-4">
              <p class="mb-2">وضعیت فرم ها</p>

              <div class="flex flex-col gap-y-3">
                <div class="flex">
                  <input @input="radioFormStatus" type="radio" name="hs-radio-vertical-group" class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-radio-vertical-group-1" checked value="all">
                  <label for="hs-radio-vertical-group-1" class="text-sm text-gray-500 ml-2 dark:text-gray-400 mr-2">همه</label>
                </div>

                <div class="flex">
                  <input @input="radioFormStatus" value="confirmed" type="radio" name="hs-radio-vertical-group" class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-radio-vertical-group-2">
                  <label for="hs-radio-vertical-group-2" class="text-sm text-gray-500 ml-2 dark:text-gray-400 mr-2">تایید شده</label>
                </div>

                <div class="flex">
                  <input @input="radioFormStatus" value="declined" type="radio" name="hs-radio-vertical-group" class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-radio-vertical-group-3">
                  <label for="hs-radio-vertical-group-3" class="text-sm text-gray-500 ml-2 dark:text-gray-400 mr-2">تایید نشده</label>
                </div>

                <div class="flex">
                  <input @input="radioFormStatus" value="waiting" type="radio" name="hs-radio-vertical-group" class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-radio-vertical-group-3">
                  <label for="hs-radio-vertical-group-3" class="text-sm text-gray-500 ml-2 dark:text-gray-400 mr-2">در انتظار بررسی</label>
                </div>

              </div>

            </div>

          </div>
        </div>
    </div>
  </div>
  </div>
</template>

<script setup>

import Searchbox from "../../../components/ui/Searchbox.vue";
import {useFormsStore} from "../../../store/forms.js";
import {useRouter} from "vue-router";
import axios from "../../../axios/index.js";
import DatePicker from '@alireza-ab/vue3-persian-datepicker';


import {reactive, ref} from "vue";
import {useAuthStore} from "../../../store/auth.js";
const date = ref("")

const formStore = useFormsStore();
formStore.fetchFormsData();

const router = useRouter();
const excelLink = ref("#")

const dateStatus = ref(false);

const excelDownloadElement = ref(null);

const linkExport = async (link) => {
   excelLink.value = link;
}


const showForm = (id) => {
  router.push(`/admin/forms/${id}`)
}

const reciveExel = async () => {

  if (date.value === "") {
    await axios.get("/forms?action=export_excel", {
      headers : {
        "Content-Type" : "application/force-download"
      }
    }).then(res => {
      console.log(res);

      excelLink.value = res.data.file_url;

      setTimeout(() => {
        excelDownloadElement.value.click();
      }, 600)


    }).catch(err => {
      console.log(err.data.code)
    })
  }else {
    console.log("date")
    await axios.get(`/forms?action=export_excel&date_from=${date.value[0]}&date_to=${date.value[1]}`, {
      headers : {
        "Content-Type" : "application/force-download"
      }
    }).then(res => {
      console.log(res);

      excelLink.value = res.data.file_url;

      setTimeout(() => {
        excelDownloadElement.value.click();
      }, 600)


    }).catch(err => {
      console.log(err)
    })
  }

}

const backAllForms = () => {
  formStore.formsData = formStore.formsDataAlternate;
  dateStatus.value = false;
  date.value = "";
  document.querySelector(".pdp-clear").click();
}

const dateError = ref("");

const filterFormByDate = () => {
  console.log(date.value[0])
  formStore.formsDataAlternate = formStore.formsData;

  axios.get(`/forms?date_from=${date.value[0]}&date_to=${date.value[1]}`).then(res => {
    console.log(res)
    dateStatus.value = true;
    dateError.value = "";
    formStore.formsData = res.data.result;
  }).catch(err => {
    dateError.value = "اطلاعاتی یافت نشد"
    console.log(err)
  })
}

const radioFormStatus = (e) => {

  console.log(formStore.formsDataAlternate)

  const filteredData = reactive([]);

  if (e.currentTarget.value === "declined") {
    formStore.formsDataAlternate.forEach(item => {
      if (item.form_status === '0') {
        filteredData.push(item);
        formStore.formsData = filteredData
        console.log(formStore.formsData)
      }
    })
  }else if (e.currentTarget.value === "waiting") {
    const filteredData = reactive([])
    formStore.formsDataAlternate.forEach(item => {
      if (item.form_status === '2') {
        filteredData.push(item);
        formStore.formsData = filteredData;
        console.log(formStore.formsData)
      }
    })
  } else if (e.currentTarget.value === "confirmed") {
    const filteredData = reactive([])
    formStore.formsDataAlternate.forEach(item => {
      if (item.form_status === '1') {
        filteredData.push(item);
        formStore.formsData = filteredData;
        console.log(formStore.formsData)
      }
    })
  }else {
    console.log("all 5")
    console.log(formStore.formsDataAlternate)
    formStore.formsData = formStore.formsDataAlternate;
  }

}

const authStore = useAuthStore();
const deleteForm = (id) => {
  axios.delete(`/forms/${id}`).then(res => {
    console.log(res)
    formStore.fetchFormsData();
  }).catch(err => {
    if (err.data.code === 401) {
      authStore.stepSignup = 1;
      authStore.stepLogin = 1;
      router.push("/auth")
    }
  })
}


</script>

<style scoped>

</style>