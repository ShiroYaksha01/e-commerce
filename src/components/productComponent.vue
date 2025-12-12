<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  id: number
  name: string
  imgSrc: string
  price: number
  rating: number
  promotionAsPercent?: number
  countSold?: number
  categoryName?: string
}>()

defineEmits(['add-to-cart'])

const discountedPrice = computed(() => {
  if (props.promotionAsPercent && props.promotionAsPercent > 0) {
    return (props.price * (1 - props.promotionAsPercent / 100)).toFixed(2)
  }
  return props.price.toFixed(2)
})

const badge = computed(() => {
  // Hot takes priority if countSold > 20
  if (props.countSold && props.countSold > 20) {
    return 'hot'
  }
  // Sale shows if discounted but NOT hot
  if (props.promotionAsPercent && props.promotionAsPercent > 0) {
    return 'sale'
  }
  return null
})

const badgeType = computed(() => {
  return badge.value || ''
})

const badgeText = computed(() => {
  if (badge.value === 'hot') return 'Hot'
  if (badge.value === 'sale') return 'Sale'
  return ''
})
</script>

<template>
  <div class="product-card">
    <!-- Label badges -->
    <div class="badges">
      <span v-if="badge" class="badge" :class="badgeType">
        {{ badgeText }}
      </span>
    </div>

    <!-- Product Image -->
    <div class="product-image">
      <img :src="imgSrc" :alt="name" />
    </div>

    <!-- Product Info -->
    <div class="product-info">
      <div class="product-category">{{ categoryName || 'Hodo Foods' }}</div>
      <div class="product-name">{{ name }}</div>
      
      <!-- Rating -->
      <div class="product-rating">
        <div class="stars">
          <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= rating }">★</span>
        </div>
        <span class="rating-text">({{ rating }})</span>
      </div>

      <!-- Price and Add Button -->
      <div class="product-footer">
        <div class="price-section">
          <span class="current-price">${{ discountedPrice }}</span>
          <span v-if="promotionAsPercent && promotionAsPercent > 0" class="original-price">${{ price }}</span>
        </div>
        <button class="add-btn" @click="$emit('add-to-cart', { id, name, price })">
          <span>Add</span>
          <span class="plus">+</span>
        </button>
      </div>
    </div>
  </div>
</template>



<style scoped>
.product-card {
  background: white;
  border: 1px solid #ececec;
  border-radius: 16px;
  padding: 20px;
  position: relative;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: #3BB77E;
}

.badges {
  position: absolute;
  top: 16px;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 1;
}

.badge {
  padding: 6px 16px;
  border-radius: 0 20px 20px 0;
  font-size: 13px;
  font-weight: 700;
  color: white;
  text-transform: capitalize;
}

.badge.sale {
  background: #FDC040;
}

.badge.hot {
  background: #F74B81;
}

.badge.discount {
  background: #3BB77E;
}

.product-image {
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-category {
  color: #B6B6B6;
  font-size: 12px;
  margin-bottom: 4px;
}

.product-name {
  color: #253D4E;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
  min-height: 40px;
  line-height: 1.4;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  color: #DEE2E7;
  font-size: 14px;
}

.star.filled {
  color: #FDC040;
}

.rating-text {
  color: #B6B6B6;
  font-size: 12px;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.current-price {
  color: #3BB77E;
  font-size: 20px;
  font-weight: 700;
}

.original-price {
  color: #ADADAD;
  font-size: 16px;
  font-weight: 500;
  text-decoration: line-through;
}

.add-btn {
  background: #DEF9EC;
  border: none;
  border-radius: 6px;
  padding: 6px 16px;
  color: #3BB77E;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s;
}

.add-btn:hover {
  background: #3BB77E;
  color: white;
}

.plus {
  font-size: 16px;
}
</style>