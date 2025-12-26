<template>
  <div class="page-header">
    <div class="page-header-content">
      <h2 class="page-title">{{ title }}</h2>
      <nav class="breadcrumb">
        <span v-for="(crumb, i) in breadcrumb" :key="i">
          <span v-if="i !== 0"> &gt; </span>
          <span>{{ crumb }}</span>
        </span>
      </nav>
    </div>
    <div class="page-header-bg"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PageHeaderComponent",
  props: {
    title: {
      type: String,
      required: true
    },
    breadcrumb: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.page-header {
  position: relative;
  background: #e9f8f3;
  border-radius: 12px;
  margin: 24px 0;
  padding: 32px 40px 32px 40px;
  overflow: hidden;
  min-height: 100px;
}
.page-header-content {
  position: relative;
  z-index: 2;
}
.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #253D4E;
  margin-bottom: 8px;
}
.breadcrumb {
  color: #7e7e7e;
  font-size: 15px;
}
.page-header-bg {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 320px;
  height: 100%;
  background: url('/header-bg.svg') right bottom no-repeat;
  opacity: 0.15;
  z-index: 1;
  pointer-events: none;
}
</style>