import axios from "axios";

const state = {
  tasks: [],
};

const actions = {
  async fetchTasks({ commit }, token) {
    try {
      const response = await axios.get("http://50.17.81.170:3000/todo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      let res = response.data.tasks;
      commit("setTasks", res);
    } catch (e) {
      console.log("Error" + e);
    }
  },
  async addTasks({ commit }, {name, token}) {
    console.log(token);
    console.log(name);
    const response = await axios.post(
      "http://50.17.81.170:3000/todo",
      {
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    let res = response.data;
    commit("newTasks", res);
  },
  async updateTasks({ commit }, { taskId, token }) {
    try {
      const response = await axios.patch(
        `http://50.17.81.170:3000/todo/${taskId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      let res = response.data;
      commit("updateTask", res);
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  },
};

const getters = {
  allTasks: (state) => state.tasks,
};

const mutations = {
  setTasks: (state, tasks) => (state.tasks = tasks),
  newTasks: (state, task) => state.tasks.unshift(task),
  updateTask: (state, task) => {
    const index = state.tasks.findIndex((tasks) => tasks._id === task._id);
    if (index !== -1) {
      state.tasks.splice(index, 1, task);
    }
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
