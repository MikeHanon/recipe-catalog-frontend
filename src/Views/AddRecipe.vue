<template>
  <div class="add-recipe-form">
    <h1>Ajouter une Nouvelle Recette</h1>

    <!-- Champs pour le titre de la recette -->
    <label for="name">Nom de la recette :</label>
    <input type="text" v-model="recipe.name" id="name">

    <!-- Ingrédients dynamiques -->
    <div class="ingredients-section">
      <h2>Ingrédients :</h2>
      <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="ingredient-item">
        <select v-model="ingredient.ingredient">
          <option v-for="item in allIngredients" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
        <input type="number" v-model="ingredient.quantity" placeholder="Quantité" />
        <input type="text" v-model="ingredient.unit" placeholder="Unité (ex: grammes, tsp)" />
      </div>

      <!-- Bouton pour ajouter un nouvel ingrédient -->
      <button @click="addIngredient">Ajouter un ingrédient</button>
    </div>

    <!-- Champs pour les instructions -->
    <label for="instructions">Instructions :</label>
    <textarea v-model="recipe.instructions" id="instructions"></textarea>

    <!-- Bouton pour soumettre la recette -->
    <button @click="addRecipe">Ajouter la Recette</button>

    <!-- Affichage des erreurs éventuelles -->
    <p v-if="error">{{ error }}</p>
  </div>
</template>

  


<script>
import axios from 'axios';

export default {
  name: 'AddRecipe',
  data() {
    return {
      recipe: {
        name: '',
        ingredients:  [ 
        {
          ingredient: null,
          quantity: null,  
          unit: ''        
        }
      ],
        instructions: ''
      },
      allIngredients: [],
      error: null,
    };
  },
  created() {
   
    const token = localStorage.getItem('jwtToken');

    axios
      .get('http://localhost:8000/api/ingredients', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        this.allIngredients = response.data;
      })
      .catch((error) => {
        this.error = 'Failed to load ingredients: ' + error.message;
      });
  },
  methods: {
    addIngredient() {
    this.recipe.ingredients.push({
      ingredient: null,
      quantity: null,
      unit: ''
    });
  },
    addRecipe() {
      // Logique pour ajouter une nouvelle recette avec les ingrédients sélectionnés
      axios
        .post('http://localhost:8000/api/recipes/create', this.recipe, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
          }
        })
        .then((response) => {
          console.log('Recipe added successfully:', response.data);
          this.$router.push({ name: 'RecipeDetail', params: { id: response.data.recipe_id}, query: { message: response.data.message } });
        })
        .catch((error) => {
          console.error('Failed to add recipe:', error.message);
        });
    }
  }
};
</script>
