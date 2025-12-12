<script setup lang="ts">


defineProps<{
  menuItems: string[]
  activeItem: string
}>()

defineEmits(['select'])


</script>

<template>

  <div class="whole-menu">

    <h1 class="menu-title">
      <slot />
    </h1>

    <div class="menu-container">
      <button
        v-for="(item, index) in menuItems"
        :key="index"
        class="menu-item"
        :class="{ active: activeItem === item }"
        @click="$emit('select', item)"
      >
        {{ item }}
      </button>
    </div>

  </div>
    
  
</template>

<style scoped>
.whole-menu {
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-around;
}

.menu-container {
  display: flex;
  gap: 16px;
  padding: 12px 16px;
  overflow-x: auto;
  flex-wrap: wrap;
}

.menu-item {
  padding: 8px 20px;
  border: none;
  background: transparent;
  color: #253D4E;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s;
  border-radius: 4px;
}

.menu-item:hover {
  color: #3BB77E;
  background: #F4F6FA;
}

.menu-item.active {
  color: #3BB77E;
  font-weight: 700;
  position: relative;
}

.menu-item.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 2px;
  background: #3BB77E;
}
</style>