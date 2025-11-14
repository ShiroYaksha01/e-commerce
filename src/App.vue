<script setup lang="ts">
import categoryComponent from './components/categoryComponent.vue'
import promoComponent from './components/promoComponent.vue'
import buttonComponent from './components/buttonComponent.vue'



const buttonStyles = [
  { bgColor: '#3BB77E', textColor: '#fff'},
  { bgColor: '#3BB77E', textColor: '#fff'},
  { bgColor: '#FDC040', textColor: '#fff'},
]


</script>

<template>
  <div id="app-root">
    <categoryComponent/>

    <!-- Promo Row -->
    <div class="promo-row">
      <promoComponent/>
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
