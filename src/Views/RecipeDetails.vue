<template>
    <div class="recipe-details">
      <!-- Affichage du titre de la recette -->
      <h1>{{ recipe.title }}</h1>
      
      <!-- Description de la recette -->
      <p class="recipe-description">{{ recipe.description }}</p>
      
      <!-- Liste des ingrédients -->
      <div class="ingredients">
        <h2>Ingredients:</h2>
        <ul>
          <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
            {{ ingredient.quantity }} {{ ingredient.unit }} de {{ ingredient.name }}
          </li>
        </ul>
      </div>
  
      <!-- Instructions de préparation -->
      <div class="instructions">
        <h2>Instructions:</h2>
        <p>{{ recipe.instructions }}</p>
      </div>
    </div>
  </template>
<script>
import axios from 'axios';

export default {
  name: 'RecipeDetails',
  data() {
    return {
      recipe: {},
      error: null,
    };
  },
  created() {
    // Récupérer l'ID de la recette depuis la route
    const recipeId = this.$route.params.id;

    // Récupérer le token JWT depuis localStorage
    const token = localStorage.getItem('jwtToken');

    // Faire la requête API pour récupérer les détails de la recette
    axios
      .get(`http://localhost:8000/api/recipes/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        this.recipe = response.data;
        console.log(this.recipe);
      })
      .catch((error) => {
        this.error = 'Failed to load recipe details: ' + error.message;
      });
  }
};
</script>

<style scoped>
.recipe-details {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.recipe-description {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.ingredients ul {
  list-style-type: disc;
  margin-left: 20px;
}

.instructions {
  margin-top: 20px;
}
</style>