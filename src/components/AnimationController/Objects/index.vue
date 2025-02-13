<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useControllerStore, useObjectStore } from '@/store'

import AnimationType from './AnimationType.vue'
import AnimationProperty from './AnimationProperty.vue'
const controllerStore = useControllerStore()
const objectStore = useObjectStore()
const { selectedAnimationType, ANIMATION_TYPE } = storeToRefs(controllerStore)
const { selectedObject } = storeToRefs(objectStore)

const animationConfig = ref({
  startValue: 11,
  endValue: 88,
  duration: 1000, // in milliseconds
  easing: 'linear',
})
</script>
<template>
  <div class="flex flex-col gap-2">
    <p>
      <label for="animation-type">선택 요소</label>
      <br />
      {{ selectedObject?.id }}
    </p>
    <p>
      <label for="animation-type">캔버스 기준 좌표</label>
      x: {{ selectedObject?.x }} y: {{ selectedObject?.y }}
    </p>

    <AnimationType />

    <AnimationProperty />
  </div>
</template>
