<template>
  <div class="w-full text-center p-10 relative">


    <!--    modal of file input-->
    <div class="fixed top-0 left-0 flex justify-center items-center w-full h-screen bg-zinc-800/[0.7] z-20"
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
                <form @submit.prevent="submitMedia(mediaStatus)" enctype="multipart/form-data">
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
    <!--- end of modal file --->


    <p class="text-right text-3xl">ویرایش فرم</p>

    <Form class="w-full" @submit="updateFormData">

      <p class="w-full text-center my-10 p-3 text-white rounded text-2xl bg-indigo-900">اطلاعات شخصی</p>

      <div class="flex justify-center gap-4">
        <div class="w-full text-right">
          <label class="whitespace-nowrap">نام کسب و کار :</label>
          <Field type="text"
                 :value="formStore.editFormData.business_name"
                 name="business_name"
                 class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none border border-1 block"
                 placeholder="* نام صاحب کسب و کار"/>
        </div>

        <div class="w-full text-right">
          <label class="whitespace-nowrap">نام صاحب کسب و کار :</label>
          <Field type="text"
                 :value="formStore.editFormData.business_agent"
                 name="bussiness_agent"
                 class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none border border-1 block"
                 placeholder="* نام صاحب کسب و کار"/>
        </div>
      </div>

      <div class="flex justify-center gap-4 mt-8">
        <div class="w-full text-right">
          <label class="whitespace-nowrap">تلفن همراه :</label>
          <Field type="text"
                 value="09123260234"
                 :disabled="true"
                 name="business_mobile"
                 class="w-full h-12 px-4 py-1 text-gray-400 bg-zinc-200 focus:outline-none"
                 placeholder="* تلفن همراه"/>
        </div>

        <div class="w-full text-right">
          <label class="whitespace-nowrap">ایمیل :</label>
          <Field type="text"
                 :value="formStore.editFormData.business_email"
                 name="business_email"
                 class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none border border-1 block"
                 placeholder="* لطفا ایمیل کاری کسب و کار خود را وارد کنید"/>
        </div>
      </div>

      <div class="flex justify-center gap-4 mt-8">
        <!--        gender selectbox-->
        <div class="w-full">
          <Field name="agent_gender" :value="formStore.editFormData.agent_gender" as="select"
                 class="w-full p-2 border border-zinc-200 rounded shadow-md">
            <option value="male">مذکر</option>
            <option value="female">مونث</option>
          </Field>
          <!--<ErrorMessage name="client_gender" class="text-red-600 text-sm mt-2"/>-->
        </div>
      </div>

      <div class="w-full mt-10 text-right">
        <p>فایل های مربوط به کسب و کار :</p>
        <div class="w-full flex flex-wrap mt-4 gap-10">
          <!--foreach-->
          <div class="p-4 border rounded" v-for="(businessFile, index) in businessDocument"
               :key="index">
            <img :src='businessFile.media_link' class="h-36"/>
            <p class="w-full text-center mt-2">{{ businessFile.media_caption }}</p>
            <div
                class="w-36 py-1 bg-red-500 hover:bg-red-600 text-white text-center text-xs cursor-pointer my-2 rounded" @click="deleteDocument(index)">
              حذف
            </div>
          </div>

          <div
              class="p-4 border border-4 border-dashed border-indigo-900 text-indigo-900 font-bold cursor-pointer rounded flex justify-center items-center" @click="openFileUploadModal('1')">
            <div>اضافه کردن</div>
          </div>

        </div>
      </div>

      <p class="w-full text-center my-10 p-3 text-white rounded text-2xl bg-indigo-900">اطلاعات مکانی</p>

      <div class="flex justify-center gap-4 mt-8">
        <div class="w-full text-right">
          <label class="whitespace-nowrap">استان :</label>
          <div class="w-full">
            <Field name="business_state" as="select" class="w-full p-2 border border-1 rounded"
                   :value="formStore.editFormData.business_state">
              <option value="" :disabled="true" selected>*استان محل کسب و کار خود را انتخاب کنید</option>
              <option v-for="(state, index) in states" :key="index" :value="state.state" class="p-2">
                {{ state.state }}
              </option>
            </Field>
          </div>
        </div>

        <div class="w-full text-right">
          <label class="whitespace-nowrap">شهر :</label>
          <Field type="text"
                 :value="formStore.editFormData.business_city"
                 name="business_city"
                 class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none border border-1 rounded"
                 placeholder="*نام شهر کسب و کار"/>
        </div>
      </div>

      <div class="flex justify-center gap-4 mt-8">
        <div class="w-full text-right">
          <label class="whitespace-nowrap">جنسیت :</label>
          <Field as="textArea" name="business_address" :value="formStore.editFormData.business_address"
                 class="w-full rounded p-2 h-24 border border-zinc-200"
                 placeholder="*ادرس دقیق محل کسب و کار را وارد کنید"/>
        </div>
      </div>

      <div class="flex justify-center gap-4 mt-8">
        <div class="w-full text-right">
          <label class="whitespace-nowrap">کد پستی :</label>
          <div class="w-full">
            <Field type="text"
                   :value="formStore.editFormData.business_postal_code"
                   name="business_postal_code"
                   class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none border border-1 rounded"
                   placeholder="* کد پستی محل کسب و کار را وارد کنید"/>
          </div>
        </div>

        <div class="w-full text-right">
          <label class="whitespace-nowrap">تلفن ثابت :</label>
          <Field type="text"
                 :value="formStore.editFormData.business_tel"
                 name="business_tel"
                 class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none border border-1 rounded"
                 placeholder="* تلفن ثابت محل کسب و کار را همراه با کد شهر وارد کنید"/>
        </div>
      </div>

      <div class="flex justify-center gap-4 mt-8">
        <div class="w-full text-right">
          <label class="whitespace-nowrap">فکس :</label>
          <Field type="text"
                 :value="formStore.editFormData.business_fax"
                 name="business_fax"
                 class="w-full h-12 px-4 py-1 text-gray-800 focus:outline-none border border-1 rounded"
                 placeholder="شما فکس کسب و کار را خالی گذاشتید"/>
        </div>
      </div>

      <p class="w-full text-center my-10 p-3 text-white rounded text-2xl bg-indigo-900">اطلاعات کسب و کار</p>

      <div class="flex justify-center gap-4 mt-8">

        <div class="w-full text-right">
          <div class="flex gap-3">
            <div class="w-full">
              <Field name="business_type" as="select" class="w-full bg-zinc-100 p-3 rounded"
                     @change="onchangeBussinesCategory" :value="formStore.editFormData.business_type">
                <option value="" selected>*انتخاب نوع کسب و کار</option>
                <option value="service">خدمات</option>
                <option value="product">کالا</option>
              </Field>
              <!--              <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right" name="bussiness_type"/>-->
            </div>

          </div>

          <div class="w-full mt-3">

            <div class="w-full" v-if="bussCategory === 3">
              <Field name="business_category" as="select" class="w-full bg-zinc-100 p-3 rounded">
                <option value="" selected>*اول نوع کسب و کار را مشخص کنید</option>
              </Field>
            </div>

            <div v-if="bussCategory === 1">
              <Field name="business_category" as="select" class="w-full bg-zinc-100 p-3 rounded"
                     @change="subcategoryChange">
                <option value="" selected>*دسته بندی کالا</option>
                <option value="1">تکنولوژی</option>
                <option value="2">ساختمان</option>
                <option value="etc">سایر</option>
              </Field>
            </div>

            <div v-if="bussCategory === 2">
              <Field as="select" name="business_category" class="w-full bg-zinc-100 p-3 rounded"
                     @change="subcategoryChange" :value="formStore.editFormData.business_category">
                <option value="" selected>دسته بندی خدمات</option>
                <option value="1">تکنولوژی</option>
                <option value="2">ساختمان</option>
                <option value="etc">سایر</option>
              </Field>
            </div>
          </div>

          <div class="w-full p-2 shadow-md mt-5 rounded p-3 border-zinc-100 border" v-if="bussSubcategory">
            <Field class=" rounded w-full" name="etc"
                   placeholder="دسته بندی خود را وارد کنید"/>
            <ErrorMessage class="text-sm text-red-600 block mt-2 mr-4 w-100 text-right"
                          name="etc"/>
          </div>
        </div>

      </div>

      <p class="w-full text-right my-4">فایل محصولات</p>

      <div class="w-full my-4 flex gap-4">

        <div class="p-4 border rounded" v-for="(propertyFile, index) in propertyDocument"
             :key="index">
          <img :src='propertyFile.media_link' class="h-36" alt="property_file" />
          <p class="w-full text-center mt-2">{{ propertyFile.media_caption }}</p>
          <div
              class="w-36 py-1 bg-red-500 hover:bg-red-600 text-white text-center text-xs cursor-pointer my-2 rounded" @click="deleteProperty(index)">
            حذف
          </div>
        </div>

        <div
            class="p-4 border border-4 border-dashed border-indigo-900 text-indigo-900 font-bold cursor-pointer rounded flex justify-center items-center" @click="openFileUploadModal('2')">
          <div>اضافه کردن</div>
        </div>
      </div>


      <div class=" gap-4 mt-8">

        <div class=" gap-3">
          <div class="w-full">
            <EditDynamicInput/>
          </div>
        </div>

      </div>

      <button type="submit" class="py-2 bg-amber-400 w-full rounded hover:bg-amber-500">ویرایش فرم</button>

      <div class="w-full p-3 bg-green-700 mt-4 text-white rounded"
           :class="updateMessage == 1 ? 'block' : 'hidden' "
      >
        فرم شما با موفقیت ویرایش شد
        <button type="button" class="px-4 py-2 bg-white text-black rounded hover:bg-green-700 border border-green-700 hover:text-white transition-all hover:border hover:border-white" @click.prevent="backToBusiness" >
          بازگشت به صفحه ی فرم ها
        </button>
      </div>

      <div class="w-full p-3 bg-red-700 mt-4 text-white rounded"
           :class="updateMessage == 2 ? 'block' : 'hidden' "
      >
        مشکلی در ویرایش فرم پیش آمده لطفا پس از اندکی صبر و تلاش مجدد با پشتیبانی تماس بگیرید
      </div>


    </Form>
  </div>
