

<script setup lang="ts">
import { computed } from 'vue'
import { useProductStore } from '../stores/product'

const productStore = useProductStore()

const items = computed(() => productStore.categories)

</script>

<template>
  <div class="category-row">
    <div  v-for="item in items" :key="item.title">
      <div class="category" :style="{ borderColor: '#eee', background: item.bgColor }">
        <img :src="item.imgSrc" alt="Nothing" class="category-img" />
        <div class="category-title">{{ item.title }}</div>
        <div class="category-items">{{ item.items }} items</div>
      </div>
    </div>

  </div>
  
  
</template>

<style scoped>

/* Category Row */
.category-row {
  width: 100%;
  display: flex;
  flex-direction: row;

  gap: 16px;
  margin-bottom: 40px;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;
}
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