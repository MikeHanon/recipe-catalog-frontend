import {createRouter, createWebHistory} from 'vue-router'
import RecipeList from '@/Views/RecipeList.vue'
import RecipeDetail from '@/Views/RecipeDetails.vue'
import AddRecipe from '@/Views/AddRecipe.vue'


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
    },
    {
        path:'/recipes/add-recipe',
        name:'AddRecipe',
        component: AddRecipe
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router