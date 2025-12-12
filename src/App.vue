<script  lang="ts">
import axios from 'axios'
import categoryComponent from './components/categoryComponent.vue'
import promoComponent from './components/promoComponent.vue'
import buttonComponent from './components/buttonComponent.vue'
import menuComponent from './components/menuComponent.vue'
import productComponent from './components/productComponent.vue'
import { useProductStore } from './stores/product.ts'

import {mapState} from 'pinia'

export default {
  components: {
    categoryComponent,
    promoComponent,
    buttonComponent,
    menuComponent,
    productComponent
  },

  
  setup() {
    const productStore = useProductStore()
    return { productStore }
  },
  methods: {
    selectCategoryMenu(item) {
      this.activeCategoryMenu = item
      this.currentGroupName = item === 'All' ? '' : item
    },
    selectProductMenu(item) {
      this.activeProductMenu = item
      this.currentGroupName = item === 'All' ? '' : item
    },
    addToCart(product) {
      console.log('Add to cart:', product)
      // TODO: Implement add to cart functionality
    }
  },
  mounted() {
    this.productStore.fetchCategories();
    this.productStore.fetchPromotions();
    this.productStore.fetchGroups();
    this.productStore.fetchProducts();
  },

  data() {
    return {
      currentGroupName: '',
      categoryMenuItems: ['All', 'Milks & Diaries', 'Coffee & Teas', 'Pet Foods', 'Meats', 'Vegetables', 'Fruits'],
      activeCategoryMenu: 'All',
      productMenuItems: ['All', 'Milks & Diaries', 'Coffee & Teas', 'Pet Foods', 'Meats', 'Vegetables', 'Fruits'],
      activeProductMenu: 'All'
    }
  },

  computed: {
    ...mapState(useProductStore, {
      popularProducts: 'getPopularProducts',
      
      categories(store) {
        const result = store.getCategoriesByGroup(this.currentGroupName)
        console.log('Categories for group', this.currentGroupName, ':', result)
        return result
      },
      
      products(store) {
        const result = store.getProductsByGroup(this.currentGroupName)
        console.log('Products for group', this.currentGroupName, ':', result)
        return result
      }
    })
  },
  watch: {
    popularProducts(newVal) {
      console.log('Popular Products:', newVal)
    },
    currentGroupName(newVal) {
      console.log('Group changed to:', newVal)
    }
  }
}
</script>

<template>
  <div id="app-root">

    <menuComponent 
          :menuItems="categoryMenuItems" 
          :activeItem="activeCategoryMenu"
          @select="selectCategoryMenu"
    >
      Featured Products
    </menuComponent>


    <categoryComponent/>

    <!-- Promo Row -->
    <div class="promo-row">
      <promoComponent>
        <template #button="{ item }">
          <buttonComponent :bgColor="item.buttonColor" textColor="#fff">
            Shop Now
          </buttonComponent>
        </template>
      </promoComponent>

    </div>


    <menuComponent 
        :menuItems="productMenuItems" 
        :activeItem="activeProductMenu"
        @select="selectProductMenu"
    >
      Popular Products
    </menuComponent>

    <div class="products-grid">
        <productComponent
          v-for="product in popularProducts"
          :key="product.id"
          :id="product.id"
          :name="product.name"
          :imgSrc="product.imgSrc"
          :price="product.price"
          :rating="product.rating"
          :promotionAsPercent="product.promotionAsPercent"
          :countSold="product.countSold"
          @add-to-cart="addToCart"
        />
    </div>

  </div>
</template>

<style scoped>
#app-root {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2px;
  text-align: center;
  width: auto;
}



/* Promo Row */
.promo-row {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 30px;
  padding-bottom: 8px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(220px, 1fr));
  gap: 24px;
  padding: 0 16px;
}

</style>