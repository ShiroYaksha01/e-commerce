<script lang="ts">
import categoryComponent from './components/categoryComponent.vue'
import promoComponent from './components/promoComponent.vue'
import buttonComponent from './components/buttonComponent.vue'
//TP03
import {mapState} from 'pinia'
import { useProductStore } from './stores/product.ts'
import { onMounted } from 'vue'

export default {
  name: 'App',
  components: {
    categoryComponent,
    promoComponent,
    buttonComponent
  },

  data() {
    return {
      currentGroupName: 'Group A'
    }
  },

  computed: {
    ...mapState(useProductStore, {
      popularProducts: 'getPopularProducts',
      categories(store) {
        return this.store.getCategoriesByGroup(this.currentGroupName)
      },
      // more goes here
    })
  },

  mounted() {
    const productStore = useProductStore()
    productStore.fetchProducts()
    productStore.fetchCategories()
    productStore.fetchPromotions()
  }

}


</script>

<template>
  <div id="app-root">
    <categoryComponent/>

    <!-- Promo Row -->
    <div class="promo-row">
      <promoComponent>
        <template #button="{ item }">
          <buttonComponent
            :bgColor="item.buttonColor"
            textColor="#fff"
          >
            Shop Now
          </buttonComponent>
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
  padding: 2px;
  text-align: center;
  width: 100%;
}



/* Promo Row */
.promo-row {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 30px;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;
}
</style>
