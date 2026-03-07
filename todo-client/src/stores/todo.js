import { defineStore } from "pinia";
import axios from 'axios';


export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),
  getters: {
    countTodos: (state) => state.todos.length,
  },
  actions: {
    async fetchTodos() {
      try {
        const response = await axios.get('http://localhost:3100/tasks');
        this.todos = response.data; // assuming the API returns an array of todos
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    },
    async toggleStatus(id) {
      try {
        const foundIndex = this.todos.findIndex((t) => t.id == id);
        if (foundIndex >= 0) {
          const newCompletedAt = this.todos[foundIndex].completedAt != null ? null : new Date().toISOString();
          await axios.patch(`http://localhost:3100/tasks/${id}`, { completedAt: newCompletedAt });
          this.todos[foundIndex].completedAt = newCompletedAt;
        }
      } catch (error) {
        console.error('Failed to toggle todo status:', error);
      }
    },
    async addTodo(todo) {
      try {
        const response = await axios.post('http://localhost:3100/tasks', {
          name: todo,
          description: "description",
        });
        this.todos.push(response.data);
      } catch (error) {
        console.error('Failed to add todo:', error);
      }
    },
    async deleteTodo(id) {
      try {
        await axios.delete(`http://localhost:3100/tasks/${id}`);
        const foundIndex = this.todos.findIndex((t) => t.id == id);
        if (foundIndex >= 0) {
          this.todos.splice(foundIndex, 1);
        }
      } catch (error) {
        console.error('Failed to delete todo:', error);
      }
    },
    async clearAll() {
      try {
        await axios.delete('http://localhost:3100/tasks');
        this.todos = [];
      } catch (error) {
        console.error('Failed to clear todos:', error);
      }
    },
  },
});
