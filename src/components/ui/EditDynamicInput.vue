<template>
  <section class="w-full flex justify-center items-center my-10 border p-4 border-zinc-200 rounded">
    <form class="w-full">
      <div class="form-group w-full">
        <label class="text-gray-600 font-semibold text-lg">محصولات / خدمات وارد شده توسط شما</label>
        <div class="input wrapper flex items-center w-full p-2 border border-zinc-300 rounded mt-4"
             v-for="(input, index) in inputArray"
             :key="`phoneInput-${index}`"
        >
          <input
              type="text"
              v-model="input.phone"
              @input="changeInput"
              class="h-10 rounded-lg outline-none w-full p-3"
              placeholder=" نام محصول"
          />
          <!--          Add Svg Icon-->
          <svg
              @click="addField(input, inputArray)"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              class="ml-2 cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
                fill="gray"
                d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
            />
          </svg>

          <!--          Remove Svg Icon-->
          <svg
              v-show="inputArray.length > 1"
              @click="removeField(index, inputArray)"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              class="ml-2 cursor-pointer"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
                fill="#EC4899"
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
            />
          </svg>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>


import {useFormsStore} from "../../store/forms.js";
import {onMounted, reactive} from "vue";

const formStore = useFormsStore();

const inputArray = reactive([]);

if (inputArray === []) {
  formStore.editFormData.business_property.forEach(item => {
    console.log(item);
    inputArray.push({phone: item})
  })
}else {
  console.log(inputArray);
}

onMounted(() => {

  if (formStore.editFormData.business_property !== []) {
    formStore.editFormData.business_property.forEach(item => {
      console.log(item);
      inputArray.push({phone: item})
    })
  }
})

console.log(inputArray)

const addField = (value, fieldType) => {
  fieldType.push({value: ""});
  console.log(inputArray);
  formStore.editInputArray = inputArray
};
const removeField = (index, fieldType) => {
  fieldType.splice(index, 1);
}

const changeInput = () => {
  formStore.editInputArray = inputArray
  console.log(formStore.editInputArray);
}


</script>

<style scoped>

</style>