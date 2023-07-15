import {defineStore} from "pinia";
import {axios} from "../axios/index.js";
import router from "../router/index.js";


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
            sidebarFlag : false,
            jwtEncodeData: {},
            userInfo: {
                user_id: "",
                user_role: "",
                user_fullname: "",
            },
            loginCounterFlag: false,
            authFlag: false,
            userRole: 1,
            authStatus: "login",
            stepSignup: 1,
            stepLogin: 1,
            signupError: null,
            otpvalue: null,
            tokenTimer: null,
        }
    },
    actions: {
        async otpSubmit(data, loading) {
            await axios.post("auth?method=verify_mobile", data).then(res => {
                console.log(res.data.jwt_token)
                localStorage.setItem("token", res.data.jwt_token);
                this.clearTokenTime();
                this.jwtEncode(localStorage.getItem("token"));
                console.log(this.userInfo)
                if (this.userInfo.user_role === "customer") {
                    router.push("/bussiness");
                }else if (this.userInfo.user_role === "admin") {
                    router.push("/admin");
                }
                this.authFlag = true;
                loading.value = false;
            }).catch(err => {
                console.log(err);
                if (err.response.data.error_code === "token_otp_not_valid") {
                    this.signupError = "کد وارد شده صحیح نمی باشد"
                    loading.value = false;
                } else if (err.response.data.error_code === "token_otp_is_expire") {
                    this.signupError = "زمان ارسال کد به پایان رسیده لطفا دوباره امتحان کنید"
                    loading.value = false;
                } else {
                    this.signupError = "در ارتباط با سرور مشکلی پیش آمده لطفا در زمان دیگری امتحان کنید"
                }
            })
        },
        async loginUser(loginOtpData, loading) {
            await axios.post("auth?method=verify_mobile", loginOtpData).then(res => {
                console.log("set item local")
                localStorage.setItem("token", res.data.jwt_token);
                this.clearTokenTime();
                this.jwtEncode(localStorage.getItem("token"));
                console.log(this.userInfo)
                if (this.userInfo.user_role === "customer") {
                    router.push("/bussiness");
                }else if (this.userInfo.user_role === "admin") {
                    router.push("/admin");
                }
                loading.value = false;
            }).catch(err => {
                console.log(err);
                if (err.response.data.error_code === "token_otp_not_valid") {
                    this.signupError = "کد وارد شده صحیح نمی باشد"
                    loading.value = false;
                } else if (err.response.data.error_code === "token_otp_is_expire") {
                    this.signupError = "زمان ارسال کد به پایان رسیده لطفا دوباره امتحان کنید"
                    loading.value = false;
                } else if (err.response.data.error_code === "mobile_is_already_confirmed") {
                    axios.post("auth?method=sign_in_with_token", loginOtpData).then(res => {
                        console.log(res)
                        localStorage.setItem("token", res.data.jwt_token);
                        this.clearTokenTime();
                        this.jwtEncode(localStorage.getItem("token"));
                        console.log(this.userInfo)
                        if (this.userInfo.user_role === "customer") {
                            router.push("/bussiness");
                        }else if (this.userInfo.user_role === "admin") {
                            router.push("/admin");
                        }
                        loading.value = false;
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    this.signupError = "در ارتباط با سرور مشکلی پیش آمده لطفا در زمان دیگری امتحان کنید"
                }
            })
        },
        async signupUser(data, loading, otpData) {
            await console.log(otpData)
            this.signupError = null;
            axios.post("/auth?method=sign_up", data).then(res => {
                console.log(res);
                if (!res.data.error) {
                    this.sendMobileToken(otpData, loading)
                }
            }).catch(err => {
                loading.value = false;
                if (err.response.data.code > 499) {
                    this.signupError = "مشکلی در ارتباط با سرور پیش آمده است"
                }
                usersError.forEach(item => {
                    if (item.en === err.response.data.error_code) {
                        console.log(item.fa);
                        this.signupError = item.fa;
                    }
                })
            })
        },
        async sendMobileToken(otpData, loading) {
            await axios.post("auth?method=send_mobile_token", otpData, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                console.log(res)
                loading.value = false;
                this.stepLogin = 2;
                this.stepSignup = 2;
            }).catch(err => {
                console.log(err.response.data.error_code)
                if (err.response.data.error_code === "user_login_not_exist") {
                    this.signupError = "این شماره همراه در سیستم موجود نمیباشد، لطفا ثبت نام کنید"
                    this.authStatus = "signup";
                } else {
                    this.signupError = "مشکلی در ارسال پیام پیش آمده"
                    loading.value = false;
                }
            })
        },
        jwtEncode(token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedToken = JSON.parse(window.atob(base64));

            this.userInfo.user_id = decodedToken.user_id;
            console.log(decodedToken.role.customer)
            if (decodedToken.role.customer) {
                console.log("customer")
                this.userInfo.user_role = "customer"
            }else {
                console.log("admin")
                this.userInfo.user_role = "admin"
            }

            console.log(decodedToken);
        },
        clearTokenTime() {
            this.tokenTimer = setTimeout(() => {
                localStorage.removeItem("token")
            }, 7200000)
        }
    }
})