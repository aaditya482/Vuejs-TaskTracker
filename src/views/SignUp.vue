<template>
  <div>
    <h3>Sign Up</h3>
    <form @submit.prevent="submit">
      <input v-model="data.name" type="text" placeholder="username" required />
      <input v-model="data.email" type="email" placeholder="email" required />
      <input
        v-model="data.password"
        type="password"
        placeholder="password"
        required
      />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { reactive,computed } from "vue";
// import { mapActions } from 'vuex';
import { useStore } from 'vuex'
import { useRouter } from "vue-router";

export default {
  name: "SignUp",
  // methods:{
  //   ...mapActions('auth',['login'])
  // },
  setup() {
    const store=useStore();
    const data = reactive({
      name: "",
      email: "",
      password: "",
    });

    const router=useRouter();
    const status = computed(() => store.getters["auth/isAuthenticated"]);
   
    const submit = async () => {
      const response = await fetch("https://tasktracker-management.onrender.com/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials:'include',
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      const token = responseData.token;
      // await storeToken(token);
      localStorage.setItem("user", token);
      store.dispatch('auth/login');
      if(status.value){
        router.push('/')
      }else{
        router.push('/signin')
      }
    };

    return {
      data,
      submit,
    };
  },
};
</script>


<style scoped>
  /* Sign Up container styling */
  div {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  /* Sign Up form styling */
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h3 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }

  input {
    padding: 10px;
    font-size: 16px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 10px;
    font-size: 16px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }
</style>
