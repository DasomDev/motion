<script setup>
import { ref } from 'vue'
import { useControllerStore } from '@/store'
import { storeToRefs } from 'pinia'

const controllerStore = useControllerStore()
const { ANIMATION_TYPE, selectedAnimationType } = storeToRefs(controllerStore)
</script>
<template>
  <div class="overflow-hidden text-gray-200 bg-gray-800 border border-gray-700 rounded-lg">
    <div class="p-3 bg-gray-700 border-b border-gray-600">
      <h3 class="m-0 text-sm font-medium">애니메이션타입</h3>
    </div>
    
    <div class="p-4">
      <label
        v-for="animation in ANIMATION_TYPE"
        :key="animation.id"
        class="flex items-center gap-3 p-2 text-sm transition-colors rounded cursor-pointer hover:bg-gray-700"
      >
        <input
          type="radio"
          :value="animation.type"
          v-model="selectedAnimationType"
          name="animation-type"
          class="text-blue-500 bg-gray-900 border-gray-600 focus:ring-blue-500"
        />
        <span>{{ animation.name }}</span>
      </label>
    </div>
  </div>
</template>