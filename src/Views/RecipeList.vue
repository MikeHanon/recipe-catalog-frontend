<template>
  <div class="recipe-list">
    <h1>Recipe List</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card">
        <h2>{{ recipe.name }}</h2>
        
        <button><router-link :to="{ name: 'RecipeDetail', params: { id: recipe.id } }">Voir les détails</router-link></button>
        <button v-if="isAdmin"><router-link :to="{ name: 'UpdateRecipe', params: {id: recipe.id} }">Update Recipe</router-link></button>
        <button v-if="isAdmin" @click="deleteRecipe(recipe.id)">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RecipeList',
  data() {
    return {
      recipes: [],
      loading: true,
      error: null,
    };
  },
  methods: {
    fetchRecipes() {
      const jwtToken = localStorage.getItem('jwtToken');
      axios
        .get('http://localhost:8000/api/recipes',{
          headers: {
          Authorization: `Bearer ${jwtToken}` // Ajouter l'en-tête Authorization
        }
        })
        .then((response) => {
          this.recipes = response.data;
          this.loading = false;
        })
        .catch((error) => {
          this.error = 'Failed to load recipes' + error.message;
          this.loading = false;
        });
    },
    goToDetail(recipeId) {
      console.log(recipeId);
      this.$router.push({ name: 'RecipeDetail', params: { id: recipeId } });
    },
    deleteRecipe(recipeId) {
      const token = localStorage.getItem('jwtToken');
      
      // Confirmer la suppression
      if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
        axios
          .delete(`http://localhost:8000/api/recipes/${recipeId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(() => {
            // Mettre à jour la liste des recettes après suppression
            this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
            alert('Recette supprimée avec succès');
          })
          .catch(error => {
            this.error = 'Failed to delete recipe: ' + error.message;
          });
      }
    },
  },
  
  created() {
    this.fetchRecipes();
  },
};
</script>

<style scoped>
.recipe-list {
  padding: 20px;
}
.recipe-card {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px 0;
}
</style>
