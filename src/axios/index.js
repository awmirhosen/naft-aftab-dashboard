import Axios from "axios";

export const loginAxios = Axios.create({
    baseURL: "/api/v1",
})



export const axios = Axios.create({
    baseURL: "/api/v1",
    headers : {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
})