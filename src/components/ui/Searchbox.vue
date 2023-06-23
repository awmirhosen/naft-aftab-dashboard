<template>
  <div class="w-64 bg-zinc-100 flex items-center p-2 text-md text-gray-400 rounded-md">
    <input type="text" class="bg-zinc-100 w-full" placeholder="جستجو کنید...">
    <div class="cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
           stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
      </svg>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
input:focus {
  outline: none;
}
</style>