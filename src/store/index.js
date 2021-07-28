import { createStore } from "vuex";
import sortBy from "lodash/sortBy";

const store = createStore({
  state: {
    todos: [],
    userProfile: {},
    errors: "",
  },
  mutations: {
    SET_TODOS(state, value) {
      state.todos = value;
    },
    ADD_NEW_TASK(state, value) {
      state.todos.unshift(value);
      sortBy(state.todos, "title");
    },
    UPDATE_TASK_STATUS(state, value) {
      let index = state.todos.findIndex((obj) => obj.id === value.id);
      state.todos[index].isDone = value.isDone;
      state.todos[index].isPending = value.isPending;
    },
    UPDATE_DELETE_TASK(state, id) {
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
    SET_USER_PROFILE(state, value) {
      state.userProfile = value;
    },
    SET_ERROR(state, value) {
      state.errors = value;
    },
  },
  actions: {
    async fetchDailyTodos({ commit }, user) {
      await fetch(
        `http://localhost:3000/users/${user}/tasks?createdAt=${new Date().toDateString()}&_sort=title&_order=asc`
      )
        .then((res) => res.json())
        .then((data) => {
          commit("SET_TODOS", data);
        })
        .catch((err) => console.log(err.message));
    },
    async fetchAllTodos({ commit }, user) {
      await fetch(
        `http://localhost:3000/users/${user}/tasks?_sort=title&_order=asc`
      )
        .then((res) => res.json())
        .then((data) => {
          commit("SET_TODOS", data);
        })
        .catch((err) => console.log(err.message));
    },
    async deleteTodo({ commit }, id) {
      await fetch("http://localhost:3000/tasks/" + id, {
        method: "DELETE",
        mode: "cors",
      }).catch((err) => console.log(err.message));
      commit("UPDATE_DELETE_TASK", id);
    },
    async fetchDoneTodos({ commit }, user) {
      await fetch(
        `http://localhost:3000/users/${user}/tasks?isDone=true&_sort=title&_order=asc`
      )
        .then((res) => res.json())
        .then((data) => {
          commit("SET_TODOS", data);
        })
        .catch((err) => console.log(err.message));
    },
    async fetchPendingTodos({ commit }, user) {
      await fetch(
        `http://localhost:3000/users/${user}/tasks?isPending=true&_sort=title&_order=asc`
      )
        .then((res) => res.json())
        .then((data) => {
          commit("SET_TODOS", data);
        })
        .catch((err) => console.log(err.message));
    },
    async addNewTask({ commit }, data) {
      await fetch("http://localhost:3000/users/" + data.userId + "/tasks", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((err) => console.log(err.message));

      commit("ADD_NEW_TASK", data);
    },
    async updateTaskStatus({ commit }, payload) {
      await fetch("http://localhost:3000/tasks/" + payload.id, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).catch((err) => console.log(err.message));

      commit("UPDATE_TASK_STATUS", payload);
    },
    async fetchUserProfile({ commit }, payload) {
      await fetch("http://localhost:3000/users/" + payload.id)
        .then((res) => res.json())
        .then((data) => {
          data._token = payload._token;
          data.password = undefined;
          commit("SET_USER_PROFILE", data);
        })
        .catch((err) => console.log(err.message));
    },
    async updateUserProfile({ commit }, payload) {
      await fetch(`http://localhost:3000/users/${payload.id}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).catch((err) => console.log(err.message));
      commit("SET_USER_PROFILE", payload);
    },
    async loginToSystem({ commit }, payload) {
      await fetch(
        `http://localhost:3000/users?username=${payload.username}&password=${payload.password}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.length !== 0) {
            //generate token
            let token = btoa(
              `token_${data[0].id}_${Math.random()
                .toString(36)
                .slice(2)}`
            );
            localStorage.setItem("__token", token);
            location.reload();
          } else {
            commit("SET_ERROR", "Username or password is not valid!");
          }
        })
        .catch((err) => console.log(err.message));
    },
  },
});

export default store;
