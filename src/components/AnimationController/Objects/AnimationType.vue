<script setup>
import { ref } from 'vue'
import { useControllerStore } from '@/store'
import { storeToRefs } from 'pinia'

const controllerStore = useControllerStore()
const { ANIMATION_TYPE, selectedAnimationType } = storeToRefs(controllerStore)
</script>
<template>
  <!-- TYPE SELECT -->
  <div class="p-4 bg-gray-100 rounded-lg">
    <h3>애니메이션타입{{ selectedAnimationType }}</h3>
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
</template>