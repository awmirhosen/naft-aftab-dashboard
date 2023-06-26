import {defineStore} from "pinia";
import {axios} from "../axios/index.js";
import users from "../view/users/Users.vue";

const usersError = [
    {
        en: "user_email_exist",
        fa: "شما با این ایمیل ثبت نام کردید"
    },
    {
        en: "user_login_exist",
        fa: "شما با این شماره تلفن همراه ثبت نام کردید"
    },
]

const loginError = [
    {
        en: "send_token_otp_is_limited",
        fa: "بدلیل درخواست بیش از حد شما به 2 دقیقه محدودیت رسیدید"
    },
    {
        en: "user_login_not_exist",
        fa: "شماره وارد شده وجود ندارد، لطفا ثبت نام کنید"
    }
]

export const useAuthStore = defineStore("auth", {
    state: () => {
        return {
            loginCounterFlag: false,
            authStatus: "login",
            stepSignup: 1,
            stepLogin: 1,
            signupError: null,
        }
    },
    actions : {
        loginUser(otpData, loading) {
            axios.post("auth?method=send_mobile_token", otpData, {
                headers : {
                    "Content-Type" : "application/json"
                }
            }).then(res => {
                console.log(res)
                loading.value = false;
                this.stepLogin = 2;
            }).catch(err => {
                console.log(err)
                loginError.forEach(item => {
                    if (item.en === err.response.data.error_code ) {
                        console.log(item.fa);
                        this.signupError = item.fa;
                    }
                })
                loading.value = false;
            })
        },
        signupUser(data, loading, otpData) {
            console.log(otpData)
            this.signupError = null;
            axios.post("/auth?method=sign_up", data).then(res => {
                console.log(res);
                if (!res.data.error) {
                    axios.post("auth?method=send_mobile_token", otpData, {
                        headers : {
                            "Content-Type" : "application/json"
                        }
                    }).then(res => {
                        console.log(res)
                        loading.value = false;
                        this.stepSignup = 2;
                    }).catch(err => {
                        console.log(err)
                        this.signupError = "مشکلی در ارسال پیام پیش آمده"
                        loading.value = false;
                    })
                }
            }).catch(err => {
                loading.value = false;
                if (err.response.data.code > 499) {
                    this.signupError = "مشکلی در ارتباط با سرور پیش آمده است"
                }
                usersError.forEach(item => {
                    if (item.en === err.response.data.error_code ) {
                        console.log(item.fa);
                        this.signupError = item.fa;
                    }
                })
            })
        }
    }
})