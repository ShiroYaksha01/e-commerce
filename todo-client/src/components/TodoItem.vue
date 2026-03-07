<template>
  <li class="list pending">
    <div @click="toggleStatus(todo.id)">
      <input type="checkbox" :checked="todo.completedAt != null"/>
      <span class="task">{{ todo.name }}</span>
      <i class="uil" :class="icon"></i>
    </div>
    <button class="delete-btn" @click.stop="deleteTodo(todo.id)">Delete</button>
  </li>
    
</template>
<script>
import { useTodoStore } from "../stores/todo";
export default {
  setup() {
    const todoStore = useTodoStore();
    return { todoStore };
  },
  props: ["todo", "icon"],
  methods: {
    toggleStatus(todoId) {
      this.todoStore.toggleStatus(todoId);
    },
    deleteTodo(todoId) {
      this.todoStore.deleteTodo(todoId);
    },
  },
};
</script>
