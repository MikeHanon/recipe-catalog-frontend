import {createRouter, createWebHistory} from 'vue-router'
import RecipeList from '@/Views/RecipeList.vue'
import RecipeDetail from '@/Views/RecipeDetails.vue'


const routes = [
    {
        path:'/recipes',
        name:'RecipeList',
        component: RecipeList
    },
    {
        path:'/recipes/:id',
        name:'RecipeDetail',
        component: RecipeDetail
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router