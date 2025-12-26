<script>
import axios from 'axios'
import CategoryComponent from '../components/categoryComponent.vue'
import PromotionComponent from '../components/promoComponent.vue'
import ButtonComponent from '../components/buttonComponent.vue'
import MenuComponent from '../components/menuComponent.vue'
import ProductComponent from '../components/productComponent.vue'
import {useProductStore} from '../stores/product'
import {mapState} from 'pinia'
import { useRouter } from 'vue-router'

// Add imports for new components
import NavBarComponent from '../components/navBarComponent.vue'
import ShowCaseComponent from '../components/showCaseComponent.vue'
import MenuItemComponent from '@/components/menuItemComponent.vue'

export default {
  components: {
    CategoryComponent,
    PromotionComponent,
    ButtonComponent,
    MenuComponent,
    ProductComponent,
    NavBarComponent,      // Add NavBarComponent
    ShowCaseComponent     // Add ShowCaseComponent
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
  setup() {
    const productStore = useProductStore()
    const router = useRouter()
    return { productStore, router }
  },
  methods: {
    shopNow(promotion) {
      alert("Let's shop: " + promotion.title);
    },
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
    },
    goToProduct(product) {
      this.$router.push({ name: 'product', params: { productId: product.id } })
    }
  },
  mounted() {
    this.productStore.fetchCategories();
    this.productStore.fetchPromotions();
    this.productStore.fetchGroups();
    this.productStore.fetchProducts();
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

    <!-- NavBar -->
    <NavBarComponent />
    

    <!-- Showcase -->
    <ShowCaseComponent />

    <!-- Featured Categories Section -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Featured Categories</h2>
        <MenuComponent 
          :menuItems="categoryMenuItems" 
          :activeItem="activeCategoryMenu"
          @select="selectCategoryMenu"
        />
      </div>
      <div class="category-row">
        <CategoryComponent
          v-for="(cate, i) in productStore.categories"
          :key="cate.title + i"
          v-bind="cate"
          :bgColor="cate.bgColor"
        />
      </div>
    </section>

    <!-- Promotions Row -->
    <div class="promotions-row">
      <PromotionComponent
        v-for="(promo, i) in productStore.promotions"
        :key="promo.title + i"
        :title="promo.title"
        desc=""
        :imgSrc="promo.imgSrc"
        :bgColor="promo.bgColor"
      >
        <template #button>
          <ButtonComponent :bgColor="promo.buttonColor" textColor="#fff" @click="shopNow(promo)">Shop Now →</ButtonComponent>
        </template>
      </PromotionComponent>
    </div>

    <!-- Popular Products Section -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Popular Products</h2>
        <MenuComponent 
          :menuItems="productMenuItems" 
          :activeItem="activeProductMenu"
          @select="selectProductMenu"
        />
      </div>
      <div class="products-grid">
        <ProductComponent
          v-for="product in popularProducts"
          :key="product.id"
          :id="product.id"
          :name="product.name"
          :imgSrc="product.imgSrc"
          :price="product.price"
          :rating="product.rating"
          :promotionAsPercent="product.promotionAsPercent"
          :countSold="product.countSold"
          @click="goToProduct(product)"
          @add-to-cart="addToCart"
          style="cursor:pointer"
        />
      </div>
    </section>

  </div>
</template>

<style scoped>
#app-root {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.section {
  margin-bottom: 48px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #253D4E;
  margin: 0;
}

.category-row {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 16px;
  padding: 0 16px 24px 16px;
}

.promotions-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 18px;
  padding: 0 16px;
  margin-bottom: 48px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
  padding: 0 16px;
}

@media (max-width: 900px) {
  .promotions-row {
    flex-direction: column;
    gap: 18px;
    align-items: center;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 16px;
  }
}
</style>