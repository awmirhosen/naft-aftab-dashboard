<template>
  <div class="w-[22rem] rounded-md p-3">
    <!--    logo for login layout-->
    <div class="w-100 flex justify-center">
      <img src="../../../public/images/ui/naftaftab_logo.png" width="120" alt="Company Logo">
    </div>

    <div v-if="authStore.stepLogin === 1" class="w-100 h-100">
      <p class="text-md text-center w-100">خوش آمدید</p>
      <p class="text-sm text-center w-100">لطفا شماره تلفن خود را وارد کنید</p>
      <Form class="p-4" @submit="submitPhoneNumber" :validation-schema="phoneSchema">
        <div class="mb-4">
          <!--Large input-->
          <div class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
               dir="rtl">
            <div>
              <svg width="25" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/>
              </svg>
            </div>

            <div class="">
              <Field type="text"
                     name="user_login"
                     class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none"
                     placeholder="تلفن همراه خود را وارد کنید"/>
            </div>
          </div>
          <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="user_login"/>
          <button class="bg-indigo-900 text-white w-full mt-3 p-2 rounded hover:bg-indigo-800 transition-all">
            <p v-if="!loading">ارسال کد</p>
            <div v-if="loading" class="text-center flex justify-center">
              <Loader/>
            </div>
          </button>
        </div>
      </Form>

      <p class="w-full text-center text-red-600 mt-2">{{ authStore.signupError }}</p>

      <p class="w-full text-center mt-3" @click="goToSignup">اگر ثبت نام نکردید<span
          class="cursor-pointer mx-1 text-blue-600">اینجا</span>کلیک کنید</p>
    </div>

    <!--- otp field --->
    <div class="p-3" v-if="authStore.stepLogin === 2">
      <p class="text-md mb-3 text-center">کد ارسال شده را وارد کنید</p>
      <p class="w-full text-center my-3 text-red-600">{{ authStore.loginErrors }}</p>
      <OTPPad :length="6"/>
      <div class="flex justify-center text-blue-600 text-lg mt-8">
        <div class="flex justify-center items-center gap-2 w-full cursor-pointer" @click="resendLoginToken" v-if="authStore.loginCounterFlag">
          <p class="text-sm">ارسال دوباره کد</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
          </svg>
        </div>
        <!--- countdown --->
        <Countdown v-else/>
      </div>
      <button class="hover:bg-indigo-800 transiton-all bg-indigo-900 text-white rounded w-full mt-4 py-2"
              @click="sendLoginOtp">تایید کد
      </button>

      <button class="hover:bg-zinc-400 bg-zinc-300 w-96 mx-auto transiton-all text-black rounded w-full mt-4 py-2" @click="backToLogin" >
        <p>بازگشت</p>
      </button>

    </div>

  </div>
</template>

<script setup>

import {Form, Field, ErrorMessage} from "vee-validate";
import {phoneSchema} from "../../validation/schemas.js";
import OTPPad from "../ui/OTPPad.vue";
import {ref} from "vue";
import Countdown from "../ui/Countdown.vue";
import {useAuthStore} from "../../store/auth.js";
import Loader from "../ui/Loader.vue";
import {useRouter} from "vue-router";


const loading = ref(false);
const user_login = ref(null);

const phoneNumber = ref("");

const router = useRouter();


const authStore = useAuthStore();

authStore.signupError = "";
const submitPhoneNumber = (values) => {
  loading.value = true;
  phoneNumber.value = values.user_login;
  const otpData = {
    request_params: {
      user_login: values.user_login,
    }
  }
  user_login.value = values.user_login;
  authStore.sendMobileToken(otpData, loading);
}

const sendLoginOtp = () => {
  const loginOtpData = {
    request_params: {
      user_login: user_login.value,
      token: authStore.otpInput,
    }
  }
  authStore.loginUser(loginOtpData, loading)
  authStore.loginCounterFlag = true;

  console.log(authStore.jwtEncodeData)

}

const resendLoginToken = () => {
  const otpData = {
    request_params: {
      user_login: phoneNumber.value,
    }
  }
  authStore.sendMobileToken(otpData, loading);
  authStore.loginCounterFlag = false;
}

const goToSignup = () => {
  authStore.stepSignup = 1;
  authStore.authStatus = "signup"
}

const backToLogin = () => {
  authStore.stepLogin = 1;
}

</script>

<style scoped>

</style>