import {createRouter, createWebHistory} from 'vue-router'
import RecipeList from '@/Views/RecipeList.vue'
import RecipeDetail from '@/Views/RecipeDetails.vue'
import AddRecipe from '@/Views/AddRecipe.vue'
import UpdateRecipe from '@/Views/UpdateRecipe.vue'

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
    },
    {
        path:'/recipes/update-recipe/:id',
        name:'UpdateRecipe',
        component: UpdateRecipe
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router