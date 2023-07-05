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

export const formSchema = reactive({
    client_bussiness_type: Yup.string().required("این فیلد الزامیست"),
    client_bussiness_subcategory: Yup.string().required("این فیلد الزامیست"),
})

export const firstStepFormSchema = reactive({
    client_full_name: Yup.string().required("این فیلد الزامیست"),
    client_bussiness_name: Yup.string().required("این فیلد الزامیست"),
    client_phone: Yup.string().required("این فیلد اجباریست"),
    client_email: Yup.string().email("فرمت وارد شده صحیح نیست"),
    client_gender: Yup.string().required("انتخاب این فیلد الزامیست"),
})

export const secondStepFormSchema = reactive({
    client_state: Yup.string().required("انتخاب استان مورد نظر الزامیست"),
    client_city: Yup.string().required("انتخاب شهر استان مورد نظر الزامیست"),
    client_address: Yup.string().required("وارد کردن آدرس الزامیست"),
    client_postalcode: Yup.string().required("پر کردن کد پستی الزامیست").matches(/^[0-9]{5,10}$/, "کد پستی شما معتبر نیست"),
    client_telephone: Yup.string().required("پر کردن این فیلد الزامیست").matches(/^[0-9]{8,11}$/, "تلفن قابت معتبر نیست"),
    client_fax: Yup.string(),
})

export const thirdFormSchema = reactive({
    bussiness_type: Yup.string().required("این فیلد الزامیست"),
    client_bussiness_subcategory: Yup.string().required("پر کردن این فیلد الزامیست"),
})