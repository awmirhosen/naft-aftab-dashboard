import {createRouter, createWebHistory, useRouter} from "vue-router";
import {useAuthStore} from "../store/auth.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../view/Home.vue"),
        },
        //***************************************** clients
        {
            path: "/bussiness",
            name: "bussiness",
            component: () => import("../view/client/bussiness/Bussiness.vue"),
        },
        // add form
        {
            path: "/bussiness/add-form",
            name: "addForm",
            component: () => import("../view/client/bussiness/AddForm.vue"),
        },
        {
            path: "/client/message",
            name: "clientMessage",
            component: () => import("../view/client/message/ClientMessage.vue"),
        },
        //*************************** admin
        {
            path: "/users",
            name: "users",
            component: () => import("../view/admin/users/Users.vue"),
        },
        {
            path: "/admin",
            name: "adminDashboard",
            component: () => import("../view/admin/Dashboard.vue"),
        },
        {
            path: "/admin/forms",
            name: "adminForms",
            component: () => import("../view/admin/forms/Forms.vue"),
        },
        {
            path: "/admin/messages",
            name: "adminMessage",
            component: () => import("../view/admin/message/AdminMessage.vue"),
        },
        //*************************** auth
        {
            path: "/auth",
            name: "auth",
            component: () => import("../view/auth/Auth.vue"),
            beforeEnter(from, to, next) {
                if (localStorage.getItem("token")) {
                    const authStore = useAuthStore();
                    const token = localStorage.getItem("token")
                    authStore.jwtEncode(token);
                    if (authStore.userInfo.user_role === "customer") {
                        next({name: "bussiness"})
                    }else {
                        next({name: "admin"})
                    }
                } else {
                    next();
                }
            }
        },

    ]
})


router.beforeEach((to, from, next) => {
    if (to.name !== 'auth' && !localStorage.getItem("token")) next({ name: 'auth' })
    else next()
})



export default router;