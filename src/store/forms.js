import {defineStore} from "pinia";
import {axios} from "../axios/index.js";
import router from "../router/index.js";


export const useFormsStore = defineStore("forms", {
    state: () => {
        return {
            modalFileInput: false,
            formsData: [],
            firstStepFiles: [],
            thirdStepFiles: [],
            property: [{value: "", phone: ""}],
            firstStepData: {
                client_full_name: "",
                client_bussiness_name: "",
                client_email: "",
                client_gender: "",
            },
            secondStepData: {
                client_state: "",
                client_city: "",
                client_address: "",
                client_postalcode: "",
                client_telephone: "",
                client_fax: "",
            },
        }
    },
    actions: {
        async sendMedia(formData, loading, mediaArray, errMessage, title, image, preview, image_list) {
            await axios.post("/media", formData).then(res => {
                loading.value = false;
                mediaArray.push({
                    url: `https://demo.aftabor.com/uploads/${res.data[0].media_link}`,
                    id: res.data[0].media_id
                })
                this.mediaMeta(res.data[0].media_id, title, mediaArray)
            }).catch(err => {
                if (err.response.data.code === 400) {
                    loading.value = false;
                    errMessage.value = "فایل معتبر نمیباشد، عکس یا داکیومنت وارد شده نمیتواند بیشتر از یک مگابایت باشد و یا فرمت غیر معتبر داشته باشد"
                } else {
                    loading.value = false;
                    errMessage.value = "مشکلی در ارسال پیش آمده";
                }
            })
        },
        async mediaMeta(mediaId, title, mediaArray, errMessage, image, preview, image_list) {
            await axios.post("/media?action=set_media_meta", {
                request_params: {
                    media_id: mediaId,
                    meta_key: "media_caption",
                    meta_value: title,
                }
            }).then(res => {
                this.reset(errMessage, image, preview, image_list)
                this.modalFileInput = false;
                this.firstStepFiles = mediaArray;
            }).catch(err => {
                console.log(err);
            })
        },
        reset(errMessage, image, preview, image_list) {
            errMessage.value = false;
            image.value = null;
            preview.value = null;
            image_list.value = null;
            preview.value = null;
        },
        async fetchFormsData() {
            await axios.get("/forms").then(res => {
                console.log(res)
                this.formsData = res.data.result
                console.log(res.data.result)
            }).catch(err => {
                console.log(err);
                if (err.response.data.code === 401) {
                    localStorage.removeItem("token");
                    router.push("/auth");
                }else if (err.response.data.code === 404 ) {
                    this.formsData = null
                }
            })
        }
    }
});