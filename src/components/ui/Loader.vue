<template>
  <div class="loader rounded-full border-y-4 border-t-indigo-900"></div>
</template>

<script setup>

const props = defineProps(["color"])
console.log(props.color)

</script>

<style scoped>


.loader {
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}


</style>