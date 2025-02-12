<script setup>
import Converter from "@/components/Converter.vue"
import PreviewCanvas from "@/components/PreviewCanvas.vue"
import AnimationController from "@/components/AnimationController.vue"
</script>

<template>
  <div class="flex h-full">
    <nav class="h-[50px] absolute top-0 left-0 w-full border-b border-[#000]"></nav>
    <div class="w-[75%] bg-[#F5F5F5] mt-[50px]">
      <!-- <Converter /> -->
      <PreviewCanvas />
    </div>
    <div class="w-[25%] mt-[50px] p-6">
      <AnimationController />
    </div>
  </div>
</template>

<style scoped>
.editor-container {
  display: flex;
  height: 100%;
}

.editor-nav {
  width: 300px; /* or whatever width you need */
}

.preview-area {
  flex: 1;
}
</style>
