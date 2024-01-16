<template>
  <nav>
    <router-link to="/">Home Page</router-link>
    <div>
      <router-link v-if="!isAuthenticated" to="/signin">Login</router-link>
      <router-link v-if="!isAuthenticated" to="/signup">Sign Up</router-link>
      <router-link @click="handleLogout" v-if="isAuthenticated" to="/signin">Logout</router-link>
    </div>
  </nav>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
export default {
  name: "MainNavbar",
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
  },
  methods: {
    ...mapActions('auth', ['logout']),
    handleLogout(){
      this.logout();
    }
    
  },
};
</script>

<style scoped>
  /* Navigation bar styling */
  nav {
    width: 52.5%;
    margin-left: 22.5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #f4f4f4; /* Match the background color of the home page */
    color: #333; /* Text color matching the home page */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* Navigation links styling */
  a {
    text-decoration: none !important;
    color: #333; /* Text color matching the home page */
    margin-right: 20px;
    font-size: 16px;
  }

  /* Navigation links on hover styling */
  a:hover {
    text-decoration: underline;
    color: blue;
    transition: 0.5s ease-in;
  }

  /* Logout button styling */
  [v-if="isAuthenticated"] {
    cursor: pointer;
    background-color: #d9534f;
    padding: 8px 15px;
    border: none;
    color: #fff;
    border-radius: 4px;
    font-size: 16px;
  }

  [v-if="isAuthenticated"]:hover {
    background-color: #c9302c;
  }

  /* Hide sign-up and sign-in links for authenticated users */
  div > a[v-if="isAuthenticated"] {
    display: none;
  }
</style>
