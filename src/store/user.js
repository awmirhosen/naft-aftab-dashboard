import {defineStore} from "pinia";
import axios from "../axios/index.js";
import router from "../router/index.js";


export const useUserStore = defineStore("user", {
    state : () => {
        return {
            allUsers : [],
        }
    },
    actions : {
        fetchAllUsers() {
            axios.get("users").then(res => {
                // console.log(res.data.users)
                this.allUsers = res.data.users
            }).catch(err => {
                if (err.response.code === 401) {
                    localStorage.removeItem("token");
                    router.push("/auth")
                }
                console.log(err)
            })
        }
    }
})