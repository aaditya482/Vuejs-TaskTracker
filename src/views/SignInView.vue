<template>
  <div>
    <h3>Sign In</h3>
    <form @submit.prevent="submit">
      <input v-model="data.email" type="email" placeholder="email" />
      <input v-model="data.password" type="password" placeholder="password" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { reactive,computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "SignIn",
  setup() {
    const store=useStore();
    const data = reactive({
      email: "",
      password: "",
    });
    const router = useRouter();
    const status = computed(() => store.getters["auth/isAuthenticated"]);

    const submit = async () => {
      const response = await fetch(`https://tasktracker-management.onrender.com/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials:'include',
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      const token = responseData.token;
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
  /* Sign In container styling */
  div {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  /* Sign In form styling */
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