</template>

<script setup>

import {onMounted, reactive, ref} from "vue";
import {Form, Field, ErrorMessage} from "vee-validate";
import {useRoute, useRouter} from "vue-router";
import axios from "../../../axios/index.js";
import {useFormsStore} from "../../../store/forms.js";
import {states} from "../../../utils/dummy.js";
import EditDynamicInput from "../../../components/ui/EditDynamicInput.vue";
import Loader from "../../../components/ui/Loader.vue";

const formStore = useFormsStore();
const bussSubcategory = ref(false);
const bussCategory = ref(1);
const businessDocument = reactive([]);
const propertyDocument = reactive([]);
const updateMessage = ref("0");

onMounted(() => {
  const formStore = useFormsStore();

  const route = useRoute();

  axios.get(`/forms/${route.params.id}`).then(res => {
    console.log(res.data.result);
    formStore.editFormData = res.data.result;

    formStore.editFormData.business_document.forEach(item => {
      console.log(item);
      businessDocument.push({media_link: `https://demo.aftabor.com/uploads/${item.media_link}`, media_id: item.media_id, media_caption: item.media_caption});
    })

    formStore.editFormData.business_catalog.forEach(item => {
      console.log(item);
      propertyDocument.push({media_link: `https://demo.aftabor.com/uploads/${item.media_link}`, media_id: item.media_id, media_caption: item.media_caption});
    })

  }).catch(err => {
    console.log(err);
  });
})

