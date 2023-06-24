import {reactive} from "vue";
import * as Yup from "yup";

export const phoneSchema = reactive({
    phoneNumber : Yup.string().required("تلفن همراه خود را وارد کنید").matches(/^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$/, "شماره تلفن معتبر نمیباشد"),
})