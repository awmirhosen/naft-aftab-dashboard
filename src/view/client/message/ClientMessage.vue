<template>
  <div class="w-full p-8">
    <p class="text-xl">پیام های ارسال شده از طرف مدیریت برای شما</p>
    <div class="w-full">
      <!--      date and name-->
      <div class="flex items-center mt-10 gap-2 text-zinc-400">
        <p>ارسال شده توسط ادمین در تاریخ</p>
        <p class="text-blue-400">1402/2/2</p>
      </div>

      <!--      avatar and message box-->
      <div class="w-full flex items-start gap-2">
        <div class="p-2 border-4 border-indigo-900 rounded-full mt-4">
          <img src="../../../../public/images/ui/user_pic.svg" width="30" alt="avatar">
        </div>
        <div>
          <div class="w-full p-5 bg-indigo-900 mt-4 rounded-md text-white">
            سلام، ما اینجا پیام های مهمی که قراره دریافت کنید رو بهتون نمایش میدیم.
          </div>
          <p class="w-full text-left text-zinc-400 text-sm">14:30</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>