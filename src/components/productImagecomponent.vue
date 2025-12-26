<template>
  <div class="product-image-wrap">
    <div class="main-image">
      <img :src="mainImage" alt="Product" />
    </div>
    <div class="suggest-images">
      <img
        v-for="(img, i) in suggestImages"
        :key="i"
        :src="img"
        class="suggest-img"
        :class="{ active: i === 0 }"
        alt="Suggestion"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  mainImage: String,
  suggestImages: Array
})
</script>

<style scoped>
.product-image-wrap {
  width: 480px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 32px 24px 16px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main-image img {
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  object-fit: contain;
  background: #f8f8f8;
}
.suggest-images {
  display: flex;
  gap: 12px;
  margin-top: 18px;
}
.suggest-img {
  width: 84px;
  height: 84px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #eee;
  cursor: pointer;
  background: #fff;
  transition: border 0.2s;
}
.suggest-img.active,
.suggest-img:hover {
  border: 2px solid #3bb77e;
}
@media (max-width: 900px) {
  .product-image-wrap {
    width: 100%;
    max-width: 100%;
    padding: 16px 8px;
  }
  .main-image img {
    max-width: 100%;
  }
  .suggest-img {
    width: 60px;
    height: 60px;
  }
}
</style>
