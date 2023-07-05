<template>
  <div class="w-full">
    <div class="w-full">
      <div class="flex gap-3">
        <div class="w-full">
          <Field name="bussiness_type" as="select" class="w-full bg-zinc-100 p-3 rounded"
                  @change="onchangeBussinesCategory" value="none">
            <option value="none" selected >انتخاب نوع کسب و کار</option>
            <option value="خدمات">خدمات</option>
            <option value="کالا">کالا</option>
          </Field>
          <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="client_bussiness_type"/>
        </div>
      </div>

      <div class="w-full mt-3">

        <div v-if="bussCategory === 1">
          <Field name="client_bussiness_subcategory" as="select" class="w-full bg-zinc-100 p-3 rounded"
                  @change="subcategoryChange">
            <option value="" selected >دسته بندی کالا</option>
            <option value="etc">سایر</option>
          </Field>
          <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right"
                        name="client_bussiness_subcategory"/>
        </div>
        <div v-if="bussCategory === 2">
          <Field as="select" name="client_bussiness_subcategory" class="w-full bg-zinc-100 p-3 rounded"
                  @change="subcategoryChange">
            <option value="" selected >دسته بندی خدمات</option>
            <option value="etc">سایر</option>
          </Field>
          <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right"
                        name="client_bussiness_subcategory"/>
        </div>
        <div v-if="bussCategory === 3">
          <select name="client_bussiness_subcategory" class="w-full bg-zinc-100 p-3 rounded" id="" :disabled="true">
            <option>لطفا اول نوع کسب و کار را در فیلد قبلی مشخص کنید</option>
          </select>
          <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right"
                        name="client_bussiness_subcategory"/>
        </div>

      </div>

      <div class="w-full p-2 shadow-md mt-5 rounded p-3 border-zinc-100 border" v-if="bussSubcategory">
        <Field class=" rounded w-full" name="client_bussiness_subcategory"
               placeholder="دسته بندی خود را وارد کنید"/>
      </div>
      <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right"
                    name="client_bussiness_subcategory"/>

      <div class="flex gap-3">
        <div class="w-full">
          <DynamicInput/>
          <ErrorMessage name="client_product" class="text-red-600"/>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import {Field, ErrorMessage, Form} from "vee-validate";
import DynamicInput from "../../ui/DynamicInput.vue";
import {ref} from "vue";

const bussCategory = ref(3)
const bussSubcategory = ref(false);

const subcategoryChange = (e) => {
  bussSubcategory.value = e.target.value === "etc";
}

const onchangeBussinesCategory = (e) => {
  console.log(e.target.value)
  if (e.target.value === "کالا") {
    bussCategory.value = 1;
    bussSubcategory.value = false;
  } else if (e.target.value === "خدمات") {
    bussCategory.value = 2;
    bussSubcategory.value = false;
  } else {
    bussCategory.value = 3;
    bussSubcategory.value = false;
  }
}

</script>

<style scoped>

</style>