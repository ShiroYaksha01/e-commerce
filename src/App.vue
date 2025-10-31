<script setup lang="ts">
import categoryComponent from './components/categoryComponent.vue'
import promoComponent from './components/promoComponent.vue'
import buttonComponent from './components/buttonComponent.vue'

const categories = [
  { title: 'Cake & Milk', items: 14, imgSrc: '/img/cate/1.png', bgColor: "#F2FCE4"},
  { title: 'Peach', items: 17, imgSrc: '/img/cate/2.png', bgColor: "#FEFBE8"},
  { title: 'Organic Kiwi', items: 21, imgSrc: '/img/cate/3.png', bgColor: "#EAFEEF"},
  { title: 'Red Apple', items: 68, imgSrc: '/img/cate/4.png', bgColor: "#FFF0E9"},
  { title: 'Snack', items: 34, imgSrc: '/img/cate/5.png', bgColor: "#FEF4EB"},
  { title: 'Black plum', items: 25, imgSrc: '/img/cate/6.png', bgColor: "#FFF4FF"},
  { title: 'Vegetables', items: 65, imgSrc: '/img/cate/7.png', bgColor: "#F2FCE4"},
  { title: 'Headphone', items: 33, imgSrc: '/img/cate/8.png', bgColor: "#FEFBE8"},
  { title: 'Cake & Milk', items: 54, imgSrc: '/img/cate/9.png', bgColor: "#F2FCE4"},
  { title: 'Orange', items: 63, imgSrc: '/img/cate/10.png', bgColor: "#FFF3FF"},
]
</script>

<template>
  <div id="app-root">
    <!-- Category Row -->
    <div class="category-row">
      <categoryComponent
        v-for="(cate, i) in categories"
        :key="cate.title + i"
        v-bind="cate"
      />
    </div>

    <!-- Promo Row -->
    <div class="promo-row">
      <promoComponent
        title="Everyday Fresh & Clean with Our Products"
        desc=""
        imgSrc="/img/promo/1.png"
        bgColor="#f0e8d5"
        borderColor="#f8fafb"
      >
        <template #button>
          <buttonComponent bgColor="#27ae60" textColor="#fff">Shop Now →</buttonComponent>
        </template>
      </promoComponent>

      <promoComponent
        title="Make your Breakfast Healthy and Easy"
        desc=""
        imgSrc="/img/promo/2.png"
        bgColor="#fff"
        borderColor="#f8fafb"
      >
        <template #button>
          <buttonComponent bgColor="#27ae60" textColor="#fff">Shop Now →</buttonComponent>
        </template>
      </promoComponent>

      <promoComponent
        title="The best Organic Products Online"
        desc=""
        imgSrc="/img/promo/3.png"
        bgColor="#e7eaf3"
        borderColor="#eaf6f2"
      >
        <template #button>
          <buttonComponent bgColor="#f7b32b" textColor="#fff">Shop Now →</buttonComponent>
        </template>
      </promoComponent>
    </div>
  </div>
</template>

<style scoped>
#app-root {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 16px;
  text-align: center;
  width: 100%;
}

/* Category Row */
.category-row {
  display: flex;
  flex-wrap: nowrap; 
  overflow-x: auto; 
  gap: 16px;
  margin-bottom: 40px;
  padding-bottom: 8px; 
  -webkit-overflow-scrolling: touch; 
}

/* Promo Row */
.promo-row {
  display: flex;
  flex-wrap: nowrap; 
  overflow-x: auto; 
  gap: 24px;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;
}
</style>
