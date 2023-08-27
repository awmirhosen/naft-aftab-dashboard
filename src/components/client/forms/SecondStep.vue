<template>
  <div class="step-2 w-full">
    <div class="w-full">
      <p class="text-center w-full my-2">برای پر کردن فیلدهایی که از اعداد استفاده میشود، حتما کیبورد خود را به حالت انگلیسی تغییر دهید</p>
      <div class="flex gap-3">
        <!--states-->
        <div class="mb-4 w-full">
          <div
              class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
              dir="rtl">
            <div class="w-full">
              <Field name="client_state" as="select" class="w-full p-2" :value="formStore.secondStepData.client_state">
                <option value="" :disabled="true" selected>*استان محل کسب و کار خود را انتخاب کنید</option>
                <option v-for="(state, index) in states" :key="index" :value="state.state" class="p-2">
                  {{ state.state }}
                </option>
              </Field>
            </div>
          </div>
          <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="client_state"/>
        </div>
        <div class="mb-4 w-full">
          <!--city input-->
          <div
              class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
              dir="rtl">
            <div class="w-full">
              <Field type="text"
                     :value="formStore.secondStepData.client_city"
                     name="client_city"
                     class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none"
                     placeholder="*نام شهر کسب و کار"/>
            </div>
          </div>
          <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="client_city"/>
        </div>
      </div>
    </div>

    <div class="w-full">
      <Field as="textArea" name="client_address" :value="formStore.secondStepData.client_address"
             class="w-full shadow-md rounded p-2 h-24 border border-zinc-200"
             placeholder="*ادرس دقیق محل کسب و کار را وارد کنید"/>
    </div>


    <div class="w-full">
      <div class="flex gap-4">
        <div class="mb-4 w-full">
          <!--postal code input-->
          <div
              class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
              dir="rtl">
            <div class="w-full">
              <Field type="text"
                     :value="formStore.secondStepData.client_postalcode"
                     name="client_postalcode"
                     class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none"
                     placeholder="* کد پستی محل کسب و کار را وارد کنید"/>
            </div>
          </div>
          <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="client_postalcode"/>
        </div>
        <div class="mb-4 w-full">
          <!--telephone code input-->
          <div
              class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
              dir="rtl">
            <div class="w-full">
              <Field type="text"
                     :value="formStore.secondStepData.client_telephone"
                     name="client_telephone"
                     class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none"
                     placeholder="* تلفن ثابت  را همراه با کد شهر وارد کنید"/>
            </div>
          </div>
          <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="client_telephone"/>
        </div>
      </div>
    </div>

    <div class="w-full">
      <div class="mb-4 w-full">
        <!--telephone code input-->
        <div class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
             dir="rtl">
          <div class="w-full">
            <Field type="text"
                   :value="formStore.secondStepData.client_fax"
                   name="client_fax"
                   class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none"
                   placeholder="فکس محل کسب و کار"/>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>

import {Field, ErrorMessage} from "vee-validate";
import {states} from "../../../utils/dummy.js";
import {useFormsStore} from "../../../store/forms.js";


const formStore = useFormsStore();

</script>

<style scoped>

</style>