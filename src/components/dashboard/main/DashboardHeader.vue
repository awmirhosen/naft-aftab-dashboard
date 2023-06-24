<template>
  <div class="flex justify-between mt-8">
    <div class="flex items-center">
      <p class="text-white text-xl">داشبورد</p>
    </div>
    <div class="flex gap-4">
      <!--        searchbox-->
      <Searchbox />
      <!----notification---->
      <div class="p-2 rounded-md bg-zinc-100 relative text-gray-400">
        <span class="absolute bg-blue-600 inline-block w-3 h-3 rounded-xl"></span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import Searchbox from "../../ui/Searchbox.vue";

export default defineComponent({
  components: {Searchbox}
})
</script>

<style scoped>

</style>