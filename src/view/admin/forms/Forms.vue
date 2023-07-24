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
                      </td>
                      <td>
                        <div class="flex gap-2 justify-center items-center">
                          <div class="bg-blue-600 text-white p-2 rounded">
                            ویرایش
                          </div>
                          <div class="bg-red-600 text-white p-2 rounded">
                            حذف
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

const formStore = useFormsStore();
formStore.fetchFormsData();




</script>

<style scoped>

</style>