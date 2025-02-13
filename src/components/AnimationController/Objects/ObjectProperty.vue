<script setup>
import { useObjectStore } from '@/store'
import { storeToRefs } from 'pinia'

const objectStore = useObjectStore()
const { selectedObject } = storeToRefs(objectStore) 
</script>

<template>
  <div class="overflow-hidden text-gray-200 bg-gray-800 border border-gray-700 rounded-lg">
    <div class="p-3 bg-gray-700 border-b border-gray-600">
      <h3 class="m-0 text-sm font-medium">객체 설정</h3>
    </div>
    
    <div class="p-4 space-y-4">
      <div class="space-y-1">
        <label class="block text-xs text-gray-400">선택 요소</label>
        <div class="p-2 text-sm bg-gray-900 rounded">
          {{ selectedObject?.id || '선택된 요소가 없습니다.' }}
        </div>
      </div>

      <div class="space-y-1">
        <label class="block text-xs text-gray-400">캔버스 기준 좌표</label>
        <div class="flex gap-3 p-2 text-sm bg-gray-900 rounded">
          <span>x: {{ selectedObject?.x }}</span>
          <span>y: {{ selectedObject?.y }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

