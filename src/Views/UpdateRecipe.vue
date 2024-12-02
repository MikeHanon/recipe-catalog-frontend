<template>
    <div class="edit-recipe-form">
      <h1>Modifier la Recette</h1>
  
      <!-- Champs pour le titre de la recette -->
      <label for="name">Nom de la recette :</label>
      <input type="text" v-model="recipe.name" id="name">
  
      <!-- Ingrédients dynamiques pour ajouter/modifier/supprimer -->
      <div class="ingredients-section">
        <h2>Ingrédients :</h2>
  
        <!-- Ingrédients à Ajouter -->
        <div v-for="(ingredient, index) in recipe.ingredients.add" :key="'add' + index" class="ingredient-item">
          <select v-model="ingredient.ingredient">
            <option v-for="item in allIngredients" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
          </select>
          <input type="number" v-model="ingredient.quantity" placeholder="Quantité" />
          <input type="text" v-model="ingredient.unit" placeholder="Unité (ex: grammes, tsp)" />
        </div>
  
        <!-- Ingrédients à Mettre à Jour -->
        <div v-for="(ingredient, index) in recipe.ingredients.update" :key="'update' + index" class="ingredient-item">
          <select v-model="ingredient.ingredient">
            <option v-for="item in allIngredients" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
          </select>
          <input type="number" v-model="ingredient.quantity" placeholder="Quantité" />
          <input type="text" v-model="ingredient.unit" placeholder="Unité (ex: grammes, tsp)" />
          <!-- Bouton Supprimer un ingrédient -->
          <button @click="deleteIngredient(index, true)">Supprimer</button>
        </div>
  
        <!-- Bouton pour ajouter un nouvel ingrédient -->
        <button @click="addIngredient">Ajouter un ingrédient</button>
      </div>
  
      <!-- Champs pour les instructions -->
      <label for="instructions">Instructions :</label>
      <textarea v-model="recipe.instructions" id="instructions"></textarea>
  
      <!-- Bouton pour soumettre les modifications -->
      <button @click="updateRecipe">Mettre à Jour la Recette</button>
  
      <!-- Affichage des erreurs éventuelles -->
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
<script>
import axios from 'axios';

export default {
  name: 'EditRecipe',
  data() {
  return {
    recipe: {
      name: '',
      ingredients: {
        add: [], 
        update: [], 
        delete: [] 
      },
      instructions: ''
    },
    allIngredients: [], 
    error: null,
    };
},
  created() {
    
    const recipeId = this.$route.params.id;

    this.loadRecipe(recipeId);

    this.loadAllIngredients();
  },
  methods: {
    loadRecipe(recipeId) {
      const token = localStorage.getItem('jwtToken');

      axios
        .get(`http://localhost:8000/api/recipes/${recipeId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
            this.recipe.name = response.data.name;
      this.recipe.instructions = response.data.instructions;

      // Récupérer les ingrédients existants et les placer dans le nœud "update"
      this.recipe.ingredients.update = response.data.ingredients.map(ingredient => ({
        ingredient: ingredient.id,
        quantity: ingredient.quantity,
        unit: ingredient.unit
      }));
        })
        .catch((error) => {
          this.error = 'Failed to load recipe details: ' + error.message;
        });
    },
    loadAllIngredients() {
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
    addIngredient() {
      this.recipe.ingredients.add.push({
        ingredient: null,
        quantity: null,
        unit: ''
      });
    },

  updateIngredient(index) {
    // Ajouter un ingrédient dans la liste "update" pour modification
    const ingredientToUpdate = this.recipe.ingredients.update[index];
    this.recipe.ingredients.update.push({
      ingredient: ingredientToUpdate.ingredient,
      quantity: ingredientToUpdate.quantity,
      unit: ingredientToUpdate.unit
    });
  },

  deleteIngredient(index, existing = false) {
    if (existing) {
      // Ajouter un ingrédient à la liste "delete" si c'est un ingrédient existant
      const ingredientToDelete = this.recipe.ingredients.update[index];
      this.recipe.ingredients.delete.push({
        ingredient: ingredientToDelete.ingredient
      });
    }
    // Supprimer l'ingrédient de la liste visible des ingrédients
    this.recipe.ingredients.update.splice(index, 1);
  },

    updateRecipe() {
      const token = localStorage.getItem('jwtToken');
      const recipeId = this.$route.params.id;

      // Faire la requête pour mettre à jour la recette
      axios
        .patch(`http://localhost:8000/api/recipes/${recipeId}`, this.recipe, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          this.$router.push({ name: 'RecipeDetail', params: { id: recipeId}, query: { message: response.data.message } });
        })
        .catch((error) => {
          this.error = 'Failed to update recipe: ' + error.message;
        });
    }
  }
};
</script>
  