<script setup>
import { ref, watch } from 'vue'
import { useControllerStore, useObjectStore } from '@/store'
import { storeToRefs } from 'pinia'

const controllerStore = useControllerStore()
const objectStore = useObjectStore()
const {
  EASING_OPTIONS,
  selectedAnimationType,
  animationConfig,
} = storeToRefs(controllerStore)

// const animationConfig = ref({
//   x: 0,
//   y: 0,
//   opacityStart: 1,
//   opacityEnd: 0,
//   scaleStart: 1,
//   scaleEnd: 0,
//   duration: 1000,
//   easing: 'linear',
// })

watch(selectedAnimationType, (newType) => {
  // Reset values when animation type changes
  if (newType === 'translate' || newType === 'rotate') {
    animationConfig.value.x = 0
    animationConfig.value.y = 0
  } else if (newType === 'opacity') {
    animationConfig.value.opacityStart = 1
    animationConfig.value.opacityEnd = 0
  } else if (newType === 'scale') {
    animationConfig.value.scaleStart = 1
    animationConfig.value.scaleEnd = 0
  }
})

const makeMarker = () => {
  // todo clone => 좌표 마크 클릭 시 좌표 마크 복사
  objectStore.addObject(
    {
      type: 'circle',
      x: 100,
      y: 100,
      radius: 30,
      fillStyle: '#825feb',
    },
    true
  )
  // console.log('makeMarker')
}
</script>

<template>
  <div class="p-4 bg-purple-200 rounded-lg">
    <h3>Animation Settings</h3>
    <div class="flex flex-col gap-3 mt-2">
      <!-- Show x, y inputs for translate and rotate -->
      <template v-if="selectedAnimationType === 'translate' || selectedAnimationType === 'rotate'">
        <div class="flex flex-col">
          <h4 class="mb-1">도착지점 좌표 마크</h4>
          <button @click="makeMarker" class="p-2 border rounded">클릭</button>
          <div class="flex gap-2">
            <p class="flex flex-col w-1/2">
              <label class="mb-1">X</label>
              <input
                type="number"
                v-model="controllerStore.targetPOS.x"
                class="p-2 border rounded"
              />
            </p>
            <p class="flex flex-col w-1/2">
              <label class="mb-1">Y</label>
              <input
                type="number"
                v-model="controllerStore.targetPOS.y"
                class="p-2 border rounded"
              />
            </p>
          </div>
        </div>
      </template>

      <template v-else-if="selectedAnimationType === 'opacity'">
        <div class="flex flex-col gap-2">
          <p class="flex flex-col">
            <label class="mb-1">Opacity Start with</label>
            <input type="number" v-model="animationConfig.opacityStart" class="p-2 border rounded" />
          </p>
          <p class="flex flex-col">
            <label class="mb-1">Opacity End with</label>
            <input type="number" v-model="animationConfig.opacityEnd" class="p-2 border rounded" />
          </p>
        </div>
      </template>

      <template v-else-if="selectedAnimationType === 'scale'">
        <div class="flex flex-col gap-2">
          <p class="flex flex-col">
            <label class="mb-1">Scale Start with</label>
            <input type="number" v-model="animationConfig.scaleStart" class="p-2 border rounded" />
          </p>
          <p class="flex flex-col">
            <label class="mb-1">Scale End with</label>
            <input type="number" v-model="animationConfig.scaleEnd" class="p-2 border rounded" />
          </p>
        </div>
      </template>

      <!-- COMMON -->
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
        <select v-model="animationConfig.easing" class="p-2 bg-white border rounded">
          <option v-for="option in EASING_OPTIONS" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
