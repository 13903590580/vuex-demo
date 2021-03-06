const state = {
    todos: []
};
const getters = {
    getAllTodos: state => state.todos
};
const mutations = {
    setTodos: (state, todos) => state.todos = todos,
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id != id),
    updatedTodo: (state, updateTodo) => {
        const index = state.todos.findIndex(todo => todo.id == updateTodo.id);
        // console.log(index);
        if (index != -1) {
            state.todos.splice(index, 1, updateTodo);
        }
    }
};
const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get("http://jsonplaceholder.typicode.com/todos");
        commit("setTodos", response.data);
    },
    async addTodo({ commit }, title) {
        const response = await axios.post("http://jsonplaceholder.typicode.com/todos", {
            title, completed: false
        });
        commit("newTodo", response.data);
    },
    async deleteTodo({ commit }, id) {
        await axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`);
        commit("removeTodo", id);
    },
    async filterTodos({ commit }, count) {
        const response = await axios.get(`http://jsonplaceholder.typicode.com/todos?_limit=${count}`);
        commit("setTodos", response.data);
    },
    async updateTodo({ commit }, todo) {
        const response = await axios.put(`http://jsonplaceholder.typicode.com/todos/${todo.id}`, todo);
        commit("updatedTodo", response.data);
    }
};

export default {
    state, getters, mutations, actions
}