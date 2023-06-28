<template>
  <div>
    {{ timeLeft }}
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {useAuthStore} from "../../store/auth.js";

const timerFlag = ref(false);

const selectedTime = ref(0);
const timeLeft = ref("00:00");
const authStore = useAuthStore();
var intervalTimer;

onMounted(() => {
  setTime(130)
})

const setTime = (seconds) => {
  clearInterval(intervalTimer);
  timer(seconds)
}

const timer = (seconds) => {
  const now = Date.now();
  const end = now + seconds * 1000;
  displayTimeLeft(seconds);
  countdown(end);
}

const countdown = (end) => {
  intervalTimer = setInterval(() => {
    const secondsLeft = Math.round((end - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(intervalTimer);
      authStore.loginCounterFlag = true;
      return;
    }
    displayTimeLeft(secondsLeft)
  }, 1000)
}

const displayTimeLeft = (secondsLeft) => {
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  timeLeft.value = `${zeroPaded(minutes)}:${zeroPaded(seconds)}`;
}

const zeroPaded = (num) => {
  // 4 --> 4
  return num < 10 ? `0${num}` : num;
}


</script>

<style scoped>

</style>