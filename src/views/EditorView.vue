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
  <div class="flex h-full pt-[50px] bg-[#1e1e1e] h-screen overflow-hidden">
    <Header>
      <!-- <button @click="toggleYay">참고{{ yay }}</button> -->
    </Header>
    <div class="w-[75%] relative border-r border-[#333333]">
      <!-- Main editor area -->
      <div
        class="absolute top-0 left-0 w-full h-8 bg-[#252526] flex items-center px-4 border-b border-[#333333]"
      >
        <span class="text-[#CCCCCC] text-sm">Preview</span>
      </div>
      <div class="h-full pt-8">
        <!-- Content area below tab -->
        <PreviewCanvas ref="previewCanvasRef" class="bg-[#2D2D2D]" />
        <ObjectToolBar class="absolute transform -translate-x-1/2 bottom-4 left-1/2" />
      </div>
    </div>
    <div class="w-[25%] bg-[#252526]"> <!-- Side panel -->
      <div class="h-8 bg-[#2D2D2D] flex items-center px-4 border-b border-[#333333]">
        <span class="text-[#CCCCCC] text-sm">Animation Controls</span>
      </div>
      <div class="p-4 overflow-x-clip overflow-y-auto h-[calc(100vh-66px)]">
        <AnimationController />
      </div>
    </div>
  </div>
  <div v-if="yay" class="absolute inset-0 bg-blue-100">
    <button @click="toggleYay">똘백{{ yay }}</button>
    <Converter />
  </div>
</template>

<style>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #2d2d2d;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #666;
}


</style>
