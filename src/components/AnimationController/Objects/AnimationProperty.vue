<script setup>
import { ref, watch } from 'vue'
import { useControllerStore, useObjectStore } from '@/store'
import { storeToRefs } from 'pinia'

const controllerStore = useControllerStore()
const objectStore = useObjectStore()
const { EASING_OPTIONS, selectedAnimationType, animationConfig } = storeToRefs(controllerStore)

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

const toggleLoop = () => {
  animationConfig.value.loop = !animationConfig.value.loop
}
</script>

<template>
  <div class="overflow-hidden text-gray-200 bg-gray-800 border border-gray-700 rounded-lg">
    <div class="p-3 bg-gray-700 border-b border-gray-600">
      <h3 class="m-0 text-sm font-medium">애니메이션 설정</h3>
    </div>
    <div class="flex flex-col gap-3 p-4 mt-2">
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
            <input
              type="number"
              v-model="animationConfig.opacityStart"
              class="p-2 border rounded"
            />
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
        <label class="mb-1">Timing</label>
        <select v-model="animationConfig.easing" class="p-2 bg-white border rounded">
          <option v-for="option in EASING_OPTIONS" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <label class="mb-1">Loop/Infinite</label>
        <label
          :class="animationConfig.loop ? 'bg-gray-800' : 'bg-gray-600'"
          class="relative flex items-center w-8 h-4 border border-gray-700 cursor-pointer rounded-2xl"
          for="loop"
          @click.prevent="toggleLoop"
        >
          <input v-model="animationConfig.loop" class="hidden" name="loop" type="checkbox" />
          <div
            :class="animationConfig.loop ? 'translate-x-[15px] bg-[#825feb]' : 'translate-x-[0px]'"
            class="w-3 h-3 rounded-full absolute top-[2px] transition-all duration-300 left-[2px] bg-gray-400"
          ></div>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
input,
select {
  background-color: #252526;
}
</style>
