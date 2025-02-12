<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useObjectStore } from '@/store'
import { storeToRefs } from 'pinia'

const props = defineProps({
  width: {
    type: Number,
    default: 800,
  },
  height: {
    type: Number,
    default: 400,
  },
  backgroundColor: {
    type: String,
    default: '#ffffff',
  },
})

const objectStore = useObjectStore()
const { objects, selectedObject, objectStartFrom } = storeToRefs(objectStore)
const canvasRef = ref(null)
const svgRef = ref(null)
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })



const HANDLE_SIZE = 8 // Size of control handles
const HANDLE_POSITIONS = [
  { x: -1, y: -1 }, // Top-left
  { x: 0, y: -1 }, // Top-center
  { x: 1, y: -1 }, // Top-right
  { x: 1, y: 0 }, // Middle-right
  { x: 1, y: 1 }, // Bottom-right
  { x: 0, y: 1 }, // Bottom-center
  { x: -1, y: 1 }, // Bottom-left
  { x: -1, y: 0 }, // Middle-left
]

const handleGlobalClick = (event) => {
  const { target } = event
  if (canvasRef.value?.contains(event.target)) {
    selectedObject.value = null
  }
}

const handleClick = (event, object) => {
  if (object) {
    event.stopPropagation()
    selectedObject.value = object
    return
  }

  if (event.target.tagName === 'rect' || event.target.tagName === 'svg') {
    selectedObject.value = null
  }
}

const startDrag = (event, object) => {
  event.stopPropagation()
  isDragging.value = true

  const svgPoint = svgRef.value.createSVGPoint()
  svgPoint.x = event.clientX
  svgPoint.y = event.clientY

  // Transform mouse position to SVG coordinates
  const transformedPoint = svgPoint.matrixTransform(svgRef.value.getScreenCTM().inverse())

  dragOffset.value = {
    x: transformedPoint.x - object.x,
    y: transformedPoint.y - object.y,
  }
}

const onDrag = (event) => {
  if (!isDragging.value || !selectedObject.value) return

  const svgPoint = svgRef.value.createSVGPoint()
  svgPoint.x = event.clientX
  svgPoint.y = event.clientY

  // Transform mouse position to SVG coordinates
  const transformedPoint = svgPoint.matrixTransform(svgRef.value.getScreenCTM().inverse())

  selectedObject.value.x = transformedPoint.x - dragOffset.value.x
  selectedObject.value.y = transformedPoint.y - dragOffset.value.y
}

const endDrag = () => {
  isDragging.value = false
  if (selectedObject.value) {
    determineOutsideDirection(selectedObject.value)
  }
}

const determineOutsideDirection = (object) => {
  if (!svgRef.value || !object) return null

  const svgBounds = svgRef.value.getBoundingClientRect()
  const objectRadius = object.radius || 0

  // Check if object is outside SVG boundaries
  if (object.x + objectRadius < 0) {
    objectStore.setObjectStartFrom('fromLeft')
    return 'fromLeft'
  }
  if (object.x - objectRadius > svgBounds.width) {
    objectStore.setObjectStartFrom('fromRight')
    return 'fromRight'
  }
  if (object.y + objectRadius < 0) {
    objectStore.setObjectStartFrom('fromTop')
    return 'fromTop'
  }
  if (object.y - objectRadius > svgBounds.height) {
    objectStore.setObjectStartFrom('fromBottom')
    return 'fromBottom'
  }
  objectStore.setObjectStartFrom('inside')
  return 'inside' // Object is inside SVG
}

const clearObjects = () => {
  objects.value = []
}

const getHandlePositions = (object) => {
  if (!object) return []

  return HANDLE_POSITIONS.map((pos) => ({
    x: object.x + pos.x * (object.radius + HANDLE_SIZE),
    y: object.y + pos.y * (object.radius + HANDLE_SIZE),
  }))
}

defineExpose({
  clearObjects,
})

onMounted(() => {
  window.addEventListener('click', handleGlobalClick)
})

onUnmounted(() => {
  window.removeEventListener('click', handleGlobalClick)
})
</script>

<template>
  <div
    ref="canvasRef"
    class="relative flex items-center justify-center w-full h-full overflow-hidden"
  >
    <svg
      ref="svgRef"
      :width="width"
      :height="height"
      @mousemove="onDrag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
      @click="handleClick($event, null)"
      class="svg-canvas"
    >
      <!-- Background -->
      <rect x="0" y="0" :width="width" :height="height" :fill="backgroundColor" />

      <!-- Objects -->
      <template v-for="object in objects" :key="object.id">
        <g :id="object.id">
          <!-- Main circle -->
          <circle
            v-if="object.type === 'circle'"
            :cx="object.x"
            :cy="object.y"
            :r="object.radius"
            :fill="object.fillStyle"
            @mousedown="(e) => startDrag(e, object)"
            @click="(e) => handleClick(e, object)"
            :class="{ 'cursor-move': true }"
          />

          <!-- Control handles -->
          <template v-if="selectedObject === object">
            <!-- Selection border -->
            <circle
              :cx="object.x"
              :cy="object.y"
              :r="object.radius + 2"
              fill="none"
              stroke="#4a9eff"
              stroke-width="1"
              stroke-dasharray="4 2"
            />

            <!-- Resize handles -->
            <rect
              v-for="(pos, index) in getHandlePositions(object)"
              :key="index"
              :x="pos.x - HANDLE_SIZE / 2"
              :y="pos.y - HANDLE_SIZE / 2"
              :width="HANDLE_SIZE"
              :height="HANDLE_SIZE"
              fill="white"
              stroke="#4a9eff"
              stroke-width="1"
              class="handle"
            />
          </template>
        </g>
      </template>
    </svg>
  </div>
</template>

<style scoped>
.svg-canvas {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  box-sizing: border-box;
  border: 1px solid red;
  background: #fff;
  overflow: visible;
}

circle {
  cursor: move;
  user-select: none;
}

circle:hover {
  filter: brightness(0.95);
}

.handle {
  cursor: pointer;
  user-select: none;
}

.handle:hover {
  fill: #e6f3ff;
}
</style>
