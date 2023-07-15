<template>
  <div class="w-full p-8">
    <div class="flex justify-between">
      <p class="text-xl">پیام ها</p>
    </div>

    <div class="w-full mt-4 flex-col">
      <div class="flex items-center gap-3">
        <img src="../../../../public/images/ui/admin_icon.svg" width="30" alt="user pic">
        <div class="flex  flex-col justify-center bg-zinc-100 rounded p-1">
          <p class="w-full text-center">1402/5/1</p>
          <p class="w-full text-center">12:34</p>
        </div>
        <p class="p-2 bg-indigo-900 text-white rounded">همشونو حذف ویرایش کنی این پیام اول است بقیه پیام ها همینجوری زیر این می افته بعدش میتونی </p>
        <div class="flex items-center gap-2 mr-5">
          <p class="text-amber-400 cursor-pointer">ویرایش</p>
          <p class="text-red-600 cursor-pointer">حذف</p>
          <div class="text-center p-3">

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>

</script>

<style scoped>

</style>