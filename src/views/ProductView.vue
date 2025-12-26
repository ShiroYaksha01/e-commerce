<template>
  <div class="product-view">
    <NavBarComponent />
    <div class="product-main">
      <ProductImageComponent :mainImage="mainImage" :suggestImages="suggestImages" />
      <ProductDetailComponent :product="product" :customPrice="'2.8 to 2.51'" :customDescription="description" />
    </div>
    <!-- Tabs and description (mockup) -->
    <div class="product-tabs">
      <div class="tabs">
        <button class="active">Description</button>
        <button>Additional Info</button>
        <button>Reviews (3)</button>
      </div>
      <div class="tab-content">
        <p>{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product'
import NavBarComponent from '@/components/navBarComponent.vue'
import ProductImageComponent from '@/components/ProductImageComponent.vue'
import ProductDetailComponent from '@/components/ProductDetailComponent.vue'

const route = useRoute()
const productStore = useProductStore()
const product = ref({})
const mainImage = ref('')
const suggestImages = [
  '/product_suggest1.png',
  '/product_suggest2.png',
  '/product_suggest3.png',
  '/product_suggest4.png'
]

const description = "This is a delicious and fresh product, perfect for your daily needs. Carefully selected and packed to ensure the best quality. Enjoy the taste and health benefits with every purchase. Limited stock available, grab yours now!"

onMounted(() => {
  const id = Number(route.params.productId)
  const found = productStore.products.find(p => p.id === id)
  if (found) {
    product.value = found
    mainImage.value = found.imgSrc
  }
})
</script>

<style scoped>
.product-view {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 0 0 0;
}
.product-main {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}
.product-tabs {
  margin-top: 32px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 24px;
}
.tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}
.tabs button {
  background: none;
  border: none;
  font-weight: 600;
  font-size: 16px;
  color: #253D4E;
  padding: 8px 16px;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
}
.tabs button.active {
  background: #e9f6ef;
  color: #3bb77e;
}
.tab-content {
  font-size: 15px;
  color: #555;
}
@media (max-width: 900px) {
  .product-main {
    flex-direction: column;
    gap: 24px;
  }
}
</style>
