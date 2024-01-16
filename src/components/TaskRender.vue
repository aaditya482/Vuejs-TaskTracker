<template>
  <div class="task-container">
    <div v-for="task in tasks" :key="task.id" :class="{ 'hide-task': shouldHideTask(task) }">
      <div  @click="UpdateTask(task._id)"
        style="padding: 20px; border: 1px solid black"
        v-if="type === 'completed' && task.status"
        class="completed-task"
      >
        {{ task.name }}
      </div>
      <div @click="UpdateTask(task._id)"
        style="padding: 20px; border: 1px solid black"
        v-else-if="type === 'not-completed' && !task.status"
      >
        {{ task.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    tasks: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  computed: {},
  methods: {
    ...mapActions(["updateTasks"]),
    UpdateTask(taskId) {
      let token = localStorage.getItem("user");
      this.updateTasks({ taskId, token });
    },
    shouldHideTask(task) {
      if (this.type === "completed" && task.status) {
        return false; // Don't hide if it's a completed task
      } else if (this.type === "not-completed" && !task.status) {
        return false; // Don't hide if it's a not completed task
      } else {
        return true; // Hide the task if conditions are not satisfied
      }
    },
  },
};
</script>

<style scoped>
.task-container {

  padding: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.task-container>div>div {
  margin: 10px;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  text-overflow: ellipsis;
}

.task-container>div>div:hover {
  box-shadow: 0 0 8px 5px rgba(0, 0, 0, 0.2);
  background-color: blue;
  color: #fff;
}

.completed-task {
  opacity: 0.8;
  text-decoration: line-through;
}

.hide-task {
  display: none;
}
</style>