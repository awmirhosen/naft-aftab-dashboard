<template>
  <div class="p-5">
    <div class="w-full">

      <p class="text-xl">فرم ها</p>

      <div class="flex justify-between items-center mt-5">

        <div class="px-5 bg-green-600 hover:bg-green-700 text-white inline-block py-2 cursor-pointer rounded" @click="reciveExel">
          دریافت اکسل
        </div>

        <div class="flex justify-between">
          <Searchbox />
        </div>
      </div>

      <a :href="excelLink" ref="excelDownloadElement">

      </a>

      <div class="mt-5 w-full">
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
                      <th>وضعیت</th>
                      <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="formsData in formStore.formsData" class="my-4">
                      <td class="text-center">{{ formsData.business_name }}</td>
                      <td class="text-center">{{ formsData.business_agent}}</td>
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
                              مشاهده و تفییر وضعیت
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
import axios from "../../../axios/index.js";
import {ref} from "vue";

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






</script>

<style scoped>

</style>