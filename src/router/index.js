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
        {
            path: "/client/form/:id",
            name: "editFormClient",
            component: () => import("../view/client/forms/EditFormClient.vue"),
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
        // forms in admin
        {
            path: "/admin/forms",
            name: "adminForms",
            component: () => import("../view/admin/forms/Forms.vue"),
        },
        {
            path: "/admin/categories",
            name: "businessCategories",
            component: () => import("../view/admin/BusinessCategories.vue"),
        },
        {
            path: "/admin/forms/:form_id",
            name: "showForm",
            component: () => import("../view/admin/forms/ShowForm.vue"),
        },
        {
            path: "/admin/messages",
            name: "adminMessage",
            component: () => import("../view/admin/message/AdminMessage.vue"),
        },
        {
            path: "/admin/forms/search",
            name: "searchForm",
            component: () => import("../view/admin/forms/searchForm.vue"),
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
    console.log("route change")
    if (to.name !== 'auth' && !localStorage.getItem("token")) next({ name: 'auth' })
    else next()
})



export default router;