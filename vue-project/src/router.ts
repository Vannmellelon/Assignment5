import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Start from "./views/Start.vue";
import Question from "./views/Question.vue";
import Result from "./views/Result.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: Start
    },
    {
        path: "/questions",
        component: Question
    },
    {
        path: "/results",
        component: Result
    }
];

export default createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    },
})