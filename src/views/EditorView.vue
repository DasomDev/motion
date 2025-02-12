<script setup>
import { ref } from 'vue'
import { useObjectStore } from '@/store'
import { storeToRefs } from 'pinia'
import Converter from '@/components/Converter.vue'
import Header from '@/components/Header.vue'
import PreviewCanvas from '@/components/PreviewCanvas.vue'
import AnimationController from '@/components/AnimationController/index.vue'
import ObjectToolBar from '@/components/ObjectToolBar.vue'

const objectStore = useObjectStore()
const { yay } = storeToRefs(objectStore)
const toggleYay = () => {
  objectStore.yay = !objectStore.yay // Or use an action if defined in your store
}
const previewCanvasRef = ref(null)
</script>

<template>
  <div class="flex h-full pt-[50px]">
    <Header>
      <button @click="toggleYay">참고{{ yay }}</button>
    </Header>
    <div class="w-[75%] bg-[#F5F5F5] relative">
      <PreviewCanvas ref="previewCanvasRef" />
      <ObjectToolBar />
    </div>
    <div class="w-[25%] p-6">
      <AnimationController />
    </div>
  </div>
  <div v-if="yay" class="absolute inset-0 bg-blue-100">
    <button @click="toggleYay">똘백{{ yay }}</button>

    <Converter />
  </div>
</template>
