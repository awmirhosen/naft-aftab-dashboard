<template>


  <!--    modal of file input-->
  <div class="fixed top-0 left-0 flex justify-center items-center w-full h-screen bg-zinc-800/[0.7]"
       v-if="formsStore.modalFileInput">
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


                <div class="absolute bottom-5 w-full">
                  <p class="text-red-600 text-sm" v-if="errMessage">{{ errMessage }}</p>
                  <p class="text-red-600 text-sm" v-if="titleInputError">وارد کردن عنوان برای فایل الزامیست</p>
                  <p class="text-red-600 text-sm" v-if="fileInputError">بارگذاری عکس الزامیست</p>
                  <button class="w-10/12 mt-2 bg-indigo-900 rounded p-1 text-white" type="submit">ثبت فایل</button>
                  <div class="mx-auto cursor-pointer w-10/12 mt-2 bg-zinc-200 rounded p-1" @click="reset">پاک کردن فایل</div>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>


  <div class="w-full">
    <div class="w-full">
      <div class="flex gap-3">
        <div class="w-full">
          <Field name="bussiness_type" as="select" class="w-full bg-zinc-100 p-3 rounded"
                 @change="onchangeBussinesCategory">
            <option value="" selected>*انتخاب نوع کسب و کار</option>
            <option value="service">خدمات</option>
            <option value="product">کالا</option>
          </Field>
          <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="bussiness_type"/>
        </div>

      </div>

      <div class="w-full mt-3">

        <div class="w-full" v-if="bussCategory === 3">
          <Field name="client_bussiness_subcategory" as="select" class="w-full bg-zinc-100 p-3 rounded">
            <option value="" selected>*اول نوع کسب و کار را مشخص کنید</option>
          </Field>
          <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right"
                        name="client_bussiness_subcategory"/>
        </div>

        <div v-if="bussCategory === 1">
          <Field name="client_bussiness_subcategory" as="select" class="w-full bg-zinc-100 p-3 rounded"
                 @change="subcategoryChange">
            <option value="" selected>*دسته بندی کالا</option>
            <option v-for="(category, index) in taxonomiesStore.categories" :value="category.name" >
              {{category.name}}
            </option>
            <option value="etc">سایر</option>
          </Field>
          <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right"
                        name="client_bussiness_subcategory"/>
        </div>

        <div v-if="bussCategory === 2">
          <Field as="select" name="client_bussiness_subcategory" class="w-full bg-zinc-100 p-3 rounded"
                 @change="subcategoryChange">
            <option value="" selected>دسته بندی خدمات</option>
            <option v-for="(category, index) in taxonomiesStore.categories" :value="category.name" >
              {{category.name}}
            </option>
            <option value="etc">سایر</option>
          </Field>
          <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right"
                        name="client_bussiness_subcategory"/>
        </div>
      </div>

      <div class="w-full p-2 shadow-md mt-5 rounded p-3 border-zinc-100 border" v-if="bussSubcategory">
        <Field class=" rounded w-full" name="etc"
               placeholder="دسته بندی خود را وارد کنید"/>
        <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right"
                      name="etc"/>
      </div>


      <div class="flex gap-3">
        <div class="w-full">
          <DynamicInput/>
          <ErrorMessage name="client_product" class="text-red-600"/>
        </div>

      </div>

      <!--        file uploader-->
      <div class="w-full mt-1 mb-5">

        <div class="text-center">
          <p class="mb-1">محل بارگذاری کاتالوگ یا عکس محصولات</p>
          <p class="mb-3 text-sm text-blue-600">
            تعداد محصولات میتواند بیشتر از یک عدد باشد و حداکثر حجم عکس میتواند 1 مگابایت باشد
          </p>
          <p class="mb-3 text-sm text-zinc-700">
            پر کردن این فیلد اجباری <span class="text-red-600"> نمی باشد </span>
          </p>
        </div>

        <div @click="openFileUploadModal"
             class="w-full h-full rounded border-dashed border-2 cursor-pointer bg-zinc-100 p-2 border-zinc-900 flex justify-center items-center">
          <p>برای بارگذاری فایل اینجا کلیک کنید</p>
        </div>

        <div class="flex justify-center gap-4 mt-4" v-if="formsStore.thirdStepFiles !== []">
          <div v-for="(media, index) in formsStore.thirdStepFiles" :key="index">
            <img :src="media.url" alt="doc picture" class="h-24">
            <div class="w-full bg-red-800 text-white text-center mt-2 rounded cursor-pointer"
                 @click="deleteMedia(media.id, index)">حذف
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import {Field, ErrorMessage, Form} from "vee-validate";
import DynamicInput from "../../ui/DynamicInput.vue";
import {reactive, ref} from "vue";
import {useFormsStore} from "../../../store/forms.js";
import axios from "../../../axios/index.js";
import router from "../../../router/index.js";
import {useTaxonomies} from "../../../store/taxonomies.js";

const bussCategory = ref(3)
const bussSubcategory = ref(false);
// error message for upload
const errMessage = ref(false);
// image preview variables
const preview = ref(null);
const image = ref(null);
const image_list = ref(null);
const titleInput = ref(null);
const upload = ref(null);
// create a form data instance
const formData = new FormData();
// title and files error variables
const titleInputError = ref(false);
const fileInputError = ref(false);
const loading = ref(false);

const mediaArray = reactive([]);
const formsStore = useFormsStore();

const taxonomiesStore = useTaxonomies()

const openFileUploadModal = () => {
  reset();
  formsStore.modalFileInput = true;
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
  image.value = null;
  preview.value = null;
  image_list.value = null;
  preview.value = null;
  upload.value = null;
}

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
        axios.post("/media", formData).then(res => {
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
            formsStore.thirdStepFiles = mediaArray;
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
  formsStore.secondStepData = mediaArray;
}

const subcategoryChange = (e) => {
  bussSubcategory.value = e.target.value === "etc";
}

const onchangeBussinesCategory = (e) => {
  console.log(e.target.value)
  if (e.target.value === "service") {
    axios.get(`taxonomies?term_parent=service`).then(res => {
      taxonomiesStore.categories = res.data.result;
      console.log(res);
    }).catch(err => {
      if (err.response.data.code === 401) {
        localStorage.removeItem("token");
        router.push("/auth");
      }
    })
    bussCategory.value = 2;
    bussSubcategory.value = false;
  } else if (e.target.value === "product") {
    axios.get(`taxonomies?term_parent=product`).then(res => {
      taxonomiesStore.categories = res.data.result;
      console.log(res);
    }).catch(err => {
      if (err.response.data.code === 401) {
        localStorage.removeItem("token");
        router.push("/auth");
      }
    })
    bussCategory.value = 1;
    bussSubcategory.value = false;
  } else {
    bussCategory.value = 3;
    bussSubcategory.value = false;
  }
}

</script>

<style scoped>

input:focus {
  outline: none !important;
}

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