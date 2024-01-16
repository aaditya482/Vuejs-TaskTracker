<template>
  <div>
    <h3>Task Tracker</h3>
    <AddTask v-if="isAuthenticated" />
    <div id="tasks" v-if="isAuthenticated">
      <h4>Task Yet to be completed</h4>
      <TaskRender :tasks="completedTask" type="not-completed" />
      <h4>Task completed</h4>
      <TaskRender :tasks="completedTask" type="completed" />
    </div>
    <div v-else>
      You are not logged In
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TaskRender from '../components/TaskRender.vue';
import AddTask from '../components/AddTask.vue';
import VueJwtDecode from "vue-jwt-decode";

export default {

  name: 'TaskTracker',
  computed: {
    ...mapGetters(['allTasks']),
    ...mapGetters('auth', ['isAuthenticated']),
    completedTask() {
      return this.allTasks;
    },
    // checkuser(){
    //   let token = localStorage.getItem("user");
    //   if(token!=null)
    //     return true
    //   else  
    //     return false
    // }
  },
  methods: {
  ...mapActions('auth', ['login']),
  ...mapActions(['fetchTasks']),
},

mounted() {
  this.login();
  let token = localStorage.getItem("user");
  if (token != null) {
    try {
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
      this.fetchTasks(token);
    } catch (error) {
      console.log(error, 'error from decoding token');
    }
  }
},
  components: {
    TaskRender,
    AddTask
  },
};
</script>

<style scoped>
  /* Home container styling */
  div {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  /* Title styling */
  h3 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }

  /* TaskTracker component styling */
  #tasks-container {
    margin-top: 20px;
  }

  /* AddTask component styling */
  #add-task-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  #task-input {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  #add-button {
    padding: 10px;
    font-size: 16px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  #add-button:hover {
    background-color: #45a049;
  }

  /* TaskRender component styling */
  #tasks {
    margin-top: 20px;
  }

  h4 {
    color: #333;
    font-size: 18px;
    margin-top: 20px;
  }
</style>
