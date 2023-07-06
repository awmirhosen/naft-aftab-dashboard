<template>
  <div>
    <!--  top bar of steps-->
    <div class="flex justify-center items-center gap-4 w-full">
      <div class="p-2 text-sm sm:text-xl whitespace-nowrap text-center">
        <div class="h-8 w-8 rounded-full mx-auto mb-4 flex items-center justify-center border-2"
             :class="step === 1 ? 'bg-indigo-900 border-zinc-100' : 'bg-zinc-200 border-zinc-900'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor"
               class="w-6 h-6"
               :class="step === 1 ? 'text-white' : 'text-black'"
          >
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"/>
          </svg>
        </div>
        <p class="">اطلاعات کسب و کار</p>
      </div>
      <div class="w-full h-1 bg-zinc-300 rounded-xl"></div>
      <div class="p-2 text-sm sm:text-xl whitespace-nowrap text-center">
        <div class="h-8 w-8 rounded-full mx-auto mb-4 flex items-center justify-center border-2"
             :class="step === 2 ? 'bg-indigo-900 border-zinc-100' : 'bg-zinc-200 border-zinc-900'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor"
               class="w-6 h-6"
               :class="step === 2 ? 'text-white' : 'text-black'"
          >
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"/>
          </svg>
        </div>
        <p class="">اطلاعات مکانی</p>
      </div>
      <div class="w-full h-1 bg-zinc-300 rounded-xl"></div>
      <div class="p-2 text-sm sm:text-xl whitespace-nowrap text-center">
        <div class="h-8 w-8 rounded-full mx-auto mb-4 flex items-center justify-center border-2"
             :class="step === 3 ? 'bg-indigo-900 border-zinc-100' : 'bg-zinc-200 border-zinc-900'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor"
               class="w-6 h-6"
               :class="step === 3 ? 'text-white' : 'text-black'"
          >
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"/>
          </svg>
        </div>
        <p class="">محصول و خدمات</p>
      </div>
    </div>
    <!--  end of top-->


    <div class="w-full mt-4">
      <!--      step 1-->
      <Form class="w-full" :validation-schema="firstStepFormSchema" @submit="submitFirstStepForm" v-if="step === 1">
        <FirstStep />
      </Form>
      <!--      step 2-->
      <Form @submit="submitSecondForm" :validation-schema="secondStepFormSchema" v-if="step === 2">
        <SecondStep />
        <div class="flex gap-3 flex-col">
          <button class="p-3 bg-indigo-900 text-white rounded" type="submit">مرحله بعدی</button>
          <button class="p-3 bg-zinc-300 text-black rounded" @click="() => step = 1">مرحله قبلی</button>
        </div>
        <p class="text-md w-full text-center mt-3">برای رفتن به مرحله ی بعدی فرم این قسمت را باید به صورت صحیح پر کنید در
          غیر این صورت به صفحه ی بعدی فرستاده نمی شوید</p>
        <p class="text-md w-full text-center text-blue-800">
          در صورت تمایل در مرحله ی بعدی باز هم میتوانید به این صفحه بازگردید
        </p>
      </Form>
      <!--      step 3-->
      <Form v-if="step === 3" @submit="submitThirdForm" :validation-schema="thirdFormSchema">
        <ThirdStep/>
        <div class="w-full text-red-600 text-center mb-3" v-if="productError">
          حداقل دو محصول یا خدمات را باید وارد کنید
        </div>
        <button type="submit" class="w-full p-2 mb-3 p-2 bg-indigo-900 text-white rounded hover:bg-indigo-800">ثبت اطلاعات</button>
        <button @click.prevent="() => step = 2" class="w-full bg-zinc-300 hover:bg-zinc-400 transition-all p-2 rounded">مرحله ی قبلی</button>
      </Form>

    </div>

  </div>
</template>

<script setup>
import { Form} from "vee-validate";
import {firstStepFormSchema, secondStepFormSchema, thirdFormSchema} from "../../../validation/schemas.js";
import {reactive, ref} from "vue";
import FirstStep from "./FirstStep.vue";
import ThirdStep from "./ThirdStep.vue";
import SecondStep from "./SecondStep.vue";
import {useFormsStore} from "../../../store/forms.js";
import {axios} from "../../../axios/index.js";

const productError = ref(false);

const step = ref(1);

const formStore = useFormsStore();


const submitFirstStepForm = (values) => {
  formStore.firstStepData = values;
  console.log(formStore.firstStepFiles)
  step.value = 2;
}


const submitSecondForm = (values) => {
  formStore.secondStepData = values
  step.value = 3;
}

const submitThirdForm = (values) => {

  console.log(formStore.property)

  if (formStore.property.length < 2) {
    productError.value = true;
    return
  }else {
    const productNames = reactive([]);
    formStore.property.forEach(item => {
      productNames.push(item.phone)
    })
    const category = ref("");
    if (values.client_bussiness_subcategory === "etc") {
      category.value = values.etc
    }else {
      category.value = Number(values.client_bussiness_subcategory);
    }

    const docIdArray = reactive([]);

    formStore.firstStepFiles.forEach(item => {
      docIdArray.push(item.id)
    })

    const catalogIdArray = reactive([]);
    formStore.thirdStepFiles.forEach(item => {
      catalogIdArray.push(item.id)
    })

    const allData = reactive({
      request_params: {
        business_name: formStore.firstStepData.client_bussiness_name,
        business_agent: formStore.firstStepData.client_full_name,
        business_email: formStore.firstStepData.client_email,
        agent_gender: formStore.firstStepData.client_gender,
        business_document: docIdArray,
        business_state: formStore.secondStepData.client_state,
        business_city: formStore.secondStepData.client_city,
        business_address: formStore.secondStepData.client_address,
        business_postal_code: formStore.secondStepData.client_postalcode,
        business_tel: formStore.secondStepData.client_telephone,
        business_fax: formStore.secondStepData.client_fax,
        business_type: values.bussiness_type,
        business_category: category.value,
        business_property: productNames,
        business_catalog: catalogIdArray,
      }
    })

    axios.post("forms", allData).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })

  }



}


</script>

<style scoped>
input:focus {
  outline: none !important;
}
</style>