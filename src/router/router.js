import { createRouter, createWebHistory } from "vue-router";
import store from "../store/store";

const routes = [
    {
        path: "/",
        redirect: "/coaches"
    },
    {
        path: "/:pathMath(.*)*",
        name: "NotFound",
        component: () => import("../components/pages/PageNotFound/PageNotFound")
    },
    {
        path: "/coaches",
        name: "Coaches",
        component: () => import("../components/pages/CoachesPage/Coaches")
    },
    {
        path: "/requests",
        name: "Requests",
        component: () => import("../components/pages/RequestsPage/Requests"),
        beforeEnter: (to, from, next) => {
            if (!store.getters.isAuthenticated) {
                next("/auth");
            } else next();
        }
    },
    {
        path: "/register",
        name: "RegisterAsCoach",
        component: () =>
            import("../components/pages/RegisterPage/RegisterAsCoach"),
        beforeEnter: (to, from, next) => {
            if (!store.getters.isAuthenticated) {
                next("/auth");
            } else if (store.getters.isRegistered) {
                next("/coaches");
            } else next();
        }
    },
    {
        path: "/temp",
        name: "temp",
        component: () => import("../components/pages/RegisterPage/temp")
    },

    {
        path: "/coaches/:id",
        name: "CoachItemDetails",
        component: () =>
            import("../components/pages/CoachesPage/CoachItemDetails")
    },
    {
        path: "/coaches/:id/contact",
        name: "CoachContact",
        component: () => import("../components/pages/CoachesPage/CoachContact")
    },
    {
        path: "/auth",
        name: "Auth",
        component: () => import("../components/pages/AuthPage/Auth"),
        beforeEnter: (to, from, next) => {
            if (store.getters.isAuthenticated) {
                router.push("/coaches");
            } else next();
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from) => {
    console.log("Chuyển trang từ: " + from.path + " đến: " + to.path);
});

export default router;
