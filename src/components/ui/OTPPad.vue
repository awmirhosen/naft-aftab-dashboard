<template>
<div class="text-center">
  <div ref="container" class="flex gap-4 items-center justify-center">
    <input
        v-for="n in length"
        :key="n" v-model="otpArray[n-1]"
        maxlength="1"
        type="text"
        class=" border-zinc-500 border-b w-10 p-2 text-center"
        @keyup="(e) => handleEnter(e, n-1)"
    />
  </div>
</div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useAuthStore} from "../../store/auth.js";

const otpProps = defineProps({
  length: {
    type: Number,
    default: 6,
  }
})
const otpArray = ref([]);
const container = ref(null);
const otpEmit = defineEmits(['entered'])

const authStore = useAuthStore();

onMounted(() => {
  for(let i =0; i < otpProps.length; i++){
    otpArray.value[i] = null
  }
})

const handleEnter = (e, i) => {
  const children = container.value.children;
  const keypressed = e.key;
  console.log(keypressed);

  if (i > 0 && (keypressed==="Backspace" || keypressed==="Delete")) {
    otpArray.value[i] = null
    setTimeout(() => {
      children[i-1].focus()
    }, 10)
  }

  else {
    const matches = keypressed.match(/^[0-9]$/);
    if (!matches) {
      otpArray.value[i] = null;
      return;
    }
    else if (i < otpProps.length - 1 ) {
      setTimeout(() => {
        children[i + 1].focus();
      }, 100)
    }
    checkOTP()
    authStore.otpvalue = otpArray.value.join('');
    console.log(authStore.otpvalue)

  }

  function checkOTP(){
    const children = container.value.children

    let flag = true;

    for(let i=0; i < otpProps.length -1; i++){
      if(otpArray.value[i] == null)
      {
        children[i].classList.add('border-red-500')
        flag = false
      }
      else {
        children[i].classList.remove('border-red-500')
      }
    }

    if(flag)
      otpEmit('entered', otpArray.value.join(''))
  }

}

</script>

<style scoped>

</style>