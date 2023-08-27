<template>
  <div class="p-5">
    <div class="w-full">

      <p class="text-xl">فرم ها</p>

      <div class="flex justify-between items-end mt-5">
        <div class="flex justify-between items-center">
          <Searchbox />
          <RouterLink to="/admin/forms" class="px-5 py-2 border border-1 rounded border-indigo-900 text-indigo-900">
            بازگشت
          </RouterLink>
        </div>
      </div>


      <div class="bg-indigo-900 text-center w-full text-center my-10 p-5 text-white rounded" v-if="formStore.searchedData.length == 0">
        نتیجه ای برای جستجوی شما پیدا نشد
      </div>

      <div class="mt-5 w-full" v-else>
        <div class="flex flex-col">
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
                        <th>تلفت همراه</th>
                        <th>وضعیت</th>
                        <th>عملیات</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="formsData in formStore.searchedData" class="my-4">
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
                              <div class="bg-red-600 text-white p-2 rounded text-center cursor-pointer cursor-pointer" @click="deleteForm(formsData.form_id)">
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
      </div>
    </div>
  </div>
</template>

<script setup>

import Searchbox from "../../../components/ui/Searchbox.vue";
import {useFormsStore} from "../../../store/forms.js";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "../../../axios/index.js";
import {useAuthStore} from "../../../store/auth.js";



const formStore = useFormsStore();
formStore.fetchFormsData();

const router = useRouter();
const excelLink = ref("#")

const excelDownloadElement = ref(null);

const linkExport = async (link) => {
  excelLink.value = link;
}


const showForm = (id) => {
  router.push(`/admin/forms/${id}`)
}

const reciveExel = async () => {

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
    console.log(err)
  })
}

const deleteForm = () => {
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