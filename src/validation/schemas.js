import {reactive} from "vue";
import * as Yup from "yup";

export const phoneSchema = reactive({
    user_login : Yup.string().required("تلفن همراه خود را وارد کنید").matches(/^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$/, "شماره تلفن معتبر نمیباشد"),
})

export const signupShcema = reactive({
    user_login: Yup.string().required("لطفا تلفن خود را وارد کنید").matches(/^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$/, "شماره تلفن معتبر نمی باشد"),
    user_nicename: Yup.string().required("لطفا نام و نام خانوادگی خود را وارد کنید"),
    user_email: Yup.string().required("لطفا ایمیل خود را وارد کنید").email("فرمت وارد شده صحیح نمیباشد").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "فرمت وارد شده صحیح نمی باشد"),
})