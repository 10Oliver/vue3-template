import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/",
        name: "Login",
        component: () => import("@/layout/AuthLayout.vue"),
        children: [
            {
                path: "login",
                component: () => import("@/views/auth/Login.vue")
            },
            {
                path: "reset-password",
                component: () => import("@/views/auth/ResetPassword.vue")
            }
        ]
    },
    {
        path: "/",
        name: "admin",
        component: () => import("@/layout/AdminLayout.vue"),
        children: [
            {
                path: "home",
                component: () => import("@/views/private/Dashboard.vue")
            },
            {
                path: "users",
                component: () => import("@/views/private/Users.vue")
            },
            {
                path: "medicines",
                component: () => import("@/views/private/Medicines.vue")
            },
            {
                path: "appointments",
                component: () => import("@/views/private/Appointment.vue")
            },
            {
                path: "symptoms",
                component: () => import("@/views/private/Symptom.vue")
            },
            {
                path: "attended-appointment",
                component: () => import("@/views/private/AttendAppointment.vue")
            },
            {
                path: "settings",
                component: () => import("@/views/private/Settings.vue")
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;