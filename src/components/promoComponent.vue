
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
          <slot name="button" />
        </div>
      </div>
      <div
        v-if="item.image"
        class="promo-bg-img"
        :style="{
          backgroundImage: `url('${item.image}')`,
          right: '24px',
        }"
      ></div>
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
  top: 0;
  bottom: 0;
  right: 24px;
  margin: auto 0;
  width: 300px;
  height: 100%;
  min-height: 80px;
  max-height: 200px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right center;
  pointer-events: none;
  z-index: 0;
  opacity: 1;
  transition: right 0.2s;
}
</style>