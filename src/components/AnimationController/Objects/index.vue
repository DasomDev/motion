<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useControllerStore, useObjectStore } from '@/store'

import ObjectProperty from './ObjectProperty.vue'
import AnimationType from './AnimationType.vue'
import AnimationProperty from './AnimationProperty.vue'

const controllerStore = useControllerStore()
const objectStore = useObjectStore()

const { selectedAnimationType, ANIMATION_TYPE } = storeToRefs(controllerStore)
const { selectedObject } = storeToRefs(objectStore)


</script>
<template>
  <div class="flex flex-col gap-6">
    
    <ObjectProperty />
    <AnimationType />
    <AnimationProperty />
  </div>
</template>
