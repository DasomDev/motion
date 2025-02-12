<script setup>
import { ref } from 'vue'
import { useObjectStore, useControllerStore  } from '@/store'
import { storeToRefs } from 'pinia'

const objectStore = useObjectStore()
const controllerStore = useControllerStore()
const { OBJECT_TYPE } = storeToRefs(objectStore)

const emit = defineEmits(['addObject'])

const handleObjectType = (type) => {
  const action = {
    shape: () => {
      addShape()
    },
    image: () => {
      console.log('image')
    },
  }
  return action[type]()
}

const addShape = () => {
  objectStore.addObject({
    type: 'circle',
    x: 100,
    y: 100,
    radius: 30,
    fillStyle: '#825feb',
  })
}

const handlePlay = () => {
  controllerStore.play()
}
</script>
<template>
  <div
    class="absolute flex justify-between gap-8 p-4 px-6 -translate-x-1/2 bg-blue-500 rounded-lg bottom-8 left-1/2"
  >
    <div class="flex gap-4">
      <button
        v-for="object in OBJECT_TYPE"
        :key="object.id"
        class="px-2 py-1 bg-gray-200 border rounded-md"
        @click="handleObjectType(object.type)"
      >
        {{ object.name }}
      </button>
    </div>
    <div>
      <button @click="handlePlay" class="px-2 py-1 bg-gray-200 border rounded-md">재생이다</button>
    </div>
  </div>
</template>
