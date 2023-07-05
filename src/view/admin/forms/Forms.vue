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
                <table class="min-w-full text-left text-sm font-light rounded">
                  <thead class="border-b font-medium dark:border-neutral-500 bg-zinc-100 rounded">
                  <tr>
                    <th scope="col" class="px-6 py-4 text-center">نام کسب و کار</th>
                    <th scope="col" class="px-6 py-4 text-center">نام نماینده کسب و کار</th>
                    <th scope="col" class="px-6 py-4 text-center">عملیات</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr
                      class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 hover:text-white dark:border-neutral-500 dark:hover:bg-neutral-600">
                    <td class="whitespace-nowrap px-6 py-4 font-medium text-center">صندلی سازی</td>
                    <td class="whitespace-nowrap px-6 py-4 text-center">امیرحسین محمدی</td>
                    <td class="whitespace-nowrap px-6 py-4 text-center flex justify-center">
                      <div class=" rounded text-white cursor-pointer flex justify-center gap-2">
                        <div class="px-2 py-1 rounded bg-red-600 text-white">حذف</div>
                        <div class="px-2 py-1 rounded bg-blue-600 text-white">مشاهده</div>
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
</template>

<script setup>


import Searchbox from "../../../components/ui/Searchbox.vue";
</script>

<style scoped>

</style>