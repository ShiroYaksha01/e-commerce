

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';

type Category =  {
  name: string
  productCount: number
  image: string
  color?: string
  group : string
}

async function load_item(): Promise<Category[]> {
  const items = await fetch ('http://localhost:3000/api/categories')
  return await items.json()
}

const items: Ref<Category[]> = ref([])

onMounted( async () => {
  items.value = await load_item();
  console.log('Categories loaded:' + items.value);
  console.log(items);
});

</script>

<template>
  <div class="category-row">
    <div  v-for="item in items" :key="item.name">
      <div class="category" :style="{ borderColor: '#eee', background: item.color }">
      <img :src="`http://localhost:3000/${item.image}`" alt="Nothing" class="category-img" />
      <div class="category-title">{{ item.name }}</div>
      <div class="category-items">{{ item.productCount }} items</div>
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