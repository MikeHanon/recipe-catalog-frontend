<template>
  <div id="app">
    
    <nav>
      
      <button><router-link to="/recipes">Recipes</router-link></button>
      <button><router-link to="/recipes/add-recipe">Add Recipe</router-link></button>
      
    </nav>
    
    
    <router-view />
  </div>
</template>

<script>
import axios from 'axios';



export default {
  name: 'App',
  created() {
    console.log('App created');
    this.authenticate();
  },
  methods: {
    authenticate() {
      axios
       .post('http://localhost:8000/api/login', {
          "email": "admin@example.com",
          "password": "adminPass"
       })
        .then((response) => {
          const jwtToken = response.data.JwtToken;
          const refreshToken = response.data.refreshToken;
          localStorage.setItem('jwtToken', jwtToken);
          localStorage.setItem('refreshToken', refreshToken);
        })
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
