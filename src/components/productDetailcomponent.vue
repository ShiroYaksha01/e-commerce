<template>
  <div class="product-detail">
    <div v-if="product.instock > 0" class="in-stock">In Stock</div>
    <h1 class="product-title">{{ product.name }}</h1>
    <div class="product-rating">
      <span>★</span> {{ product.rating }} (0)
    </div>
    <div class="product-price-row">
      <span class="product-price">{{ customPrice || ('$' + product.price) }}</span>
      <span class="product-old-price" v-if="product.promotionAsPercent > 0">
        ${{ (product.price / (1 - product.promotionAsPercent / 100)).toFixed(0) }}
      </span>
    </div>
    <p class="product-desc">
      {{ customDescription || "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam rem officia, corrupti recusandae minima nisi modi, quasi, odio minus dolore impedit fuga eum eligendi? Officia doloremque facere quia. Voluptatum, accusantium!" }}
    </p>
    <div class="product-actions">
      <input type="number" min="1" :max="product.instock" v-model="qty" class="qty-input" />
      <button class="add-to-cart">Add To Cart</button>
    </div>
    <div class="product-meta">
      <div><b>Vendor:</b> NestMart</div>
      <div><b>SKU:</b> FWM15VKT</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  product: Object,
  customPrice: String,
  customDescription: String
})
const qty = ref(1)
watch(() => props.product, () => { qty.value = 1 })
</script>

<style scoped>
.product-detail {
  min-width: 340px;
  flex: 1;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 32px 32px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.in-stock {
  color: #3bb77e;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 8px;
}
.product-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #253D4E;
}
.product-rating {
  color: #ffb300;
  font-size: 1.1rem;
  margin-bottom: 8px;
}
.product-price-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 8px;
}
.product-price {
  color: #3bb77e;
  font-size: 2rem;
  font-weight: 700;
}
.product-old-price {
  color: #aaa;
  font-size: 1.2rem;
  text-decoration: line-through;
}
.product-desc {
  color: #555;
  font-size: 1rem;
  margin-bottom: 12px;
}
.product-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.qty-input {
  width: 56px;
  padding: 6px 8px;
  border: 1px solid #eee;
  border-radius: 6px;
  font-size: 1rem;
}
.add-to-cart {
  background: #3bb77e;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.add-to-cart:hover {
  background: #259d65;
}
.product-meta {
  color: #888;
  font-size: 0.98rem;
  margin-top: 8px;
  display: flex;
  gap: 24px;
}
@media (max-width: 900px) {
  .product-detail {
    padding: 16px 8px;
    min-width: 0;
  }
}
</style>
