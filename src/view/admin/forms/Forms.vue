<template>
  <div class="p-5">
    <div class="w-full">
      <div class="flex justify-between">
        <p class="text-xl">فرم ها</p>
        <Searchbox />
      </div>
      <div class="mt-5 w-full">
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div class="overflow-hidden">

                <div class="w-full mt-5 bg-zinc-100 rounded p-3">


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
                        <div class="bg-amber-400 rounded text-white py-2 text-center hover:bg-yellow-500 cursor-not-allowed" v-if="formsData.form_status == 0">در انتظار بررسی</div>
                        <div class="bg-green-600 rounded text-white py-2 text-center hover:bg-green-500 cursor-not-allowed" v-if="formsData.form_status == 1">تایید شده</div>
                        <div class="bg-red-600 rounded text-white py-2 text-center hover:bg-red-500 cursor-not-allowed" v-if="formsData.form_status == 3">دارای نقص فنی</div>
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
</template>

<script setup>

import Searchbox from "../../../components/ui/Searchbox.vue";
import {useFormsStore} from "../../../store/forms.js";
import {useRouter} from "vue-router";

const formStore = useFormsStore();
formStore.fetchFormsData();

const router = useRouter();


const showForm = (formId) => {
  router.push(`/admin/forms/${formId}`)
}



</script>

<style scoped>

</style>