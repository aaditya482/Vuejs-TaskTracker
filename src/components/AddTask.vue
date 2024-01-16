<template>
    <div>
        <h4>Add a Task</h4>
        <form @submit="onSubmit">
            <input type="text" v-model='name' placeholder="Add a task here" />
            <input type="submit" value="Submit" />
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default{
        name:'AddTask',
        data(){
            return{
                name:''
            }
        },  
        methods:{
            ...mapActions(['addTasks']),
            onSubmit(e){
                let token = localStorage.getItem("user");
                e.preventDefault();
                this.addTasks({name:this.name,token})
                this.name=''
            }
        }
    }
</script>

<style scoped>
  /* AddTask container styling */
  div {
    max-width: 500px;
    margin: 20px auto;
  }

  /* AddTask form styling */
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h4 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  input {
    padding: 10px;
    font-size: 16px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  input[type="submit"] {
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  input[type="submit"]:hover {
    background-color: #45a049;
  }
</style>
