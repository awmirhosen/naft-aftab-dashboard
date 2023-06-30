<template>

  <!--  top bar of steps-->
  <div class="flex justify-center items-center gap-4 w-full">
    <div class="p-2 text-sm sm:text-xl whitespace-nowrap text-center">
      <div class="h-8 w-8 rounded-full mx-auto mb-4"
           :class="step === 1 ? 'bg-indigo-900' : 'bg-zinc-300'"
      ></div>
      <p class="">اطلاعات کسب و کار</p>
    </div>
    <div class="w-full h-1 bg-zinc-300 rounded-xl"></div>
    <div class="p-2 text-sm sm:text-lg whitespace-nowrap">
      <div class="h-8 w-8 rounded-full mx-auto mb-4"
           :class="step === 2 ? 'bg-indigo-900' : 'bg-zinc-300'"
      ></div>
      <p>اطلاعات مکانی</p>
    </div>
    <div class="w-full h-1 bg-zinc-300 rounded-xl"></div>
    <div class="p-2 text-sm sm:text-lg whitespace-nowrap">
      <div class="h-8 w-8 rounded-full bg-zinc-300 mx-auto mb-4"
           :class="step === 3 ? 'bg-indigo-900' : 'bg-zinc-300'"
      ></div>
      <p>محصولات و خدمات</p>
    </div>
  </div>
  <!--  end of top-->


  <div class="w-full mt-4">
    <Form class="w-full" :validation-schema="formSchema" @submit="submitForm">

      <!--      step 1-->
      <div v-if="step === 1" class="step-1">

        <div class="flex w-full gap-3">
          <div class="mb-4 w-full">
            <!--fullname input-->
            <div class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
                 dir="rtl">
              <div class="w-full">
                <Field type="text"
                       name="full_name"
                       class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none"
                       placeholder="نام کسب و کار*"/>
              </div>
            </div>
            <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="full_name"/>
          </div>
          <div class="mb-4 w-full">
            <!--bussiness input-->
            <div class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
                 dir="rtl">
              <div class="w-full">
                <Field type="text"
                       name="bussiness"
                       class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none"
                       placeholder="نام و نام خانوادگی نماینده کسب و کار *"/>
              </div>
            </div>
            <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="bussiness"/>
          </div>
        </div>

        <div class="flex w-full gap-3">
          <div class="mb-4 w-full">
            <!--dosable phone number-->
            <div class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
                 dir="rtl">
              <div class="w-full">
                <Field type="text"
                       value="09123260234"
                       :disabled="true"
                       name="phone"
                       class="w-full h-12 px-4 py-1 text-gray-400 bg-zinc-200 focus:outline-none"
                       placeholder="تلفن همراه*"/>
              </div>
            </div>
            <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="phone"/>
          </div>
          <div class="mb-4 w-full">
            <!--fullname input-->
            <div class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
                 dir="rtl">
              <div class="w-full">
                <Field type="text"
                       name="client_email"
                       class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none"
                       placeholder="لطفا ایمیل کاری کسب و کار خود را وارد کنید"/>
              </div>
            </div>
            <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="client_email"/>
          </div>
        </div>

        <div class="flex w-full gap-3 items-center">
          <div class="w-full">
            <div class="flex gap-2 items-center">
              <p class="text-lg ml-5">جنسیت:</p>
              <div>
                <Field name="client_gender"  class="ml-1" type="radio" value="male"/>
                مرد
              </div>
              <div>
                <Field name="client_gender" class="ml-1" type="radio" value="female"/>
                زن
              </div>
            </div>
            <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="client_gender"/>
          </div>

          <!--        file uploader-->
          <div class="w-full">
            <div class="w-full bg-zinc-100 p-2 border-zinc-900">
              برای بارگذاری فایل اینجا کلیک کنید
            </div>
          </div>

        </div>

        <button class="mt-10 bg-indigo-900 p-2 rounded text-white" @click="goToPlaceStep">مرحله ی بعدی</button>
      </div>
      <!--      step 2-->
      <div class="step-2 w-full" v-if="step === 2">

        <div class="w-full">
          <div class="flex gap-3">
            <!--states-->
            <div class="mb-4 w-full">
              <div class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
                   dir="rtl">
                <div class="w-full">
                  <select class="w-full p-2" name="client_state">
                    <option value="">استان محل کسب و کار خود را انتخاب کنید*</option>
                    <option v-for="(state, index) in states" :key="index" :value="state.state" class="p-2">
                      {{ state.state }}
                    </option>
                  </select>
                </div>
              </div>
              <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="client_state"/>
            </div>
            <div class="mb-4 w-full">
              <!--city input-->
              <div class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
                   dir="rtl">
                <div class="w-full">
                  <Field type="text"
                         name="client_city"
                         class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none"
                         placeholder="نام شهر کسب و کار*"/>
                </div>
              </div>
              <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="client_city"/>
            </div>
          </div>
        </div>

        <div class="w-full">
          <Field as="textArea" name="client_address" class="w-full shadow-md rounded p-2 h-24 border border-zinc-100"
                 placeholder="ادرس دقیق محل کسب و کار را وارد کنید*"/>
          <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="client_address"/>
        </div>


        <div class="w-full">
          <div class="flex gap-4">
            <div class="mb-4 w-full">
              <!--postal code input-->
              <div class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
                   dir="rtl">
                <div class="w-full">
                  <Field type="text"
                         name="client_postalcode"
                         class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none"
                         placeholder="کد پستی محل کسب و کار را وارد کنید *"/>
                </div>
              </div>
              <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="client_postalcode"/>
            </div>
            <div class="mb-4 w-full">
              <!--telephone code input-->
              <div class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
                   dir="rtl">
                <div class="w-full">
                  <Field type="text"
                         name="client_telephone"
                         class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none"
                         placeholder="تلفن ثابت محل کسب و کار را همراه با کد شهر وارد کنید *"/>
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
                       name="client_fax"
                       class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none"
                       placeholder="فکس محل کسب و کار"/>
              </div>
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <button class="p-3 bg-zinc-300 text-black rounded" @click="() => step = 1">مرحله قبلی</button>
          <button class="p-3 bg-indigo-900 text-white rounded" @click="() => step = 3">مرحله بعدی</button>
        </div>

      </div>
      <!--      step 3-->
      <div v-if="step === 3" class="w-full">
        <div class="w-full">
          <div class="flex gap-3">

            <div class="w-full">
              <select name="client_bussiness_type" class="w-full bg-zinc-100 p-3 rounded" @change="onchangeBussinesCategory">
                <option value="none">انتخاب نوع کسب و کار</option>
                <option value="خدمات" >خدمات</option>
                <option value="کالا">کالا</option>
              </select>
              <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="client_bussiness_type"/>
            </div>

            <div class="w-full">

              <div v-if="bussCategory === 1">
                <select name="client_bussiness_subcategory" class="w-full bg-zinc-100 p-3 rounded" @change="subcategoryChange">
                  <option>دسته بندی کالا</option>
                  <option value="etc">سایر</option>
                </select>
                <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="client_bussiness_subcategory"/>
              </div>
              <div v-if="bussCategory === 2">
                <select name="client_bussiness_subcategory" class="w-full bg-zinc-100 p-3 rounded" @change="subcategoryChange">
                  <option>دسته بندی خدمات</option>
                  <option value="etc">سایر</option>
                </select>
                <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="client_bussiness_subcategory"/>
              </div>
              <div v-if="bussCategory === 3">
                <select name="client_bussiness_subcategory" class="w-full bg-zinc-100 p-3 rounded" id="">
                  <option>لطفا اول نوع کسب و کار را در فیلد قبلی مشخص کنید</option>
                </select>
                <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="client_bussiness_subcategory"/>
              </div>

            </div>
          </div>

          <div class="w-full p-2 shadow-md mt-5 rounded p-3 border-zinc-100 border" v-if="bussSubcategory">
            <Field class=" rounded w-full" name="client_bussiness_subcategory" placeholder="دسته بندی خود را وارد کنید" />
          </div>
          <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="client_bussiness_subcategory"/>

          <div class="flex gap-3">
            <div class="w-full">
              <Test />
              <ErrorMessage name="client_product" class="text-red-600"/>
            </div>

            <div class="w-full">

            </div>

          </div>

        </div>
      </div>

      <button type="submit" class="bg-red-500">ggggggg</button>

    </Form>
  </div>


</template>

<script setup>
import {Field, Form, ErrorMessage} from "vee-validate";
import {formSchema} from "../../../../../validation/schemas.js";
import {ref} from "vue";
import {states} from "../../../../../utils/dummy.js";
import Test from "../../../../ui/Test.vue";

const step = ref(1);
const bussCategory = ref(3)
const bussSubcategory = ref(false);
const goToPlaceStep = () => {
  step.value = 2;
}

const onchangeBussinesCategory = (e) => {
  console.log(e.target.value)
  if (e.target.value === "کالا") {
    bussCategory.value = 1;
    bussSubcategory.value = false;
  }else if (e.target.value === "خدمات") {
    bussCategory.value = 2;
    bussSubcategory.value = false;
  }else {
    bussCategory.value = 3;
    bussSubcategory.value = false;
  }

}

const subcategoryChange = (e) => {
  bussSubcategory.value = e.target.value === "etc";
}

const submitForm = (values) => {
  console.log(values)
}


</script>

<style scoped>
input:focus {
  outline: none !important;
}
</style>