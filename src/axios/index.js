import Axios from "axios";
import {useRouter} from "vue-router";


const router = useRouter();


const axios = Axios.create({
    baseURL: "/api/v1",
    headers : {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
})

export default axios;