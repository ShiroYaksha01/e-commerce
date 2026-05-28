<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { useTodoStore } from '@/stores/todo.store'

const todoStore = useTodoStore()
const title = ref('')
const filter = ref<'all' | 'active' | 'done'>('all')
let stopRealtime: null | (() => void) = null

const filteredTodos = computed(() => {
  if (filter.value === 'active') {
    return todoStore.todos.filter(t => !t.is_done)
  }
  if (filter.value === 'done') {
    return todoStore.todos.filter(t => t.is_done)
  }
  return todoStore.todos
})

onMounted(async () => {
  await todoStore.fetchTodos()
  // Optional realtime:
  stopRealtime = todoStore.startRealtime()
})

onBeforeUnmount(() => stopRealtime?.())

async function onAdd() {
  if (!title.value.trim()) return
  await todoStore.addTodo(title.value)
  title.value = ''
}
</script>

<template>
  <div class="todo-container">
    <h1>Hasura Todo List</h1>

    <div class="add-todo">
      <input 
        v-model="title" 
        @keyup.enter="onAdd" 
        placeholder="What needs to be done?"
        :disabled="todoStore.loading"
      />
      <button @click="onAdd" :disabled="todoStore.loading">Add</button>
    </div>

    <div class="filters">
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
      <button :class="{ active: filter === 'active' }" @click="filter = 'active'">Active</button>
      <button :class="{ active: filter === 'done' }" @click="filter = 'done'">Done</button>
    </div>

    <div v-if="todoStore.error" class="error">
      {{ todoStore.error }}
    </div>

    <div v-if="todoStore.loading && !todoStore.todos.length" class="loading">
      Loading todos...
    </div>

    <ul class="todo-list">
      <li v-for="todo in filteredTodos" :key="todo.id" :class="{ done: todo.is_done }">
        <input 
          type="checkbox" 
          :checked="todo.is_done" 
          @change="todoStore.toggleTodo(todo)"
        />
        <span class="title">{{ todo.title }}</span>
        <button class="delete-btn" @click="todoStore.deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.todo-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
}

.add-todo {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.add-todo input {
  flex: 1;
  padding: 0.5rem;
}

.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filters button {
  background: #f0f0f0;
  border: 1px solid #ccc;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  border-radius: 4px;
}

.filters button.active {
  background: #4caf50;
  color: white;
  border-color: #4caf50;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
  gap: 0.5rem;
}

.todo-list li.done .title {
  text-decoration: line-through;
  color: #888;
}

.title {
  flex: 1;
}

.delete-btn {
  background: #ff4444;
  color: white;
  border: none;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  border-radius: 4px;
}

.delete-btn:hover {
  background: #cc0000;
}

.error {
  color: red;
  margin-bottom: 1rem;
}

.loading {
  font-style: italic;
  color: #666;
}
</style>
