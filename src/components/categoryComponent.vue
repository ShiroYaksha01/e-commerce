<template>
  <div class="category" :style="{ borderColor: '#eee', background: bgColor }">
    <img :src="imgSrc" :alt="title" class="category-img" />
    <div class="category-title">{{ title }}</div>
    <div class="category-items">{{ items }} items</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  items: number
  imgSrc: string
  bgColor?: string
}>()
</script>

<style scoped>
.category {
  width: 120px;
  padding: 12px 8px 8px 8px;
  border: 2px solid #eee;
  border-radius: 12px;
  background: #fafafa;
  text-align: center;
  margin: 0 8px;
  transition: border-color 0.2s;
}
.category-img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 8px;
}
.category-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 2px;
  color: #000
}
.category-items {
  font-size: 0.85rem;
  color: #888;
}
</style>