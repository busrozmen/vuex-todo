import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

const removerAcentos = (string) => {
  const mapaAcentosHex = {
    a: /[\xE0-\xE6]/g,
    e: /[\xE8-\xEB]/g,
    i: /[\xEC-\xEF]/g,
    o: /[\xF2-\xF6]/g,
    u: /[\xF9-\xFC]/g,
    c: /\xE7/g
  }

  for (let letra in mapaAcentosHex) {
    var expressaoRegular = mapaAcentosHex[letra]
    string = string.replace(expressaoRegular, letra)
  }

  return string
}

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
    todos: [],
    todo: {},
    searchWord: null,
    filteredTodos: null,
  },

  getters: {
    user(state){
      return state.user
    },
    allTodos: state => state.todos,
    getSearchWord: (state) => state.searchWord,
    getFilteredTodo: (state) => state.filteredTodo,
    getTodo: (state) => state.todo,

  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) =>
      (state.todos = state.todos.filter(todo => todo.id !== id)),
    updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updTodo.id);
    if (index !== -1) {
        state.todos.splice(index, 1, updTodo);
    }
    },
    filteredTodos (state, word) {
      if (!(word) || word === '{}') {
          state.searchWord = null
          state.filteredTodos = null
      } else {
        state.searchWord = word
        word = removerAcentos(word.trim().toLowerCase())
        state.filteredTodos = state.todos.filter((todo) => {
          return todo.title.toLowerCase().includes(word) || todo.description.toLowerCase().includes(word)
        })
      }
      state.todos=state.filteredTodos;
    }
   },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);

      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        commit("SET_USER", null);
      }
    },
    async fetchTodos({ commit }) {
      const response = await axios.get('http://localhost:3000/posts/'
      );  
      commit('setTodos', response.data);
    },
    async addTodo({ commit }, titledesc) {
      var title = titledesc.title;
      var description=titledesc.description;
      const response = await axios.post(
        'http://localhost:3000/posts/',
        { title, description, completed: false }
      );  
      commit('newTodo', response.data);
    },
    async deleteTodo({ commit }, id) {
      await axios.delete(`http://localhost:3000/posts/${id}`);  
      commit('removeTodo', id);
    },
    async updateTodo({ commit }, updTodo) {
        const response = await axios.put(
          `http://localhost:3000/posts/${updTodo.id}`,
          updTodo
        );  
        commit('updateTodo', response.data);
    },
    filteredTodos({ commit }, word) {
      commit('filteredTodos', word)
    }
  }
});
