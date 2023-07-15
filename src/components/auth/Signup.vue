<template>
  <div class="w-[30rem] rounded-md p-3">
    <!--    logo for login layout-->
    <div class="w-100 flex justify-center">
      <img src="../../../public/images/ui/naftaftab_logo.png" width="120" alt="Company Logo">
    </div>

    <div class="w-100 h-100" v-if="authStore.stepSignup === 1">
      <p class="text-md text-center w-100">خوش آمدید</p>
      <p class="text-sm text-center w-100">برای ثبت نام لطفا موارد زیر را وارد کنید</p>
      <!--      start sign up form-->
      <Form class="p-4" @submit="submitSignup" :validation-schema="signupShcema" >

        <div class="mb-4">
          <!--phone input-->
          <div class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
               dir="rtl">
            <div class="mr-2">
              <svg width="25" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/>
              </svg>
            </div>
            <div class="w-full">
              <Field type="text"
                     name="user_login"
                     class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none"
                     placeholder="تلفن همراه"/>
            </div>
          </div>
          <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="user_login"/>
        </div>

        <div class="mb-4">
          <!--fullname input-->
          <div class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
               dir="rtl">
            <div class="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
              </svg>
            </div>
            <div class="w-full">
              <Field type="text"
                     name="user_nicename"
                     class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none"
                     placeholder="نام و نام خانوادگی"/>
            </div>
          </div>
          <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="user_nicename"/>
        </div>

        <div class="mb-4">
          <!--fullname input-->
          <div class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
               dir="rtl">
            <div class="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
              </svg>
            </div>

            <div class="w-full">
              <Field type="text"
                     name="user_email"
                     class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none"
                     placeholder="ایمیل / پست الکترونیک"/>
            </div>
          </div>
          <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="user_email"/>
        </div>
        <button class="bg-indigo-900 text-white w-full mt-3 p-2 rounded hover:bg-indigo-800 transition-all" :disabled="loading">
          <div class="flex justify-center" v-if="loading">
            <Loader  />
          </div>
          <p v-else>ثبت نام</p>
        </button>
        <div class="flex justify-center items-center mt-3" v-if="authStore.signupError !== null ">
          <p class="text-red-600 text-center">{{ authStore.signupError }}</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-600 ml-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <p class="w-full text-center mt-3" @click="goToLogin">اگر قبلا ثبت نام کردید <span
            class="cursor-pointer text-blue-600">اینجا</span> کلیک کنید
        </p>
      </Form>
    </div>

    <!--- otp field --->
    <div class="p-3" v-if="authStore.stepSignup === 2">
      <p class="text-md mb-3 text-center">کد ارسال شده را وارد کنید</p>
      <OTPPad :length="6"/>
      <div class="flex justify-center text-blue-600 text-lg mt-8">
        <div class="flex justify-center items-center gap-2 w-full cursor-pointer" @click="sendOtpAgain" v-if="authStore.loginCounterFlag">
          <p class="text-sm">ارسال دوباره کد</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
          </svg>
        </div>
        <!--        countdown -->
        <Countdown v-else/>
      </div>
      <div class="flex justify-center">
        <button class="hover:bg-indigo-800 w-96 mx-auto transiton-all bg-indigo-900 text-white rounded w-full mt-4 py-2" @click="submitOtp" >
          <div class="flex justify-center" v-if="loading">
            <Loader />
          </div>
          <p v-else>تایید کد</p>
        </button>
      </div>
      <p class="text-center w-full text-red-600 mt-3">{{ authStore.signupError }}</p>
    </div>
  </div>

</template>

<script setup>
// import for veevalidate
import {Field, Form, ErrorMessage} from "vee-validate";
import {useAuthStore} from "../../store/auth.js";
import {signupShcema} from "../../validation/schemas.js";
import OTPPad from "../ui/OTPPad.vue";
import Countdown from "../ui/Countdown.vue";
import {ref} from "vue";
import Loader from "../ui/Loader.vue";
import router from "../../router/index.js";
const loading = ref(false);
// calling auth store in pinia
const authStore = useAuthStore();
// navigate user to login component
const user_login = ref("")
const goToLogin = () => {
  authStore.authStatus = "login";
}

const submitSignup = (values) => {
  authStore.signupError = null;
  loading.value = true;
  console.log(values)
  user_login.value = values.user_login
  const data = {
    request_params : values
  }
  const otpData = {
    request_params : {
      user_login: values.user_login
    }
  }
  authStore.signupUser(data, loading, otpData);
}

const submitOtp = () => {
  authStore.signupError = null;
  const data = {
    request_params : {
      user_login : user_login.value,
      token : authStore.otpvalue,
    }
  }

  authStore.otpSubmit(data, loading);
}

const sendOtpAgain = () => {
  authStore.signupError = null;
  const otpData = {
    request_params : {
      user_login: user_login.value
    }
  }
  authStore.loginCounterFlag = false;
  authStore.sendMobileToken(otpData, loading)
}

</script>

<style scoped>

</style>