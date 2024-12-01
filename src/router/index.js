import {createRouter, createWebHistory} from 'vue-router'
import RecipeList from '@/Views/RecipeList.vue'


const routes = [
    {
        path:'/recipes',
        name:'RecipeList',
        component: RecipeList
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router