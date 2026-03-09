<template>
  <li class="list pending">
    <div @click="toggleStatus(todo.id)">
      <input type="checkbox" :checked="todo.completedAt != null"/>
      <span class="task">{{ todo.name }}</span>
    </div>
    <i class="uil" :class="icon"  @click.stop="deleteTodo(todo.id)"></i>
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
