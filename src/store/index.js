import { createStore } from 'vuex'
import TaskTracker from './modules/taskTracker'
import auth from './modules/auth'

// Create a new store instance.
const store = createStore({
  modules:{
    TaskTracker,
    auth
  }
})
export default store;