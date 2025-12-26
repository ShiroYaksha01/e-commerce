<script setup lang="ts">
import SearchboxComponent from '@/components/searchboxComponent.vue'
</script>

<template>
  <div class="searchbox-wrapper">
    <router-link to="/">
      <img class="logo_img" src="/img/logo.png" alt="Logo">
    </router-link>
    <SearchboxComponent/>
  </div>
</template>

<style scoped>
.searchbox-wrapper {
  margin-top: 20px;
  display: flex;
  width: 150%;
  padding: 10px;
  margin-left: -260px;
}

.logo_img {
  width: 165px;
  height: 50px;
}

</style>