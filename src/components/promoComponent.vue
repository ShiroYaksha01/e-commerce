
<template>
  <div class="promo" :style="{ background: bgColor, borderColor: borderColor }">
    <div class="promo-content">
      <div class="promo-title">{{ title }}</div>
      <div class="promo-desc">{{ desc }}</div>
      <slot name="button"></slot>
    </div>
    <div
      v-if="imgSrc"
      class="promo-bg-img"
      :style="{
        backgroundImage: `url('${imgSrc}')`,
        right: imgXOffset || '24px',
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  desc: string
  imgSrc?: string
  bgColor?: string
  borderColor?: string
  imgXOffset?: string | number
}>()
</script>

<style scoped>
.promo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #eee;
  border-radius: 16px;
  padding: 24px 32px;
  min-height: 180px;
  margin: 0 12px;
  background: #fff;
}
.promo-content {
  flex: 1;
}
.promo-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #000
}
.promo-desc {
  font-size: 1rem;
  color: #555;
  margin-bottom: 16px;
}
.promo-bg-img {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 24px;
  margin: auto 0;
  width: 300px;
  height: 100%;
  min-height: 80px;
  max-height: 200px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right center;
  pointer-events: none;
  z-index: 0;
  opacity: 1;
  transition: right 0.2s;
}
.promo {
  position: relative;
  overflow: hidden;
  min-height: 140px;
}
.promo-content {
  position: relative;
  z-index: 1;
  padding-right: 140px; /* ensures text never overlaps the image */
  box-sizing: border-box;
}
</style>