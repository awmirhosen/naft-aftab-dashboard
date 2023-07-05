import {defineStore} from "pinia";

export const useFormsStore = defineStore("forms", {
    state : () => {
        return {
            modalFileInput : false,
            firstStepFiles: [],
            firstStepData : {
                client_full_name: "",
                client_bussiness_name: "",
                client_email: "",
                client_gender: "",
            },
            secondStepData : {
                client_state: "",
                client_city: "",
                client_address: "",
                client_postalcode: "",
                client_telephone: "",
                client_fax: "",
            },
        }
    }
});