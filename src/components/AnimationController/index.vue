<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useControllerStore, useObjectStore } from '@/store'

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

watch(selectedAnimationType, (newType) => {
  animationConfig.value.startValue = 11
})

const EASING_OPTIONS = [
  { value: 'linear', label: 'Linear' },
  { value: 'ease', label: 'Ease' },
  { value: 'ease-in', label: 'Ease In' },
  { value: 'ease-out', label: 'Ease Out' },
  { value: 'ease-in-out', label: 'Ease In Out' },
]
</script>
<template>
  <div class="flex flex-col gap-2">
    <p>
      <label for="animation-type">선택 요소</label>
      <br>
      {{ selectedObject?.id }}
    </p>
    <p>
      <label for="animation-type">캔버스 기준 좌표</label>
      x: {{ selectedObject?.x }} y: {{ selectedObject?.y }}
    </p>
    <!-- TYPE SELECT -->
    <div class="p-4 bg-gray-100 rounded-lg">
      <h3>애니메이션타입</h3>
      <label
        v-for="animation in ANIMATION_TYPE"
        :key="animation.id"
        class="flex items-center gap-2 cursor-pointer"
      >
        <input
          type="radio"
          :value="animation.type"
          v-model="selectedAnimationType"
          name="animation-type"
        />
        <span>{{ animation.name }}</span>
      </label>
    </div>
    <!-- TYPE INPUT -->
    <div class="p-4 bg-purple-200 rounded-lg">
      <h3>애니메이션 설정</h3>
      <div class="flex flex-col gap-3 mt-2">
        <div class="flex flex-col">
          <label class="mb-1">Start Value</label>
          <input type="number" v-model="animationConfig.startValue" class="p-2 border rounded" />
        </div>

        <div class="flex flex-col">
          <label class="mb-1">End Value</label>
          <input type="number" v-model="animationConfig.endValue" class="p-2 border rounded" />
        </div>

        <div class="flex flex-col">
          <label class="mb-1">Duration (ms)</label>
          <input
            type="number"
            v-model="animationConfig.duration"
            min="0"
            step="100"
            class="p-2 border rounded"
          />
        </div>

        <div class="flex flex-col">
          <label class="mb-1">Easing</label>
          <select v-model="animationConfig.easing" class="p-2 border rounded">
            <option v-for="option in EASING_OPTIONS" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
