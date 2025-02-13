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

  const EASING_OPTIONS = ref([
    { value: 'linear', label: 'Linear' },
    { value: 'ease', label: 'Ease' },
    { value: 'ease-in', label: 'Ease In' },
    { value: 'ease-out', label: 'Ease Out' },
    { value: 'ease-in-out', label: 'Ease In Out' },
  ])

  // state
  const activeTab = ref({
    // 객체속성
    id: 'object',
    label: 'Object',
  })

  const selectedAnimationType = ref('translate')
  const animations = ref([])
  const targetPOS = ref({
    x: 0,
    y: 0,
  })

  const animationConfig = ref({
    x: 0,
    y: 0,
    opacityStart: 1,
    opacityEnd: 0,
    scaleStart: 1,
    scaleEnd: 0,
    duration: 1000,
    easing: 'linear',
    loop: false,
  })

  const play = () => {
    if (!selectedObject.value && objects.value.length > 0) {
      selectedObject.value = objects.value[0]
    }

    const element = document.querySelector(`#${selectedObject.value.id}`)
    if (!element) return alert('id확인해')

    // Store initial values before animation
    const initialState = {
      x: Number(selectedObject.value.x) || 0,
      y: Number(selectedObject.value.y) || 0,
      scale: 1,
      rotate: 0,
      opacity: 1
    }

    let startTime = Date.now()
    const { duration, loop } = animationConfig.value

    function animate() {
      const currentTime = Date.now()
      const elapsed = currentTime - startTime
      let progress = elapsed / duration

      // Handle looping
      if (loop) {
        progress = progress % 1
      } else {
        progress = Math.min(progress, 1)
      }

      switch (selectedAnimationType.value) {
        case 'translate':
          handleTranslateAnimation(element, progress)
          break
        case 'scale':
          handleScaleAnimation(element, progress)
          break
        case 'rotate':
          handleRotateAnimation(element, progress)
          break
        case 'opacity':
          handleOpacityAnimation(element, progress)
          break
      }

      if (loop || progress < 1) {
        requestAnimationFrame(animate)
      } else if (progress >= 1) {
        // Reset to initial state when animation completes
        resetToInitialState(element, initialState)
      }
    }

    requestAnimationFrame(animate)
  }

  const handleTranslateAnimation = (element, progress) => {
    const startPos = {
      x: Number(selectedObject.value.x) || 0,
      y: Number(selectedObject.value.y) || 0,
    }
    const endPos = {
      x: Number(targetPOS.value.x),
      y: Number(targetPOS.value.y),
    }

    const currentX = startPos.x + (endPos.x - startPos.x) * progress
    const currentY = startPos.y + (endPos.y - startPos.y) * progress

    selectedObject.value.x = currentX
    selectedObject.value.y = currentY
    updateTransform(element, { translate: `${currentX}px, ${currentY}px` })
  }

  const handleScaleAnimation = (element, progress) => {
    const { scaleStart, scaleEnd } = animationConfig.value
    const currentScale = scaleStart + (scaleEnd - scaleStart) * progress
    updateTransform(element, { scale: currentScale })
    
    // Make sure x and y are not being modified during scale animation
    selectedObject.value.x = Number(selectedObject.value.x) || 0
    selectedObject.value.y = Number(selectedObject.value.y) || 0
  }

  const handleRotateAnimation = (element, progress) => {
    const startRotation = 0
    const endRotation = 360
    const currentRotation = startRotation + (endRotation - startRotation) * progress
    updateTransform(element, { rotate: `${currentRotation}deg` })
  }

  const handleOpacityAnimation = (element, progress) => {
    const { opacityStart, opacityEnd } = animationConfig.value
    const currentOpacity = opacityStart + (opacityEnd - opacityStart) * progress
    element.style.opacity = currentOpacity
  }

  // Helper function to manage transforms
  const updateTransform = (element, newTransform) => {
    // Get current transform values from dataset or use defaults
    const currentTransform = {
      translate: element.dataset.translate || '0px, 0px',
      scale: element.dataset.scale || '1',
      rotate: element.dataset.rotate || '0deg',
    }

    // Update only the specified transform type
    if (newTransform.translate) {
      element.style.transform = `translate(${newTransform.translate})`
      element.dataset.translate = newTransform.translate
    } else if (newTransform.scale) {
      element.style.transform = `scale(${newTransform.scale})`
      element.dataset.scale = newTransform.scale
    } else if (newTransform.rotate) {
      element.style.transform = `rotate(${newTransform.rotate})`
      element.dataset.rotate = newTransform.rotate
    }
  }
  // const updateTransform = (element, newTransform) => {
  //   const transforms = {
  //     translate: element.dataset.translate || '0px, 0px',
  //     scale: element.dataset.scale || '1',
  //     rotate: element.dataset.rotate || '0deg',
  //   }

  //   // Update only the provided transform
  //   if (newTransform.translate) {
  //     transforms.translate = newTransform.translate
  //     element.dataset.translate = newTransform.translate
  //   }
  //   if (newTransform.scale) {
  //     transforms.scale = newTransform.scale
  //     element.dataset.scale = newTransform.scale
  //   }
  //   if (newTransform.rotate) {
  //     transforms.rotate = newTransform.rotate
  //     element.dataset.rotate = newTransform.rotate
  //   }

  //   // Apply all transforms together
  //   element.style.transform = `translate(${transforms.translate}) scale(${transforms.scale}) rotate(${transforms.rotate})`
  // }

  const removeAnimation = (animationId) => {
    const index = animations.value.findIndex((anim) => anim.id === animationId)
    if (index !== -1) {
      animations.value.splice(index, 1)
    }
  }

  const resetToInitialState = (element, initialState) => {
    // Reset position
    selectedObject.value.x = initialState.x
    selectedObject.value.y = initialState.y
    
    // Reset all transforms and opacity
    element.style.transform = ''
    element.style.opacity = initialState.opacity
    
    // Clear all dataset values
    element.dataset.translate = `${initialState.x}px, ${initialState.y}px`
    element.dataset.scale = '1'
    element.dataset.rotate = '0deg'
  }

  return {
    ANIMATION_TYPE,
    EASING_OPTIONS,
    selectedAnimationType,
    activeTab,
    animations,
    targetPOS,
    animationConfig,
    play,
    removeAnimation,
  }
})
