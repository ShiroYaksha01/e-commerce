
<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';

type Promotion = {
  title: string
  image?: string
  buttonColor : string
  color?: string
  url : string
}

function shopNow(item: Promotion) {
  alert("Let's shop: " + item.title);
}

async function load_item(): Promise<Promotion[]> {
  const items = await fetch ('http://localhost:3000/api/promotions')
  return await items.json()
}

const items: Ref<Promotion[]> = ref([])

onMounted( async () => {
  items.value = await load_item();
  console.log('Promotions loaded:' + items.value);
  console.log(items);
});

</script>

<template>
  <div v-for="item in items" :key="item.title"> 
    <div class="promo" :style="{ background: item.color}">
      <div class="promo-content">
        <div class="promo-title">{{ item.title }}</div>
        <div @click="shopNow(item)">
          <slot name="button" :item="item" />
        </div>
      </div>
      <img :src="`http://localhost:3000/${item.image}`" alt="Nothing" class="promo-bg-img" />
    </div>
  </div>
  
</template>

<style scoped>
.promo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #eee;
  border-radius: 16px;
  padding: 24px 32px;
  min-height: 180px;
  margin: 0 12px;
  background: #fff;
}
.promo-content {
  flex: 1;
}
.promo-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #000
}


.promo {
  position: relative;
  overflow: hidden;
  min-height: 140px;
}
.promo-content {
  position: relative;
  z-index: 1;
  padding-right: 140px; /* ensures text never overlaps the image */
  box-sizing: border-box;
}

.promo-bg-img {
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  
  width: 250px;
  max-height: 140px;
  object-fit: contain;
  
  pointer-events: none;
  z-index: 0;
}


</style>