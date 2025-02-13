<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useControllerStore, useObjectStore } from '@/store'

import Objects from './Objects/index.vue'
import Code from './Code.vue'
import Preview from './Preview.vue'
const controllerStore = useControllerStore()
const { activeTab } = storeToRefs(controllerStore)

const targetComponent = computed(() => {
  return activeTab.value.id === 'object' ? Objects : activeTab.value.id === 'code' ? Code : Preview
})
</script>
<template>
  <div class="flex flex-col gap-2 overflow-y-auto">
    <component :is="targetComponent" />
  </div>
</template>
