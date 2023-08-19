<template>
  <div class="p-5">
    <div class="w-full">
      <div class="flex justify-between">
        <p class="text-xl">کاربران</p>
        <!--<Searchbox />-->
      </div>
      <div class="mt-5 w-full">
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full text-left text-sm font-light rounded">
                  <thead class="border-b font-medium dark:border-neutral-500 bg-zinc-100 rounded">
                  <tr>
                    <th scope="col" class="px-6 py-4 text-center">نام و نام خانوادگی</th>
                    <th scope="col" class="px-6 py-4 text-center">شماره موبایل</th>
                    <th scope="col" class="px-6 py-4 text-center">ایمیل</th>
                    <th scope="col" class="px-6 py-4 text-center">عملیات</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr
                      class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-zin-100"
                      v-for="(user, index) in userStore.allUsers"
                  >
                    <td class="whitespace-nowrap px-6 py-4 font-medium text-center">{{ user.user_nicename }}</td>
                    <td class="whitespace-nowrap px-6 py-4 text-center">{{ user.user_login }}</td>
                    <td class="whitespace-nowrap px-6 py-4 text-center">{{ user.user_email }}</td>
                    <td class="whitespace-nowrap px-6 py-4 text-center">
                      <div class="px-8 w-36 mx-auto py-2 bg-red-600 text-white rounded cursor-pointer"
                           @click="deleteUser(user.user_id)">
                        حذف
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Searchbox from "../../../components/ui/Searchbox.vue";
import {useUserStore} from "../../../store/user.js";
import axios from "../../../axios/index.js";

const userStore = useUserStore();
userStore.fetchAllUsers();

const deleteUser = (id) => {
  axios.delete(`/users/${id}`,).then(res => {
    console.log(res)
    userStore.fetchAllUsers();
  }).catch(err => {
    console.log(err)
  })
}


</script>

<style scoped>

</style>