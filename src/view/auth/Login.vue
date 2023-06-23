<template>
  <div class="w-full flex justify-center items-center h-screen">
    <div>
      <div class="bg-zinc-100 p-8 rounded-md mt-4 w-96">
        <div class="text-center flex justify-center">
          <img src="public/images/ui/naftaftab_logo.png" width="120" alt="logo">
        </div>
        <p class="text-xl w-full text-center mb-1">
          خوش آمدید
        </p>
        <p class="text-sm text-center">
          لطفا نام کاربری و رمز عبور خود را وارد کنید
        </p>
        <form class="text-center mt-4 w-full">
          <input type="text" class="bg-zinc-200 text-right rounded-md w-full p-3 border-1" placeholder=" نام کاربری خود را وارد کنید"  />
          <input type="password" class="bg-zinc-200 mt-4 text-right rounded-md w-full p-3 border-1" placeholder="رمز عبور خود را وارد کنید" />

          <p class="text-sm mt-3 text-blue-500 cursor-pointer">
            رمز عبور را فراموش کرده اید؟
          </p>

          <button type="submit" class="w-full p-3 bg-blue-800 mt-4 hover:bg-blue-700 transition-all rounded-md text-white">ورود</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

input:focus {
  outline: 1px solid lightgray;
}

</style>