console.log(businessDocument);

if (formStore.editFormData.business_type === "product") {
  bussCategory.value = 1;
} else if (formStore.editFormData.business_type === "service") {
  bussCategory.value = 2;
} else {
  bussCategory.value = 3;
}

if (formStore.editFormData.business_category === "etc") {
  bussSubcategory.value = true;
}

console.log(formStore.editFormData)

const subcategoryChange = (e) => {
  bussSubcategory.value = e.target.value === "etc";
}

const onchangeBussinesCategory = (e) => {
  console.log(e.target.value)
  if (e.target.value === "service") {
    bussCategory.value = 2;
    bussSubcategory.value = false;
  } else if (e.target.value === "product") {
    bussCategory.value = 1;
    bussSubcategory.value = false;
  } else {
    bussCategory.value = 3;
    bussSubcategory.value = false;
  }
}

const updateFormData = (values) => {

  const businessDocId = reactive([]);
  const propertyDocId = reactive([]);

  var allData;

  businessDocument.forEach(item => {
    businessDocId.push(item.media_id)
  });

  propertyDocument.forEach(item => {
    propertyDocId.push(item.media_id)
  });

  const propertyEditedInput = reactive([]);

  formStore.editInputArray.forEach(item => {
    console.log(item)
    propertyEditedInput.push(item.phone);
  })

  console.log(propertyEditedInput);

  if (propertyDocId.length === [] && businessDocId.length === []){
    console.log("doc empty")
    allData = {
      request_params: {
        form_id: formStore.editFormData.form_id,
        business_name: values.business_name,
        business_agent: values.bussiness_agent,
        business_email: values.business_email,
        agent_gender: values.agent_gender,
        // business_document: businessDocId,
        business_state: values.business_state,
        business_city: values.business_city,
        business_address: values.business_address,
        business_postal_code: values.business_postal_code,
        business_tel: values.business_tel,
        business_fax: values.business_fax,
        business_type: values.business_type,
        business_category: values.business_category,
        business_property: propertyEditedInput,
        business_catalog: propertyDocId,
        business_mobile: localStorage.getItem("user_login"),
      }
    }
  } else if (propertyDocId.length === 0) {
    console.log("catalog empty")
    allData = {
      request_params: {
        form_id: formStore.editFormData.form_id,
        business_name: values.business_name,
        business_agent: values.bussiness_agent,
        business_email: values.business_email,
        agent_gender: values.agent_gender,
        business_document: businessDocId,
        business_state: values.business_state,
        business_city: values.business_city,
        business_address: values.business_address,
        business_postal_code: values.business_postal_code,
        business_tel: values.business_tel,
        business_fax: values.business_fax,
        business_type: values.business_type,
        business_category: values.business_category,
        business_property: propertyEditedInput,
        // business_catalog: propertyDocId,
        business_mobile: localStorage.getItem("user_login"),
      }
    }
  }else if (businessDocId.length === 0) {
    console.log("both are empty")
    allData = {
      request_params: {
        form_id: formStore.editFormData.form_id,
        business_name: values.business_name,
        business_agent: values.bussiness_agent,
        business_email: values.business_email,
        agent_gender: values.agent_gender,
        // business_document: businessDocId,
        business_state: values.business_state,
        business_city: values.business_city,
        business_address: values.business_address,
        business_postal_code: values.business_postal_code,
        business_tel: values.business_tel,
        business_fax: values.business_fax,
        business_type: values.business_type,
        business_category: values.business_category,
        business_property: propertyEditedInput,
        // business_catalog: propertyDocId,
        business_mobile: localStorage.getItem("user_login"),
      }
    }
  }else {
    console.log("all full")
    allData = {
      request_params: {
        form_id: formStore.editFormData.form_id,
        business_name: values.business_name,
        business_agent: values.bussiness_agent,
        business_email: values.business_email,
        agent_gender: values.agent_gender,
        business_document: businessDocId,
        business_state: values.business_state,
        business_city: values.business_city,
        business_address: values.business_address,
        business_postal_code: values.business_postal_code,
        business_tel: values.business_tel,
        business_fax: values.business_fax,
        business_type: values.business_type,
        business_category: values.business_category,
        business_property: propertyEditedInput,
        business_catalog: propertyDocId,
        business_mobile: localStorage.getItem("user_login"),
      }
    }
  }

  console.log(values.business_category)

  console.log(allData)

  axios.put("/forms/?action=update_form", allData).then(res => {
    console.log(res)
    updateMessage.value = 1;
  }).catch(err => {
    console.log(err)
    updateMessage.value = 2;
  })

}

const deleteDocument = (index) => {
  console.log(index)
  businessDocument.splice(index,1);
}

const router = useRouter();

const backToBusiness = () => {
 router.push("/bussiness")
}



////// add business document uploader
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

const mediaStatus = ref("1")


const mediaArray = reactive([]);


const formsStore = useFormsStore();
const openFileUploadModal = (index) => {
  console.log(index);
  mediaStatus.value = index;
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
const submitMedia = (index) => {
  console.log(mediaStatus)
  if (mediaStatus.value == 1) {
    console.log("service");
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
            businessDocument.push({media_link: `https://demo.aftabor.com/uploads/${res.data[0].media_link}`, media_id: res.data[0].media_id, media_caption: titleInput.value.value })
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
  }else {
    console.log("product")
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
            propertyDocument.push({
              media_link: `https://demo.aftabor.com/uploads/${res.data[0].media_link}`,
              media_id: res.data[0].media_id,
              media_caption: titleInput.value.value
            })
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
}


const deleteProperty = (index) => {
  propertyDocument.splice(index,1);
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

</style>