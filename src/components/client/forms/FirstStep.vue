<template>
  <div class="step-1">

    <!--    modal of file input-->
    <div class="fixed top-0 left-0 flex justify-center items-center w-full h-screen bg-zinc-800/[0.7]"
         v-if="formStore.modalFileInput">
      <div class="w-96 rounded bg-white h-[500px] relative p-2">
        <div class="flex justify-between items-center">
          <p>آپلو کردن فایل</p>
          <div class="cursor-pointer" @click="closeFileModal">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-10 text-red-600 h-10">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
        </div>

        <div class="w-full text-center mt-4">
          <div id="app" class="container my-3">
            <div class="row ">
              <div class="col-md-5 offset-md-1">
                <form @submit.prevent="submitMedia" enctype="multipart/form-data">
                  <div class="form-group">
                    <input type="file" accept="image/*" ref="upload" @change="previewImage" class="custom-file-input"
                           id="my-file" name="buss_doc">
                    <div class=" p-2 mt-3">
                      <template v-if="preview">
                        <div class="flex justify-center gap-3 items-center">
                          <img :src="preview" class="img-fluid" width="80" alt="uploaded_file"/>
                          <div>
                            <p class="mb-0">نام فایل: {{ image.name }}</p>
                            <p class="mb-0">سایز فایل: {{ Math.floor(image.size / 1024) }}KB</p>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>

                  <div class="w-full">
                    <input ref="titleInput" type="text"
                           class="shadow-md border shadow-md w-10/12 text-sm p-2 border-zinc-300 rounded"
                           placeholder="عنوان فایل را وارد کنید*">
                  </div>

                  <div class="w-full text-center text-blue-600 text-md" v-if="loading">
                    در حال ارسال فایل...
                  </div>

                  <div class="w-full text-center flex justify-center gap-2 mt-4 items-center" v-if="percent > 0">
                    <p>{{ percent }} % </p>
                    <Loader />
                  </div>

                  <div class="absolute bottom-5 w-full">
                    <p class="text-red-600 text-sm" v-if="errMessage">{{ errMessage }}</p>
                    <p class="text-red-600 text-sm" v-if="titleInputError">وارد کردن عنوان برای فایل الزامیست</p>
                    <p class="text-red-600 text-sm" v-if="fileInputError">بارگذاری عکس الزامیست</p>
                    <button class="w-10/12 mt-2 bg-indigo-900 rounded p-1 text-white" type="submit">ثبت فایل</button>
                    <div class="w-10/12 mt-2 bg-zinc-200 rounded p-1 mx-auto cursor-pointer" @click="reset">پاک کردن
                      فایل
                    </div>
                  </div>

                </form>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>

    <!--    first step forms -->
    <div class="flex w-full flex-col gap-3 md:flex-row">
      <!--fullname input-->
      <div class="mb-4 w-full">
        <div class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
             dir="rtl">
          <div class="w-full">
            <Field type="text"
                   :value="formStore.firstStepData.client_full_name"
                   name="client_full_name"
                   class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none"
                   placeholder="* نام صاحب کسب و کار"/>
          </div>
        </div>
        <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="client_full_name"/>
      </div>
      <!--bussiness input-->
      <div class="mb-4 w-full">
        <div class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
             dir="rtl">
          <div class="w-full">
            <Field type="text"
                   :value="formStore.firstStepData.client_bussiness_name"
                   name="client_bussiness_name"
                   class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none"
                   placeholder=" * نام کسب و کار"/>
          </div>
        </div>
        <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="client_bussiness_name"/>
      </div>
    </div>

    <div class="flex w-full flex-col gap-3 md:flex-row">
      <div class="mb-4 w-full">
        <!--dosable phone number-->
        <div class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
             dir="rtl">
          <div class="w-full">
            <Field type="text"
                   :value="businessPhone"
                   :disabled="true"
                   name="client_phone"
                   class="w-full h-12 px-4 py-1 text-gray-400 bg-zinc-200 focus:outline-none"
                   placeholder="* تلفن همراه"/>
          </div>
        </div>
      </div>
      <div class="mb-4 w-full">
        <!--fullname input-->
        <div class="my-2 border mx-auto border-[2px] w-full justify-center flex items-center rounded-md shadow-md"
             dir="rtl">
          <div class="w-full">
            <Field type="text"
                   :value="formStore.firstStepData.client_email"
                   name="client_email"
                   class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none"
                   placeholder="* لطفا ایمیل کاری کسب و کار خود را وارد کنید"/>
          </div>
        </div>
        <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="client_email"/>
      </div>
    </div>

    <div class="flex w-full gap-3 ">
      <!--        gender selectbox-->
      <div class="w-full">
        <Field name="client_gender" :value="formStore.firstStepData.client_gender" as="select"
               class="w-full p-2 border border-zinc-200 rounded shadow-md">
          <option value="" selected>* لطفا جنسیت خود را انتخاب کنید</option>
          <option value="male">مذکر</option>
          <option value="female">مونث</option>
        </Field>
        <ErrorMessage name="client_gender" class="text-red-600 text-sm mt-2"/>
      </div>

    </div>

    <!--        file uploader-->
    <div class="w-full mt-5">

      <div class="text-center">
        <p class="mb-1">محل بارگذاری مستندات محصولات</p>
        <p class="mb-3 text-sm text-blue-600">تعداد مستندات آپلود شده میتواند بیش از یک عدد باشد و هر کدام باید همراه با
          یک عنوان باشد</p>
        <p class="mb-3 text-sm text-zinc-800">
          این فیلد اجباری <span class="text-red-600">نمیباشد</span>
        </p>
      </div>

      <div @click="openFileUploadModal"
           class="w-full h-full rounded border-dashed border-2 cursor-pointer bg-zinc-100 p-2 border-zinc-900 flex justify-center items-center">
        <p>برای بارگذاری فایل اینجا کلیک کنید</p>
        <div>

        </div>
      </div>

      <div class="flex justify-center gap-4 mt-4" v-if="formsStore.firstStepFiles !== []">
        <div v-for="(media, index) in formsStore.firstStepFiles" :key="index">
          <img :src="media.url" alt="doc picture" class="h-24">
          <div class="w-full bg-red-800 text-white text-center mt-2 rounded cursor-pointer"
               @click="deleteMedia(media.id, index)">حذف
          </div>
        </div>
      </div>

    </div>

    <div class="w-full">
      <button class="mt-10 hover:bg-indigo-800 w-full bg-indigo-900 p-2 rounded text-white" type="submit">مرحله ی بعدی
      </button>
    </div>

    <p class="text-md w-full text-center mt-3">برای رفتن به مرحله ی بعدی فرم این قسمت را باید به صورت صحیح پر کنید در
      غیر این صورت به صفحه ی بعدی فرستاده نمی شوید</p>
    <p class="text-md w-full text-center text-blue-800">
      در صورت تمایل در مرحله ی بعدی باز هم میتوانید به این صفحه بازگردید
    </p>

  </div>
