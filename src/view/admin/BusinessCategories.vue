<template>
  <div class="w-full py-5 px-10 relative">

    <!-----adding category modal start-------->
    <div class="w-[500px] p-4 fixed bg-white shadow-xl rounded-xl border border-1 left-1/2 -translate-x-1/2" v-if="editModalOpen">
      <div class="w-full flex justify-between px-4">
        <p>ویرایش دسته بندی</p>
        <div class="text-red-500 cursor-pointer " @click="closeEditModal" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      
      <div>
        <form @submit.prevent="editCategory">
        <input type="text" v-model="editCategoryTitle" class="w-full p-2 border border-2 rounded border-indigo-950 mt-5" placeholder="نام دسته بندی جدید" />
          <button type="submit" class="w-full py-2 bg-indigo-900 text-white mt-3 rounded-md hover:bg-indigo-950">ویرایش</button>
        </form>
      </div>
      
    </div>
    <!-----adding category modal end-------->


    <!--title-->
    <p class="text-3xl">دسته بندی ها</p>

    <div class="w-full">
      <div class="w-full mt-5 border-2 border rounded border-zinc-100 p-4">
        <div
            class="px-10 text-center py-4 text-right text-xl cursor-pointer">
          اضافه کردن دسته بندی
        </div>

        <div class=" bg-zinc-100 p-3">
          <div class="flex justify-around gap-4">
            <div class="w-full flex items-center gap-4">
              <select name="" id="" class="w-48 border p-2 border-2 rounded" v-model="taxonamiesType"
                      @change="changeAddingBusinessType">
                <option class="w-full" value="service">خدمات</option>
                <option class="w-full" value="product">کالا</option>
              </select>

              <div class="w-full">
                <input type="text" placeholder="نام دسته بندی جدید را وارد کنید" class="w-full bg-white p-2"
                       v-model="taxonamiesName">
              </div>

              <div>
                <button class="px-10 bg-indigo-900 text-white rounded p-2" @click="submitCategory">ایجاد</button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="w-full mt-10">
      <p class="text-xl mb-3">دسته بندی های ثبت شده:</p>

      <select name="" id="" class="w-48 border p-2 border-2 rounded" @change="changeSortingCategory"
              v-model="sortingCategory">
        <option value="all">همه</option>
        <option value="service">خدمات</option>
        <option value="product">کالا</option>
      </select>

      <div class="flex justify-start gap-10 flex-wrap mt-10 relative">
        <div class="border border-2 rounded-xl px-5 py-3"
             v-for="(taxonomy, index) in taxonomies.taxonomiesData">
          <div class="w-full flex items-center gap-4">
            <p>{{ taxonomy.name }}</p>
            <div class="px-3 py-2 text-white" @click="deleteCategory(taxonomy.id, index)">
              <div class="p-4 rounded-full bg-red-500 hover:bg-red-600 transition-all cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                </svg>
              </div>
            </div>
            <div @click="changeEditModalOpen(taxonomy.id, taxonomy.name, taxonomy.parent)" class="px-3 py-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </div>


  </div>
</template>

<script setup>

import {reactive, ref} from "vue";
import {useTaxonomies} from "../../store/taxonomies.js";
import axios from "../../axios/index.js";

const addBusinessType = ref("service");

const sortingCategory = ref("all");

const editModalOpen = ref(false);

const taxonomies = useTaxonomies();


const taxonamiesName = ref("");
const taxonamiesType = ref("service");

const submitCategory = () => {
  console.log(taxonamiesType.value, taxonamiesName.value);
  const allData = {
    request_params: {
      term_parent: taxonamiesType.value,
      term_name: taxonamiesName.value,
    }
  }
  taxonomies.insertTaxonomies(allData)
}

// fetch all categories
taxonomies.fetchAllCategories("service")


const changeAddingBusinessType = () => {
  console.log(addBusinessType.value);
}

console.log(taxonomies.taxonomiesData);

const changeSortingCategory = (e) => {
  console.log(e.target.value)

  const sortDate = reactive([])

  if (e.target.value === 'all') {
    console.log(taxonomies.taxonomiesData, taxonomies.taxonomiesDataAlt)
    taxonomies.taxonomiesData = taxonomies.taxonomiesDataAlt
  } else {
    taxonomies.taxonomiesDataAlt.forEach(item => {
      console.log(item.parent, e.target.value)
      if (item.parent === e.target.value) {
        console.log("voo")
        sortDate.push(item);
        taxonomies.taxonomiesData = sortDate
      }
    })
  }

  console.log(sortDate)
}

const deleteCategory = (id, index) => {
  console.log(id)
  axios.delete(`/taxonomies/${id}`).then(res => {
    console.log(res);
    taxonomies.fetchAllCategories("service")
  }).catch(err => {
    console.log(err);
  })
}

const editCategoryTitle = ref("");
const editCategoryId = ref(null);
const editCategoryParent = ref("");

const changeEditModalOpen = (id, title, parent) => {
  editCategoryId.value = id;
  editCategoryTitle.value = title;
  editCategoryParent.value = parent;
  editModalOpen.value = true;
}

const closeEditModal = () => {
  editCategoryId.value = null;
  editCategoryTitle.value = "";
  editCategoryParent.value = "";
  editModalOpen.value = false
}

const loading = ref(false)

const editCategory = () => {

  loading.value = true;

  const allData = {
    request_params: {
      term_parent: editCategoryParent.value,
      term_name: editCategoryTitle.value,
      term_id: editCategoryId.value,
    }
  }

  axios.put("taxonomies", allData).then(res => {
    console.log(res)
    loading.value = false
  }).catch(err => {
   if (err.response.data.code === 401) {
      localStorage.removeItem("token");
    }
  })
}


// "taxonomies?tent_parent=service"  get

// post    term_name , term_parent


</script>

<style scoped>

</style>