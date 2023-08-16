import {defineStore} from "pinia";
import axios from "../axios/index.js";

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
                }
                console.log(err)
            })
        }
    }
})