import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useObjectStore } from '@/store'
import { storeToRefs } from 'pinia'

export const useControllerStore = defineStore('controller', () => {
  // const state
  const objectStore = useObjectStore()
  const { selectedObject, objects } = storeToRefs(objectStore)

  const ANIMATION_TYPE = ref([
    {
      id: 1,
      name: '이동',
      type: 'translate',
    },
    {
      id: 2,
      name: '회전',
      type: 'rotate',
    },
    {
      id: 3,
      name: '확대/축소',
      type: 'scale',
    },
    {
      id: 4,
      name: '투명도',
      type: 'opacity',
    },
  ])

  // state
  const selectedAnimationType = ref(null)
  const animations = ref([])

  const play = () => {
    if (!selectedObject.value && objects.value.length > 0) {
      selectedObject.value = objects.value[0]
    }

    const element = document.querySelector(`#${selectedObject.value.id}`) // Added # for ID selector
    console.log(`Looking for: #${selectedObject.value.id}`)
    console.log('Element found:', element)
    if (!element) return alert('id확인해')

    const startPos = {
      x: selectedObject.value.x || 0,
      y: selectedObject.value.y || 0,
    }

    const endPos = {
      x: startPos.x + 100,
      y: startPos.y + 100,
    }

    const startTime = Date.now()

    function animate() {
      const currentTime = Date.now()
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / 1000, 1)

      const currentX = startPos.x + (endPos.x - startPos.x) * progress
      const currentY = startPos.y + (endPos.y - startPos.y) * progress

      // Update both store and DOM element
      selectedObject.value.x = currentX
      selectedObject.value.y = currentY
      element.style.transform = `translate(${currentX}px, ${currentY}px)`

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }

  const removeAnimation = (animationId) => {
    const index = animations.value.findIndex((anim) => anim.id === animationId)
    if (index !== -1) {
      animations.value.splice(index, 1)
    }
  }

  return {
    ANIMATION_TYPE,
    selectedAnimationType,
    animations,
    play,
    removeAnimation,
  }
})
