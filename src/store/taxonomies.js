import {defineStore} from "pinia";
import axios from "../axios/index.js";
import router from "../router/index.js";


export const useTaxonomies = defineStore("taxonomies", {
    state: () => {
        return {
            taxonomiesData : [],
            taxonomiesDataAlt : [],
            categories: [],
        }
    },
    actions : {
        fetchAllCategories(type) {
            axios.get(`taxonomies`).then(res => {
                this.taxonomiesData = res.data.result;
                this.taxonomiesDataAlt = res.data.result;
                console.log(res);
            }).catch(err => {
                if (err.response.data.code === 401) {
                    localStorage.removeItem("token");
                    router.push("/auth");
                }
            })
        },
        insertTaxonomies(data) {
            axios.post("taxonomies", data).then(res => {
                console.log(res);
                this.taxonomiesData.push({
                    id: res.data.result.term_id,
                    name: res.data.result.term_name,
                    parent: res.data.result.term_parent,
                })
            }).catch(err => {
                console.log(err);
                if (err.response.data.code === 401) {
                    localStorage.removeItem("token");
                    router.push("/auth");
                }
            })
        }
    }
})