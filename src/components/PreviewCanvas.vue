<script setup>
import { ref, onMounted } from "vue"

const canvasRef = ref(null)
const ctx = ref(null)

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
    default: "#ffffff",
  },
})

const initCanvas = () => {
  if (canvasRef.value) {
    ctx.value = canvasRef.value.getContext("2d")
    // Set initial background
    ctx.value.fillStyle = props.backgroundColor
    ctx.value.fillRect(0, 0, props.width, props.height)
  }
}

const clearCanvas = () => {
  if (ctx.value) {
    ctx.value.clearRect(0, 0, props.width, props.height)
    ctx.value.fillStyle = props.backgroundColor
    ctx.value.fillRect(0, 0, props.width, props.height)
  }
}

// Expose methods for parent components
defineExpose({
  clearCanvas,
})

onMounted(() => {
  initCanvas()
})
</script>

<template>
  <div class="canvas-container">
    <canvas 
      ref="canvasRef" 
      :width="width" 
      :height="height" 
      class="canvas" 
    />
    <svg
      :width="width"
      :height="height"
      class="grid-overlay"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path
            d="M 50 0 L 0 0 0 50"
            fill="none"
            stroke="gray"
            stroke-width="0.5"
          />
        </pattern>
      </defs>
      <rect :width="width" :height="height" fill="url(#grid)" />
    </svg>
  </div>
</template>

<style scoped>
.canvas-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.canvas {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border: 1px solid red;
}

.grid-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  max-width: 100%;
  max-height: 100%;
}
</style>