</template>

<script setup>
import {Field, ErrorMessage} from "vee-validate";
import {useFormsStore} from "../../../store/forms.js";
import {reactive, ref} from "vue";
import axios from "../../../axios/index.js";
import Loader from "../../ui/Loader.vue";


const formStore = useFormsStore();
const upload = ref(null);
const loading = ref(false);
// image preview variables
const preview = ref(null);
const image = ref(null);
const image_list = ref(null);
const titleInput = ref(null);
// create a form data instance
const formData = new FormData();
const percent = ref(0);
// title and files error variables
const titleInputError = ref(false);
const fileInputError = ref(false);


const mediaArray = reactive([]);

const businessPhone = ref(localStorage.getItem("user_login"))


const formsStore = useFormsStore();
const openFileUploadModal = () => {
  errMessage.value = "",
  reset();
  formsStore.modalFileInput = true;
  errMessage.value = false;
}

const closeFileModal = () => {
  formsStore.modalFileInput = false
}


// preview image function
const previewImage = (e) => {
  var input = e.target;
  if (input.files) {
    if (Math.floor(input.files[0].size / 1024) > 1000) {
      errMessage.value = "فایل ارسالی بیش از یک مگابایت است"
    } else {
      errMessage.value = false;
      var reader = new FileReader();
      reader.onload = (e) => {
        preview.value = e.target.result;
      }
      image.value = input.files[0];
      reader.readAsDataURL(input.files[0])
    }
  }
}

// reset function for removing image from modal preview
const reset = () => {
  errMessage.value = false;
  image.value = null;
  preview.value = null;
  image_list.value = null;
  preview.value = null;
  if (upload.value) {
    upload.value = null;
    console.log(upload.value)
  }
}

const errMessage = ref(false);


// submit media in modal
const submitMedia = () => {
  if (titleInput.value.value === "") {
    console.log("title is empty")
    titleInputError.value = true;
  } else if (upload.value.value === "") {
    console.log("file is empty");
    fileInputError.value = true;
  } else {

    if (upload.value.files) {
      if (Math.floor(upload.value.files[0].size / 1024) > 1000) {
        upload.value = "";
      } else {
        loading.value = true;
        formData.append("media", upload.value.files[0]);
        axios.post("/media", formData, {
          onUploadProgress(e) {
            percent.value = Math.round((e.loaded * 100) / e.total)
            if (percent.value > 99) {
              percent.value = 0;
            }
          }
        }).then(res => {
          loading.value = false;
          mediaArray.push({url: `https://demo.aftabor.com/uploads/${res.data[0].media_link}`, id: res.data[0].media_id})
          axios.post("/media?action=set_media_meta", {
            request_params: {
              media_id: res.data[0].media_id,
              meta_key: "media_caption",
              meta_value: titleInput.value.value,
            }
          }).then(res => {
            reset();
            formsStore.modalFileInput = false;
            formStore.firstStepData.media = mediaArray;
            formsStore.firstStepFiles = mediaArray;
          }).catch(err => {
            console.log(err);
          })
          console.log(res)
        }).catch(err => {
          errMessage.value = "مشکلی در آپلود بوجود آمده"
          console.log(err)
        })
      }
    }
  }
}

const deleteMedia = (media_id, index) => {
  console.log(mediaArray[0]);
  mediaArray.splice(index, 1);
  formStore.firstStepFiles = mediaArray;
  console.log("pinia,", formStore.firstStepFiles)
}

</script>

<style scoped>

.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}

.custom-file-input::before {
  text-align: center;
  line-height: 65px;
  content: 'فایل خود را انتخاب کنید';
  display: inline-block;
  background: white;
  border: 3px dashed #999;
  border-radius: 3px;
  width: 100%;
  height: 80px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}

.custom-file-input:hover::before {
  border-color: black;
}

.wrapper {
  max-width: 500px;
  margin: 0 auto;
}


</style>